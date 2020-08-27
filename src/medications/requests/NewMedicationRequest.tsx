import { Typeahead, Label, Button, Alert, Column, Row } from '@hospitalrun/components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../page-header/title/useTitle'
import SelectWithLabelFormGroup, {
  Option,
} from '../../shared/components/input/SelectWithLableFormGroup'
import TextFieldWithLabelFormGroup from '../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import PatientRepository from '../../shared/db/PatientRepository'
import useTranslator from '../../shared/hooks/useTranslator'
import Medication from '../../shared/model/Medication'
import Patient from '../../shared/model/Patient'
import { RootState } from '../../shared/store'
import { requestMedication } from '../medication-slice'

const NewMedicationRequest = () => {
  const { t } = useTranslator()
  const dispatch = useDispatch()
  const history = useHistory()
  useTitle(t('medications.requests.new'))
  const { status, error } = useSelector((state: RootState) => state.medication)

  const [newMedicationRequest, setNewMedicationRequest] = useState(({
    patient: '',
    medication: '',
    notes: '',
    status: '',
    intent: 'order',
    priority: '',
    quantity: { value: ('' as unknown) as number, unit: '' },
  } as unknown) as Medication)

  const statusOptionsNew: Option[] = [
    { label: t('medications.status.draft'), value: 'draft' },
    { label: t('medications.status.active'), value: 'active' },
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

  const breadcrumbs = [
    {
      i18nKey: 'medications.requests.new',
      location: `/medications/new`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  const onPatientChange = (patient: Patient) => {
    setNewMedicationRequest((previousNewMedicationRequest) => ({
      ...previousNewMedicationRequest,
      patient: patient.id,
    }))
  }

  const onMedicationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const medication = event.currentTarget.value
    setNewMedicationRequest((previousNewMedicationRequest) => ({
      ...previousNewMedicationRequest,
      medication,
    }))
  }

  const onNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = event.currentTarget.value
    setNewMedicationRequest((previousNewMedicationRequest) => ({
      ...previousNewMedicationRequest,
      notes,
    }))
  }

  const onFieldChange = (key: string, value: string | boolean) => {
    setNewMedicationRequest((previousNewMedicationRequest) => ({
      ...previousNewMedicationRequest,
      [key]: value,
    }))
  }

  const onTextInputChange = (text: string, name: string) => {
    setNewMedicationRequest((previousNewMedicationRequest) => ({
      ...previousNewMedicationRequest,
      [name]: text,
    }))
  }

  const onSave = async () => {
    const newMedication = newMedicationRequest as Medication
    const onSuccess = (createdMedication: Medication) => {
      history.push(`/medications/${createdMedication.id}`)
    }

    dispatch(requestMedication(newMedication, onSuccess))
  }

  const onCancel = () => {
    history.push('/medications')
  }

  return (
    <>
      {status === 'error' && (
        <Alert color="danger" title={t('states.error')} message={t(error.message || '')} />
      )}
      <form>
        <div className="form-group patient-typeahead">
          <Label htmlFor="patientTypeahead" isRequired text={t('medications.medication.patient')} />
          <Typeahead
            id="patientTypeahead"
            placeholder={t('medications.medication.patient')}
            onChange={(p: Patient[]) => onPatientChange(p[0])}
            onSearch={async (query: string) => PatientRepository.search(query)}
            searchAccessor="fullName"
            renderMenuItemChildren={(p: Patient) => <div>{`${p.fullName} (${p.code})`}</div>}
            isInvalid={!!error.patient}
          />
        </div>
        <TextInputWithLabelFormGroup
          name="medication"
          label={t('medications.medication.medication')}
          isRequired
          isEditable
          isInvalid={!!error.medication}
          feedback={t(error.medication as string)}
          value={newMedicationRequest.medication}
          onChange={onMedicationChange}
        />
        <div className="form-group">
          <SelectWithLabelFormGroup
            name="status"
            label={t('medications.medication.status')}
            isRequired
            options={statusOptionsNew}
            defaultSelected={statusOptionsNew.filter(
              ({ value }) => value === newMedicationRequest.status,
            )}
            onChange={(values) => onFieldChange && onFieldChange('status', values[0])}
            isEditable
          />
        </div>
        <div className="form-group">
          <SelectWithLabelFormGroup
            name="intent"
            label={t('medications.medication.intent')}
            isRequired
            options={intentOptions}
            defaultSelected={intentOptions.filter(
              ({ value }) => value === newMedicationRequest.intent,
            )}
            onChange={(values) => onFieldChange && onFieldChange('intent', values[0])}
            isEditable
          />
        </div>
        <div className="form-group">
          <SelectWithLabelFormGroup
            name="priority"
            label={t('medications.medication.priority')}
            isRequired
            options={priorityOptions}
            defaultSelected={priorityOptions.filter(
              ({ value }) => value === newMedicationRequest.priority,
            )}
            onChange={(values) => onFieldChange && onFieldChange('priority', values[0])}
            isEditable
          />
        </div>
        <Row>
          <Column md={6}>
            <TextInputWithLabelFormGroup
              name="quantityValue"
              label={`${t('medications.medication.quantity')} | ${t(
                'medications.medication.quantityValue',
              )}`}
              isEditable
              isRequired
              value={(newMedicationRequest.quantity.value as unknown) as string}
              onChange={(event) => onTextInputChange(event.currentTarget.value, 'quantity.value')}
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
              isEditable
              value={newMedicationRequest.quantity.unit}
              onChange={(event) => onTextInputChange(event.currentTarget.value, 'quantity.unit')}
              isInvalid={!!error?.quantityUnit}
              feedback={t(error?.quantityUnit as string)}
            />
          </Column>
        </Row>
        <div className="form-group">
          <TextFieldWithLabelFormGroup
            name="medicationNotes"
            label={t('medications.medication.notes')}
            isEditable
            value={newMedicationRequest.notes}
            onChange={onNoteChange}
          />
        </div>
        <div className="row float-right">
          <div className="btn-group btn-group-lg mt-3">
            <Button className="mr-2" color="success" onClick={onSave}>
              {t('actions.save')}
            </Button>
            <Button color="danger" onClick={onCancel}>
              {t('actions.cancel')}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewMedicationRequest
