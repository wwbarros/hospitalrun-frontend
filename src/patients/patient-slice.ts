import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isAfter, isBefore, parseISO } from 'date-fns'
import { isEmpty } from 'lodash'
import validator from 'validator'

import PatientRepository from '../shared/db/PatientRepository'
import Diagnosis from '../shared/model/Diagnosis'
import Note from '../shared/model/Note'
import Patient from '../shared/model/Patient'
import RelatedPerson from '../shared/model/RelatedPerson'
import Visit from '../shared/model/Visit'
import { AppThunk } from '../shared/store'
import { uuid } from '../shared/util/uuid'
import { cleanupPatient } from './util/set-patient-helper'

interface PatientState {
  status: 'loading' | 'error' | 'completed'
  isUpdatedSuccessfully: boolean
  patient: Patient
  relatedPersons: Patient[]
  createError?: Error
  updateError?: Error
  allergyError?: AddAllergyError
  diagnosisError?: AddDiagnosisError
  noteError?: AddNoteError
  relatedPersonError?: AddRelatedPersonError
  carePlanError?: AddCarePlanError
  visitError?: AddVisitError
}

interface Error {
  message?: string
  givenName?: string
  dateOfBirth?: string
  suffix?: string
  prefix?: string
  familyName?: string
  preferredLanguage?: string
  emails?: (string | undefined)[]
  phoneNumbers?: (string | undefined)[]
}

interface AddRelatedPersonError {
  message?: string
  relatedPerson?: string
  relationshipType?: string
}

interface AddAllergyError {
  message?: string
  name?: string
}

interface AddDiagnosisError {
  message?: string
  name?: string
  date?: string
  status?: string
}

interface AddNoteError {
  message?: string
  note?: string
}

interface AddCarePlanError {
  message?: string
  title?: string
  description?: string
  status?: string
  intent?: string
  startDate?: string
  endDate?: string
  note?: string
  condition?: string
}

interface AddVisitError {
  message?: string
  status?: string
  intent?: string
  startDateTime?: string
  endDateTime?: string
}

const initialState: PatientState = {
  status: 'loading',
  isUpdatedSuccessfully: false,
  patient: {} as Patient,
  relatedPersons: [],
  createError: undefined,
  updateError: undefined,
  allergyError: undefined,
  diagnosisError: undefined,
  noteError: undefined,
  relatedPersonError: undefined,
  carePlanError: undefined,
  visitError: undefined,
}

function start(state: PatientState) {
  state.status = 'loading'
  state.createError = {}
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    fetchPatientStart: start,
    fetchPatientSuccess(state, { payload }: PayloadAction<Patient>) {
      state.status = 'completed'
      state.patient = payload
    },
    createPatientStart: start,
    createPatientSuccess(state) {
      state.status = 'completed'
    },
    createPatientError(state, { payload }: PayloadAction<Error>) {
      state.status = 'error'
      state.createError = payload
    },
    updatePatientStart: start,
    updatePatientSuccess(state, { payload }: PayloadAction<Patient>) {
      state.status = 'completed'
      state.patient = payload
    },
    updatePatientError(state, { payload }: PayloadAction<Error>) {
      state.status = 'error'
      state.updateError = payload
    },
    addAllergyError(state, { payload }: PayloadAction<AddAllergyError>) {
      state.status = 'error'
      state.allergyError = payload
    },
    addDiagnosisError(state, { payload }: PayloadAction<AddDiagnosisError>) {
      state.status = 'error'
      state.diagnosisError = payload
    },
    addRelatedPersonError(state, { payload }: PayloadAction<AddRelatedPersonError>) {
      state.status = 'error'
      state.relatedPersonError = payload
    },
    addNoteError(state, { payload }: PayloadAction<AddRelatedPersonError>) {
      state.status = 'error'
      state.noteError = payload
    },
    addCarePlanError(state, { payload }: PayloadAction<AddRelatedPersonError>) {
      state.status = 'error'
      state.carePlanError = payload
    },
    addVisitError(state, { payload }: PayloadAction<AddVisitError>) {
      state.status = 'error'
      state.visitError = payload
    },
  },
})

