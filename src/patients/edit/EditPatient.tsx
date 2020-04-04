import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Button, Toast } from '@hospitalrun/components'

import GeneralInformation from '../GeneralInformation'
import useTitle from '../../page-header/useTitle'
import Patient from '../../model/Patient'
import { updatePatient, fetchPatient } from '../patient-slice'
import { RootState } from '../../store'
import { getPatientFullName, getPatientName } from '../util/patient-name-util'
import useAddBreadcrumbs from '../../breadcrumbs/useAddBreadcrumbs'

const getPatientCode = (p: Patient): string => {
  if (p) {
    return p.code
  }

  return ''
}

const EditPatient = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const [patient, setPatient] = useState({} as Patient)
  const [errorMessage, setErrorMessage] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [patientGivenNameFeedback, setPatientGivenNameFeedback] = useState('')
  const { patient: reduxPatient, isLoading } = useSelector((state: RootState) => state.patient)

  useTitle(
    `${t('patients.editPatient')}: ${getPatientFullName(reduxPatient)} (${getPatientCode(
      reduxPatient,
    )})`,
  )

  const breadcrumbs = [
    { i18nKey: 'patients.label', location: '/patients' },
    { text: getPatientFullName(reduxPatient), location: `/patients/${reduxPatient.id}` },
    { i18nKey: 'patients.editPatient', location: `/patients/${reduxPatient.id}/edit` },
  ]
  useAddBreadcrumbs(breadcrumbs, true)

  useEffect(() => {
    setPatient(reduxPatient)
  }, [reduxPatient])

  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(fetchPatient(id))
    }
  }, [id, dispatch])

  const onCancel = () => {
    history.push(`/patients/${patient.id}`)
  }

  const onSuccessfulSave = (updatedPatient: Patient) => {
    history.push(`/patients/${updatedPatient.id}`)
    Toast(
      'success',
      t('states.success'),
      `${t('patients.successfullyUpdated')} ${patient.fullName}`,
    )
  }

  const onSave = () => {
    if (!patient.givenName) {
      setErrorMessage(t('patient.errors.patientGivenNameRequiredOnUpdate'))
      setIsInvalid(true)
      setPatientGivenNameFeedback(t('patient.errors.patientGivenNameFeedback'))
    } else {
      dispatch(
        updatePatient(
          {
            ...patient,
            fullName: getPatientName(patient.givenName, patient.familyName, patient.suffix),
          },
          onSuccessfulSave,
        ),
      )
    }
  }

  const onFieldChange = (key: string, value: string | boolean) => {
    setPatient({
      ...patient,
      [key]: value,
    })
  }

  if (isLoading) {
    return <Spinner color="blue" loading size={[10, 25]} type="ScaleLoader" />
  }

  return (
    <div>
      <GeneralInformation
        isEditable
        patient={patient}
        onFieldChange={onFieldChange}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        patientGivenNameFeedback={patientGivenNameFeedback}
      />
      <div className="row float-right">
        <div className="btn-group btn-group-lg">
          <Button className="mr-2" color="success" onClick={onSave}>
            {t('actions.save')}
          </Button>
          <Button color="danger" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditPatient
