import { Modal, Alert, Typeahead, Label } from '@hospitalrun/components'
import format from 'date-fns/format'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import PatientRepository from '../../shared/db/PatientRepository'
import useTranslator from '../../shared/hooks/useTranslator'
import Patient from '../../shared/model/Patient'
import RelatedPerson from '../../shared/model/RelatedPerson'
import { RootState } from '../../shared/store'
import { addRelatedPerson } from '../patient-slice'

interface Props {
  show: boolean
  toggle: () => void
  onCloseButtonClick: () => void
}

const AddRelatedPersonModal = (props: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslator()
  const { patient, relatedPersonError } = useSelector((state: RootState) => state.patient)

  const { show, toggle, onCloseButtonClick } = props
  const [relatedPerson, setRelatedPerson] = useState({
    patientId: '',
    type: '',
  })

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

  const onSearch = async (query: string) => {
    const patients: Patient[] = await PatientRepository.search(query)
    return patients.filter((p: Patient) => p.id !== patient.id)
  }

  const formattedDate = (date: string) => (date ? format(new Date(date), 'yyyy-MM-dd') : '')

  const body = (
    <form>
      {relatedPersonError?.message && (
        <Alert color="danger" title={t('states.error')} message={t(relatedPersonError?.message)} />
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <Label text={t('patient.relatedPerson')} htmlFor="relatedPersonTypeAhead" isRequired />
            <Typeahead
              id="relatedPersonTypeAhead"
              searchAccessor="fullName"
              placeholder={t('patient.relatedPerson')}
              onChange={onPatientSelect}
              isInvalid={!!relatedPersonError?.relatedPerson}
              onSearch={onSearch}
              renderMenuItemChildren={(p: Patient) => (
                <div>{`${p.fullName} - ${formattedDate(p.dateOfBirth)} (${p.code})`}</div>
              )}
            />
            {relatedPersonError?.relatedPerson && (
              <div className="text-left ml-3 mt-1 text-small text-danger invalid-feedback d-block related-person-feedback">
                {t(relatedPersonError?.relatedPerson)}
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
            isInvalid={!!relatedPersonError?.relationshipType}
            feedback={t(relatedPersonError?.relationshipType || '')}
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
          dispatch(addRelatedPerson(patient.id, relatedPerson as RelatedPerson))
        },
      }}
    />
  )
}

export default AddRelatedPersonModal