export const {
  fetchPatientStart,
  fetchPatientSuccess,
  createPatientStart,
  createPatientSuccess,
  createPatientError,
  updatePatientStart,
  updatePatientSuccess,
  updatePatientError,
  addAllergyError,
  addDiagnosisError,
  addRelatedPersonError,
  addNoteError,
  addCarePlanError,
  addVisitError,
} = patientSlice.actions

export const fetchPatient = (id: string): AppThunk => async (dispatch) => {
  dispatch(fetchPatientStart())
  const patient = await PatientRepository.find(id)
  dispatch(fetchPatientSuccess(patient))
}

function validatePatient(patient: Patient) {
  const error: Error = {}

  const regexContainsNumber = /\d/

  if (!patient.givenName) {
    error.givenName = 'patient.errors.patientGivenNameFeedback'
  }

  if (patient.dateOfBirth) {
    const today = new Date(Date.now())
    const dob = parseISO(patient.dateOfBirth)
    if (isAfter(dob, today)) {
      error.dateOfBirth = 'patient.errors.patientDateOfBirthFeedback'
    }
  }

  if (patient.suffix) {
    if (regexContainsNumber.test(patient.suffix)) {
      error.suffix = 'patient.errors.patientNumInSuffixFeedback'
    }
  }

  if (patient.prefix) {
    if (regexContainsNumber.test(patient.prefix)) {
      error.prefix = 'patient.errors.patientNumInPrefixFeedback'
    }
  }

  if (patient.familyName) {
    if (regexContainsNumber.test(patient.familyName)) {
      error.familyName = 'patient.errors.patientNumInFamilyNameFeedback'
    }
  }

  if (patient.preferredLanguage) {
    if (regexContainsNumber.test(patient.preferredLanguage)) {
      error.preferredLanguage = 'patient.errors.patientNumInPreferredLanguageFeedback'
    }
  }

  if (patient.emails) {
    const errors: (string | undefined)[] = []
    patient.emails.forEach((email) => {
      if (!validator.isEmail(email.value)) {
        errors.push('patient.errors.invalidEmail')
      } else {
        errors.push(undefined)
      }
    })
    // Only add to error obj if there's an error
    if (errors.some((value) => value !== undefined)) {
      error.emails = errors
    }
  }

  if (patient.phoneNumbers) {
    const errors: (string | undefined)[] = []
    patient.phoneNumbers.forEach((phoneNumber) => {
      if (!validator.isMobilePhone(phoneNumber.value)) {
        errors.push('patient.errors.invalidPhoneNumber')
      } else {
        errors.push(undefined)
      }
    })
    // Only add to error obj if there's an error
    if (errors.some((value) => value !== undefined)) {
      error.phoneNumbers = errors
    }
  }

  return error
}

export const createPatient = (
  patient: Patient,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  dispatch(createPatientStart())

  const cleanPatient = cleanupPatient(patient)
  const newPatientError = validatePatient(cleanPatient)

  if (isEmpty(newPatientError)) {
    const newPatient = await PatientRepository.save(cleanPatient)
    dispatch(createPatientSuccess())

    if (onSuccess) {
      onSuccess(newPatient)
    }
  } else {
    newPatientError.message = 'patient.errors.createPatientError'
    dispatch(createPatientError(newPatientError))
  }
}

export const updatePatient = (
  patient: Patient,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  dispatch(updatePatientStart())

  const cleanPatient = cleanupPatient(patient)
  const updateError = validatePatient(cleanPatient)

  if (isEmpty(updateError)) {
    const updatedPatient = await PatientRepository.saveOrUpdate(cleanPatient)
    dispatch(updatePatientSuccess(updatedPatient))

    if (onSuccess) {
      onSuccess(updatedPatient)
    }
  } else {
    updateError.message = 'patient.errors.updatePatientError'
    dispatch(updatePatientError(updateError))
  }
}

function validateRelatedPerson(relatedPerson: RelatedPerson) {
  const error: AddRelatedPersonError = {}

  if (!relatedPerson.patientId) {
    error.relatedPerson = 'patient.relatedPersons.error.relatedPersonRequired'
  }

  if (!relatedPerson.type) {
    error.relationshipType = 'patient.relatedPersons.error.relationshipTypeRequired'
  }

  return error
}

