import React, { useState } from 'react'
import { Modal, Alert, Typeahead, Label } from '@hospitalrun/components'
import { useTranslation } from 'react-i18next'
import TextInputWithLabelFormGroup from 'components/input/TextInputWithLabelFormGroup'
import RelatedPerson from 'model/RelatedPerson'
import PatientRepository from 'clients/db/PatientRepository'
import Patient from 'model/Patient'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface Props {
  show: boolean
  toggle: () => void
  onCloseButtonClick: () => void
  onSave: (relatedPerson: RelatedPerson) => void
}

const AddRelatedPersonModal = (props: Props) => {
  const { show, toggle, onCloseButtonClick, onSave } = props
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = useState('')
  const [isRelatedPersonInvalid, setIsRelatedPersonInvalid] = useState(false)
  const [isRelationshipInvalid, setIsRelationshipInvalid] = useState(false)
  const [relatedPerson, setRelatedPerson] = useState({
    patientId: '',
    type: '',
  })
  const { patient } = useSelector((state: RootState) => state.patient)

  const patientId = () => patient.id

  const onFieldChange = (key: string, value: string) => {
    setRelatedPerson({
      ...relatedPerson,
      [key]: value,
    })
  }

  const onInputElementChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    onFieldChange(fieldName, event.target.value)
  }

  const onPatientSelect = (p: Patient[]) => {
    setRelatedPerson({ ...relatedPerson, patientId: p[0].id })
  }

  const body = (
    <form>
      {errorMessage && <Alert color="danger" title={t('states.error')} message={errorMessage} />}
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Label text={t('patient.relatedPerson')} htmlFor="relatedPersonTypeAhead" isRequired />
            <Typeahead
              id="relatedPersonTypeAhead"
              searchAccessor="fullName"
              placeholder={t('patient.relatedPerson')}
              onChange={onPatientSelect}
              isInvalid={isRelatedPersonInvalid}
              onSearch={async (query: string) => PatientRepository.search(query)}
              renderMenuItemChildren={(p: Patient) => {
                if (patientId() === p.id) {
                  return <div />
                }

                return <div>{`${p.fullName} (${p.code})`}</div>
              }}
            />
            {isRelatedPersonInvalid && (
              <div className="text-left ml-3 mt-1 text-small text-danger invalid-feedback d-block related-person-feedback">
                {t('patient.relatedPersons.error.relatedPersonRequired')}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <TextInputWithLabelFormGroup
            name="type"
            label={t('patient.relatedPersons.relationshipType')}
            value={relatedPerson.type}
            isEditable
            isInvalid={isRelationshipInvalid}
            feedback={t('patient.relatedPersons.error.relationshipTypeRequired')}
            isRequired
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onInputElementChange(event, 'type')
            }}
          />
        </div>
      </div>
    </form>
  )

  return (
    <Modal
      show={show}
      toggle={toggle}
      title={t('patient.relatedPersons.add')}
      body={body}
      closeButton={{
        children: t('actions.cancel'),
        color: 'danger',
        onClick: onCloseButtonClick,
      }}
      successButton={{
        children: t('patient.relatedPersons.add'),
        color: 'success',
        icon: 'add',
        iconLocation: 'left',
        onClick: () => {
          let isValid = true
          if (!relatedPerson.patientId) {
            isValid = false
            setIsRelatedPersonInvalid(true)
          }

          if (!relatedPerson.type) {
            isValid = false
            setIsRelationshipInvalid(true)
          }

          if (isValid) {
            onSave(relatedPerson as RelatedPerson)
          } else {
            setErrorMessage(t('patient.relatedPersons.error.unableToAddRelatedPerson'))
          }
        },
      }}
    />
  )
}

export default AddRelatedPersonModal
