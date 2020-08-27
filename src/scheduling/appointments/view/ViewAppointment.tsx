import { Spinner, Button, Modal, Toast } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../../page-header/breadcrumbs/useAddBreadcrumbs'
import { useButtonToolbarSetter } from '../../../page-header/button-toolbar/ButtonBarProvider'
import useTitle from '../../../page-header/title/useTitle'
import useTranslator from '../../../shared/hooks/useTranslator'
import Permissions from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import { fetchAppointment, deleteAppointment } from '../appointment-slice'
import AppointmentDetailForm from '../AppointmentDetailForm'
import { getAppointmentLabel } from '../util/scheduling-appointment.util'

const ViewAppointment = () => {
  const { t } = useTranslator()
  useTitle(t('scheduling.appointments.viewAppointment'))
  const dispatch = useDispatch()
  const { id } = useParams()
  const history = useHistory()
  const { appointment, patient, status } = useSelector((state: RootState) => state.appointment)
  const { permissions } = useSelector((state: RootState) => state.user)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const setButtonToolBar = useButtonToolbarSetter()

  const breadcrumbs = [
    { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
    { text: getAppointmentLabel(appointment), location: `/patients/${appointment.id}` },
  ]
  useAddBreadcrumbs(breadcrumbs, true)

  const onAppointmentDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowDeleteConfirmation(true)
  }

  const onDeleteSuccess = () => {
    history.push('/appointments')
    Toast('success', t('states.success'), t('scheduling.appointment.successfullyDeleted'))
  }

  const onDeleteConfirmationButtonClick = () => {
    dispatch(deleteAppointment(appointment, onDeleteSuccess))
    setShowDeleteConfirmation(false)
  }

  useEffect(() => {
    const buttons = []
    if (permissions.includes(Permissions.WriteAppointments)) {
      buttons.push(
        <Button
          key="editAppointmentButton"
          color="success"
          icon="edit"
          outlined
          onClick={() => {
            history.push(`/appointments/edit/${appointment.id}`)
          }}
        >
          {t('actions.edit')}
        </Button>,
      )
    }

    if (permissions.includes(Permissions.DeleteAppointment)) {
      buttons.push(
        <Button
          key="deleteAppointmentButton"
          color="danger"
          icon="appointment-remove"
          onClick={onAppointmentDeleteButtonClick}
        >
          {t('scheduling.appointments.deleteAppointment')}
        </Button>,
      )
    }

    setButtonToolBar(buttons)
  }, [appointment.id, history, permissions, setButtonToolBar, t])

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointment(id))
    }

    return () => {
      setButtonToolBar([])
    }
  }, [dispatch, id, setButtonToolBar])

  if (status === 'loading') {
    return <Spinner type="BarLoader" loading />
  }

  return (
    <div>
      <AppointmentDetailForm appointment={appointment} isEditable={false} patient={patient} />
      <Modal
        body={t('scheduling.appointment.deleteConfirmationMessage')}
        buttonsAlignment="right"
        show={showDeleteConfirmation}
        closeButton={{
          children: t('actions.delete'),
          color: 'danger',
          onClick: onDeleteConfirmationButtonClick,
        }}
        title={t('actions.confirmDelete')}
        toggle={() => setShowDeleteConfirmation(false)}
      />
    </div>
  )
}

export default ViewAppointment
