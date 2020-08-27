import { Button, Typeahead, Label } from '@hospitalrun/components'
import { mount, ReactWrapper } from 'enzyme'
import { createMemoryHistory } from 'history'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import NewMedicationRequest from '../../../medications/requests/NewMedicationRequest'
import * as titleUtil from '../../../page-header/title/useTitle'
import TextFieldWithLabelFormGroup from '../../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../../shared/components/input/TextInputWithLabelFormGroup'
import MedicationRepository from '../../../shared/db/MedicationRepository'
import PatientRepository from '../../../shared/db/PatientRepository'
import Medication from '../../../shared/model/Medication'
import Patient from '../../../shared/model/Patient'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('New Medication Request', () => {
  describe('title and breadcrumbs', () => {
    let titleSpy: any
    const history = createMemoryHistory()

    beforeEach(() => {
      const store = mockStore({ title: '', medication: { status: 'loading', error: {} } } as any)
      titleSpy = jest.spyOn(titleUtil, 'default')
      history.push('/medications/new')

      mount(
        <Provider store={store}>
          <Router history={history}>
            <NewMedicationRequest />
          </Router>
        </Provider>,
      )
    })

    it('should have New Medication Request as the title', () => {
      expect(titleSpy).toHaveBeenCalledWith('medications.requests.new')
    })
  })

  describe('form layout', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()

    beforeEach(() => {
      const store = mockStore({ title: '', medication: { status: 'loading', error: {} } } as any)
      history.push('/medications/new')

      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewMedicationRequest />
          </Router>
        </Provider>,
      )
    })

    it('should render a patient typeahead', () => {
      const typeaheadDiv = wrapper.find('.patient-typeahead')

      expect(typeaheadDiv).toBeDefined()

      const label = typeaheadDiv.find(Label)
      const typeahead = typeaheadDiv.find(Typeahead)

      expect(label).toBeDefined()
      expect(label.prop('text')).toEqual('medications.medication.patient')
      expect(typeahead).toBeDefined()
      expect(typeahead.prop('placeholder')).toEqual('medications.medication.patient')
      expect(typeahead.prop('searchAccessor')).toEqual('fullName')
    })

    it('should render a medication input box', () => {
      const typeInputBox = wrapper.find(TextInputWithLabelFormGroup).at(0)

      expect(typeInputBox).toBeDefined()
      expect(typeInputBox.prop('label')).toEqual('medications.medication.medication')
      expect(typeInputBox.prop('isRequired')).toBeTruthy()
      expect(typeInputBox.prop('isEditable')).toBeTruthy()
    })

    it('should render a notes text field', () => {
      const notesTextField = wrapper.find(TextFieldWithLabelFormGroup)

      expect(notesTextField).toBeDefined()
      expect(notesTextField.prop('label')).toEqual('medications.medication.notes')
      expect(notesTextField.prop('isRequired')).toBeFalsy()
      expect(notesTextField.prop('isEditable')).toBeTruthy()
    })

    it('should render a save button', () => {
      const saveButton = wrapper.find(Button).at(0)
      expect(saveButton).toBeDefined()
      expect(saveButton.text().trim()).toEqual('actions.save')
    })

    it('should render a cancel button', () => {
      const cancelButton = wrapper.find(Button).at(1)
      expect(cancelButton).toBeDefined()
      expect(cancelButton.text().trim()).toEqual('actions.cancel')
    })
  })

  describe('on cancel', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()

    beforeEach(() => {
      history.push('/medications/new')
      const store = mockStore({ title: '', medication: { status: 'loading', error: {} } } as any)
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewMedicationRequest />
          </Router>
        </Provider>,
      )
    })

    it('should navigate back to /medications', () => {
      const cancelButton = wrapper.find(Button).at(1)

      act(() => {
        const onClick = cancelButton.prop('onClick') as any
        onClick({} as React.MouseEvent<HTMLButtonElement>)
      })

      expect(history.location.pathname).toEqual('/medications')
    })
  })

  describe('on save', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()
    let medicationRepositorySaveSpy: any
    const expectedDate = new Date()
    const expectedMedication = {
      patient: '12345',
      medication: 'expected medication',
      status: 'draft',
      notes: 'expected notes',
      id: '1234',
      requestedOn: expectedDate.toISOString(),
    } as Medication

    beforeEach(() => {
      jest.resetAllMocks()
      Date.now = jest.fn(() => expectedDate.valueOf())
      medicationRepositorySaveSpy = jest
        .spyOn(MedicationRepository, 'save')
        .mockResolvedValue(expectedMedication as Medication)

      jest
        .spyOn(PatientRepository, 'search')
        .mockResolvedValue([
          { id: expectedMedication.patient, fullName: 'some full name' },
        ] as Patient[])

      history.push('/medications/new')
      const store = mockStore({
        title: '',
        medication: { status: 'loading', error: {} },
        user: { user: { id: 'fake id' } },
      } as any)
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewMedicationRequest />
          </Router>
        </Provider>,
      )
    })

    it('should save the medication request and navigate to "/medications/:id"', async () => {
      const patientTypeahead = wrapper.find(Typeahead)
      await act(async () => {
        const onChange = patientTypeahead.prop('onChange')
        await onChange([{ id: expectedMedication.patient }] as Patient[])
      })

      const medicationInput = wrapper.find(TextInputWithLabelFormGroup).at(0)
      act(() => {
        const onChange = medicationInput.prop('onChange') as any
        onChange({ currentTarget: { value: expectedMedication.medication } })
      })

      const notesTextField = wrapper.find(TextFieldWithLabelFormGroup)
      act(() => {
        const onChange = notesTextField.prop('onChange') as any
        onChange({ currentTarget: { value: expectedMedication.notes } })
      })
      wrapper.update()

      const saveButton = wrapper.find(Button).at(0)
      await act(async () => {
        const onClick = saveButton.prop('onClick') as any
        await onClick()
      })

      expect(medicationRepositorySaveSpy).toHaveBeenCalledTimes(1)
      expect(medicationRepositorySaveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          patient: expectedMedication.patient,
          medication: expectedMedication.medication,
          notes: expectedMedication.notes,
          status: 'draft',
          requestedOn: expectedDate.toISOString(),
        }),
      )
      expect(history.location.pathname).toEqual(`/medications/${expectedMedication.id}`)
    })
  })
})
