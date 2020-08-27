import { Modal } from '@hospitalrun/components'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import AddDiagnosisModal from '../../../patients/diagnoses/AddDiagnosisModal'
import DiagnosisForm from '../../../patients/diagnoses/DiagnosisForm'
import * as patientSlice from '../../../patients/patient-slice'
import PatientRepository from '../../../shared/db/PatientRepository'
import { CarePlanIntent, CarePlanStatus } from '../../../shared/model/CarePlan'
import Patient from '../../../shared/model/Patient'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('Add Diagnosis Modal', () => {
  const patient = {
    id: 'patientId',
    diagnoses: [{ id: '123', name: 'some name', diagnosisDate: new Date().toISOString() }],
    carePlans: [
      {
        id: '123',
        title: 'some title',
        description: 'some description',
        diagnosisId: '123',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: CarePlanStatus.Active,
        intent: CarePlanIntent.Proposal,
      },
    ],
  } as Patient

  const diagnosisError = {
    title: 'some diagnosisError error',
  }

  const onCloseSpy = jest.fn()
  const setup = () => {
    jest.spyOn(PatientRepository, 'find').mockResolvedValue(patient)
    jest.spyOn(PatientRepository, 'saveOrUpdate')
    const store = mockStore({ patient: { patient, diagnosisError } } as any)
    const history = createMemoryHistory()
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <AddDiagnosisModal show onCloseButtonClick={onCloseSpy} />
        </Router>
      </Provider>,
    )

    wrapper.update()
    return { wrapper }
  }

  it('should render a modal', () => {
    const { wrapper } = setup()

    const modal = wrapper.find(Modal)

    expect(modal).toHaveLength(1)

    const successButton = modal.prop('successButton')
    const cancelButton = modal.prop('closeButton')
    expect(modal.prop('title')).toEqual('patient.diagnoses.new')
    expect(successButton?.children).toEqual('patient.diagnoses.new')
    expect(successButton?.icon).toEqual('add')
    expect(cancelButton?.children).toEqual('actions.cancel')
  })

  it('should render the diagnosis form', () => {
    const { wrapper } = setup()

    const diagnosisForm = wrapper.find(DiagnosisForm)
    expect(diagnosisForm).toHaveLength(1)
    expect(diagnosisForm.prop('diagnosisError')).toEqual(diagnosisError)
  })

  it('should dispatch add diagnosis when the save button is clicked', async () => {
    const { wrapper } = setup()
    jest.spyOn(patientSlice, 'addDiagnosis')

    act(() => {
      const diagnosisForm = wrapper.find(DiagnosisForm)
      const onChange = diagnosisForm.prop('onChange') as any
      if (patient.diagnoses != null) {
        onChange(patient.diagnoses[0])
      }
    })
    wrapper.update()

    await act(async () => {
      const modal = wrapper.find(Modal)
      const successButton = modal.prop('successButton')
      const onClick = successButton?.onClick as any
      await onClick()
    })

    expect(patientSlice.addDiagnosis).toHaveBeenCalledTimes(1)
    if (patient.diagnoses != null) {
      expect(patientSlice.addDiagnosis).toHaveBeenCalledWith(patient.id, patient.diagnoses[0])
    }
  })

  it('should call the on close function when the cancel button is clicked', () => {
    const { wrapper } = setup()

    const modal = wrapper.find(Modal)

    expect(modal).toHaveLength(1)

    act(() => {
      const cancelButton = modal.prop('closeButton')
      const onClick = cancelButton?.onClick as any
      onClick()
    })

    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  })
})