export const addRelatedPerson = (
  patientId: string,
  relatedPerson: RelatedPerson,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  const newRelatedPersonError = validateRelatedPerson(relatedPerson)

  if (isEmpty(newRelatedPersonError)) {
    const patient = await PatientRepository.find(patientId)
    const relatedPersons = patient.relatedPersons || []
    relatedPersons.push({ id: uuid(), ...relatedPerson })
    patient.relatedPersons = relatedPersons

    await dispatch(updatePatient(patient, onSuccess))
  } else {
    newRelatedPersonError.message = 'patient.relatedPersons.error.unableToAddRelatedPerson'
    dispatch(addRelatedPersonError(newRelatedPersonError))
  }
}

export const removeRelatedPerson = (
  patientId: string,
  relatedPersonId: string,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  const patient = await PatientRepository.find(patientId)
  patient.relatedPersons = patient.relatedPersons?.filter((r) => r.patientId !== relatedPersonId)

  await dispatch(updatePatient(patient, onSuccess))
}

function validateDiagnosis(diagnosis: Diagnosis) {
  const error: AddDiagnosisError = {}

  if (!diagnosis.name) {
    error.name = 'patient.diagnoses.error.nameRequired'
  }

  if (!diagnosis.diagnosisDate) {
    error.date = 'patient.diagnoses.error.dateRequired'
  }

  if (!diagnosis.onsetDate) {
    error.date = 'patient.diagnoses.error.dateRequired'
  }

  if (!diagnosis.status) {
    error.status = 'patient.diagnoses.error.statusRequired'
  }
  return error
}

export const addDiagnosis = (
  patientId: string,
  diagnosis: Diagnosis,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  const newDiagnosisError = validateDiagnosis(diagnosis)

  if (isEmpty(newDiagnosisError)) {
    const patient = await PatientRepository.find(patientId)
    const diagnoses = patient.diagnoses || []
    diagnoses.push({ id: uuid(), ...diagnosis })
    patient.diagnoses = diagnoses

    await dispatch(updatePatient(patient, onSuccess))
  } else {
    newDiagnosisError.message = 'patient.diagnoses.error.unableToAdd'
    dispatch(addDiagnosisError(newDiagnosisError))
  }
}

function validateNote(note: Note) {
  const error: AddNoteError = {}
  if (!note.text) {
    error.message = 'patient.notes.error.noteRequired'
  }

  return error
}

export const addNote = (
  patientId: string,
  note: Note,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  const newNoteError = validateNote(note)

  if (isEmpty(newNoteError)) {
    const patient = await PatientRepository.find(patientId)
    const notes = patient.notes || []
    notes.push({ id: uuid(), date: new Date().toISOString(), ...note })
    patient.notes = notes

    await dispatch(updatePatient(patient, onSuccess))
  } else {
    newNoteError.message = 'patient.notes.error.unableToAdd'
    dispatch(addNoteError(newNoteError))
  }
}

function validateVisit(visit: Visit): AddVisitError {
  const error: AddVisitError = {}

  if (!visit.startDateTime) {
    error.startDateTime = 'patient.visits.error.startDateRequired'
  }

  if (!visit.endDateTime) {
    error.endDateTime = 'patient.visits.error.endDateRequired'
  }

  if (!visit.type) {
    error.status = 'patient.visits.error.typeRequired'
  }

  if (visit.startDateTime && visit.endDateTime) {
    if (isBefore(new Date(visit.endDateTime), new Date(visit.startDateTime))) {
      error.endDateTime = 'patient.visits.error.endDateMustBeAfterStartDate'
    }
  }

  if (!visit.status) {
    error.status = 'patient.visits.error.statusRequired'
  }
  if (!visit.reason) {
    error.status = 'patient.visits.error.reasonRequired'
  }
  if (!visit.location) {
    error.status = 'patient.visits.error.locationRequired'
  }

  return error
}

export const addVisit = (
  patientId: string,
  visit: Visit,
  onSuccess?: (patient: Patient) => void,
): AppThunk => async (dispatch) => {
  const visitError = validateVisit(visit)
  if (isEmpty(visitError)) {
    const patient = await PatientRepository.find(patientId)
    const visits = patient.visits || ([] as Visit[])
    visits.push({
      id: uuid(),
      createdAt: new Date(Date.now().valueOf()).toISOString(),
      ...visit,
    })
    patient.visits = visits

    await dispatch(updatePatient(patient, onSuccess))
  }
}
export default patientSlice.reducer
