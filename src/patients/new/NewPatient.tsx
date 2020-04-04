import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Button, Toast } from '@hospitalrun/components'

import GeneralInformation from '../GeneralInformation'
import useTitle from '../../page-header/useTitle'
import Patient from '../../model/Patient'
import { createPatient } from '../patient-slice'
import { getPatientName } from '../util/patient-name-util'
import useAddBreadcrumbs from '../../breadcrumbs/useAddBreadcrumbs'

const breadcrumbs = [
  { i18nKey: 'patients.label', location: '/patients' },
  { i18nKey: 'patients.newPatient', location: '/patients/new' },
]

const NewPatient = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const [patient, setPatient] = useState({} as Patient)
  const [errorMessage, setErrorMessage] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [patientGivenNameFeedback, setPatientGivenNameFeedback] = useState('')

  useTitle(t('patients.newPatient'))
  useAddBreadcrumbs(breadcrumbs, true)

  const onCancel = () => {
    history.push('/patients')
  }

  const onSuccessfulSave = (newPatient: Patient) => {
    history.push(`/patients/${newPatient.id}`)
    Toast(
      'success',
      t('states.success'),
      `${t('patients.successfullyCreated')} ${newPatient.fullName}`,
    )
  }

  const onSave = () => {
    if (!patient.givenName) {
      setErrorMessage(t('patient.errors.patientGivenNameRequiredOnCreate'))
      setIsInvalid(true)
      setPatientGivenNameFeedback(t('patient.errors.patientGivenNameFeedback'))
    } else {
      dispatch(
        createPatient(
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
        <div className="btn-group btn-group-lg mt-3">
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

export default NewPatient
