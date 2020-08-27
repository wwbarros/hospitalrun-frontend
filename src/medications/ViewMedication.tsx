import { Row, Column, Badge, Button, Alert } from '@hospitalrun/components'
import format from 'date-fns/format'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../page-header/title/useTitle'
import SelectWithLabelFormGroup, {
  Option,
} from '../shared/components/input/SelectWithLableFormGroup'
import TextFieldWithLabelFormGroup from '../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../shared/hooks/useTranslator'
import Medication from '../shared/model/Medication'
import Patient from '../shared/model/Patient'
import Permissions from '../shared/model/Permissions'
import { RootState } from '../shared/store'
import { cancelMedication, updateMedication, fetchMedication } from './medication-slice'

const getTitle = (patient: Patient | undefined, medication: Medication | undefined) =>
  patient && medication ? `${medication.medication} for ${patient.fullName}` : ''

const ViewMedication = () => {
  const { id } = useParams()
  const { t } = useTranslator()
  const history = useHistory()
  const dispatch = useDispatch()
  const { permissions } = useSelector((state: RootState) => state.user)
  const { medication, patient, status, error } = useSelector((state: RootState) => state.medication)

  const [medicationToView, setMedicationToView] = useState<Medication>()
  const [isEditable, setIsEditable] = useState<boolean>(true)

  useTitle(getTitle(patient, medicationToView))

  const breadcrumbs = [
    {
      i18nKey: 'medications.requests.view',
      location: `/medications/${medicationToView?.id}`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  useEffect(() => {
    if (id) {
      dispatch(fetchMedication(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (medication) {
      setMedicationToView({ ...medication })
      setIsEditable(medication.status !== 'completed')
    }
  }, [medication])

  const statusOptionsEdit: Option[] = [
    { label: t('medications.status.draft'), value: 'draft' },
    { label: t('medications.status.active'), value: 'active' },
    { label: t('medications.status.onHold'), value: 'on hold' },
    { label: t('medications.status.completed'), value: 'completed' },
    { label: t('medications.status.enteredInError'), value: 'entered in error' },
    { label: t('medications.status.canceled'), value: 'canceled' },
    { label: t('medications.status.unknown'), value: 'unknown' },
  ]

  const intentOptions: Option[] = [
    { label: t('medications.intent.proposal'), value: 'proposal' },
    { label: t('medications.intent.plan'), value: 'plan' },
    { label: t('medications.intent.order'), value: 'order' },
    { label: t('medications.intent.originalOrder'), value: 'original order' },
    { label: t('medications.intent.reflexOrder'), value: 'reflex order' },
    { label: t('medications.intent.fillerOrder'), value: 'filler order' },
    { label: t('medications.intent.instanceOrder'), value: 'instance order' },
    { label: t('medications.intent.option'), value: 'option' },
  ]

  const priorityOptions: Option[] = [
    { label: t('medications.priority.routine'), value: 'routine' },
    { label: t('medications.priority.urgent'), value: 'urgent' },
    { label: t('medications.priority.asap'), value: 'asap' },
    { label: t('medications.priority.stat'), value: 'stat' },
  ]

  const onQuantityChange = (text: string, name: string) => {
    const newMedication = medicationToView as Medication
    setMedicationToView({ ...newMedication, quantity: { ...newMedication.quantity, [name]: text } })
  }

  const onFieldChange = (key: string, value: string | boolean) => {
    const newMedication = medicationToView as Medication
    setMedicationToView({ ...newMedication, [key]: value })
  }

  const onNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = event.currentTarget.value
    onFieldChange('notes', notes)
  }

  const onUpdate = async () => {
    const onSuccess = () => {
      history.push('/medications')
    }
    if (medicationToView) {
      dispatch(updateMedication(medicationToView, onSuccess))
    }
  }

  const onCancel = async () => {
    const onSuccess = () => {
      history.push('/medications')
    }

    if (medicationToView) {
      dispatch(cancelMedication(medicationToView, onSuccess))
    }
  }

  const getButtons = () => {
    const buttons: React.ReactNode[] = []
    if (medicationToView?.status === 'canceled') {
      return buttons
    }

    buttons.push(
      <Button className="mr-2" color="success" onClick={onUpdate} key="actions.update">
        {t('actions.update')}
      </Button>,
    )

    if (permissions.includes(Permissions.CancelMedication)) {
      buttons.push(
        <Button onClick={onCancel} color="danger" key="medications.requests.cancel">
          {t('medications.requests.cancel')}
        </Button>,
      )
    }

    return buttons
  }

  if (medicationToView && patient) {
    const getBadgeColor = () => {
      if (medicationToView.status === 'canceled') {
        return 'danger'
      }
      return 'warning'
    }

    const getCancelledOnDate = () => {
      if (medicationToView.status === 'canceled' && medicationToView.canceledOn) {
        return (
          <Column>
            <div className="form-group canceled-on">
              <h4>{t('medications.medication.canceledOn')}</h4>
              <h5>{format(new Date(medicationToView.canceledOn), 'yyyy-MM-dd hh:mm a')}</h5>
            </div>
          </Column>
        )
      }
      return <></>
    }

    return (
      <>
        {status === 'error' && (
          <Alert color="danger" title={t('states.error')} message={t(error.message || '')} />
        )}
        <Row>
          <Column>
            <div className="form-group medication-status">
              <h4>{t('medications.medication.status')}</h4>
              <Badge color={getBadgeColor()}>
                <h5>{medicationToView.status}</h5>
              </Badge>
            </div>
          </Column>
          <Column>
            <div className="form-group medication-medication">
              <h4>{t('medications.medication.medication')}</h4>
              <h5>{medicationToView.medication}</h5>
            </div>
          </Column>
          <Column>
            <div className="form-group medication-quantity">
              <h4>{t('medications.medication.quantity')}</h4>
              <h5>{`${medicationToView.quantity.value} x ${medicationToView.quantity.unit}`}</h5>
            </div>
          </Column>
          <Column>
            <div className="form-group for-patient">
              <h4>{t('medications.medication.for')}</h4>
              <h5>{patient.fullName}</h5>
            </div>
          </Column>
          <Column>
            <div className="form-group requested-on">
              <h4>{t('medications.medication.requestedOn')}</h4>
              <h5>{format(new Date(medicationToView.requestedOn), 'yyyy-MM-dd hh:mm a')}</h5>
            </div>
          </Column>
          {getCancelledOnDate()}
        </Row>
        <Row>
          <Column>
            <div className="form-group medication-intent">
              <h4>{t('medications.medication.intent')}</h4>
              <Badge color={getBadgeColor()}>
                <h5>{medicationToView.intent}</h5>
              </Badge>
            </div>
          </Column>
          <Column>
            <div className="form-group medication-priority">
              <h4>{t('medications.medication.priority')}</h4>
              <Badge color={getBadgeColor()}>
                <h5>{medicationToView.priority}</h5>
              </Badge>
            </div>
          </Column>
        </Row>
        <div className="border-bottom" />
        <Row>
          <Column>
            <SelectWithLabelFormGroup
              name="status"
              label={t('medications.medication.status')}
              isRequired
              options={statusOptionsEdit}
              defaultSelected={statusOptionsEdit.filter(
                ({ value }) => value === medicationToView.status,
              )}
              onChange={(values) => onFieldChange && onFieldChange('status', values[0])}
              isEditable={isEditable}
            />
          </Column>
          <Column>
            <SelectWithLabelFormGroup
              name="intent"
              label={t('medications.medication.intent')}
              isRequired
              options={intentOptions}
              defaultSelected={intentOptions.filter(
                ({ value }) => value === medicationToView.intent,
              )}
              onChange={(values) => onFieldChange && onFieldChange('intent', values[0])}
              isEditable={isEditable}
            />
          </Column>
          <Column>
            <SelectWithLabelFormGroup
              name="priority"
              label={t('medications.medication.priority')}
              isRequired
              options={priorityOptions}
              defaultSelected={priorityOptions.filter(
                ({ value }) => value === medicationToView.priority,
              )}
              onChange={(values) => onFieldChange && onFieldChange('priority', values[0])}
              isEditable={isEditable}
            />
          </Column>
        </Row>
        <Row>
          <Column md={6}>
            <TextInputWithLabelFormGroup
              name="quantityValue"
              label={`${t('medications.medication.quantity')} | ${t(
                'medications.medication.quantityValue',
              )}`}
              isEditable={isEditable}
              isRequired
              value={(medicationToView.quantity.value as unknown) as string}
              onChange={(event) => onQuantityChange(event.currentTarget.value, 'value')}
              isInvalid={!!error?.quantityValue}
              feedback={t(error?.quantityValue as string)}
            />
          </Column>
          <Column md={6}>
            <TextInputWithLabelFormGroup
              label={`${t('medications.medication.quantity')} | ${t(
                'medications.medication.quantityUnit',
              )}`}
              name="quantityUnit"
              isRequired
              isEditable={isEditable}
              value={medicationToView.quantity.unit}
              onChange={(event) => onQuantityChange(event.currentTarget.value, 'unit')}
              isInvalid={!!error?.quantityUnit}
              feedback={t(error?.quantityUnit as string)}
            />
          </Column>
        </Row>
        <form>
          <Row>
            <Column>
              <TextFieldWithLabelFormGroup
                name="notes"
                label={t('medications.medication.notes')}
                value={medicationToView.notes}
                isEditable={isEditable}
                onChange={onNotesChange}
              />
            </Column>
          </Row>
          {isEditable && (
            <div className="row float-right">
              <div className="btn-group btn-group-lg mt-3">{getButtons()}</div>
            </div>
          )}
        </form>
      </>
    )
  }
  return <h1>Loading...</h1>
}

export default ViewMedication
