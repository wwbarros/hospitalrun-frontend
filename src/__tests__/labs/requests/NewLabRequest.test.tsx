import { Button, Typeahead, Label, Alert } from '@hospitalrun/components'
import { mount, ReactWrapper } from 'enzyme'
import { createMemoryHistory } from 'history'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import NewLabRequest from '../../../labs/requests/NewLabRequest'
import * as titleUtil from '../../../page-header/title/useTitle'
import TextFieldWithLabelFormGroup from '../../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../../shared/components/input/TextInputWithLabelFormGroup'
import LabRepository from '../../../shared/db/LabRepository'
import PatientRepository from '../../../shared/db/PatientRepository'
import Lab from '../../../shared/model/Lab'
import Patient from '../../../shared/model/Patient'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('New Lab Request', () => {
  describe('title and breadcrumbs', () => {
    let titleSpy: any
    const history = createMemoryHistory()

    beforeEach(() => {
      const store = mockStore({ title: '', lab: { status: 'loading', error: {} } } as any)
      titleSpy = jest.spyOn(titleUtil, 'default')
      history.push('/labs/new')

      mount(
        <Provider store={store}>
          <Router history={history}>
            <NewLabRequest />
          </Router>
        </Provider>,
      )
    })

    it('should have New Lab Request as the title', () => {
      expect(titleSpy).toHaveBeenCalledWith('labs.requests.new')
    })
  })

  describe('form layout', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()

    beforeEach(() => {
      const store = mockStore({ title: '', lab: { status: 'loading', error: {} } } as any)
      history.push('/labs/new')

      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewLabRequest />
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
      expect(label.prop('text')).toEqual('labs.lab.patient')
      expect(typeahead).toBeDefined()
      expect(typeahead.prop('placeholder')).toEqual('labs.lab.patient')
      expect(typeahead.prop('searchAccessor')).toEqual('fullName')
    })

    it('should render a type input box', () => {
      const typeInputBox = wrapper.find(TextInputWithLabelFormGroup)

      expect(typeInputBox).toBeDefined()
      expect(typeInputBox.prop('label')).toEqual('labs.lab.type')
      expect(typeInputBox.prop('isRequired')).toBeTruthy()
      expect(typeInputBox.prop('isEditable')).toBeTruthy()
    })

    it('should render a notes text field', () => {
      const notesTextField = wrapper.find(TextFieldWithLabelFormGroup)

      expect(notesTextField).toBeDefined()
      expect(notesTextField.prop('label')).toEqual('labs.lab.notes')
      expect(notesTextField.prop('isRequired')).toBeFalsy()
      expect(notesTextField.prop('isEditable')).toBeTruthy()
    })

    it('should render a save button', () => {
      const saveButton = wrapper.find(Button).at(0)
      expect(saveButton).toBeDefined()
      expect(saveButton.text().trim()).toEqual('labs.requests.save')
    })

    it('should render a cancel button', () => {
      const cancelButton = wrapper.find(Button).at(1)
      expect(cancelButton).toBeDefined()
      expect(cancelButton.text().trim()).toEqual('actions.cancel')
    })
  })

  describe('errors', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()
    const error = {
      message: 'some message',
      patient: 'some patient message',
      type: 'some type error',
    }

    beforeEach(() => {
      history.push('/labs/new')
      const store = mockStore({ title: '', lab: { status: 'error', error } } as any)
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewLabRequest />
          </Router>
        </Provider>,
      )
    })

    it('should display errors', () => {
      const alert = wrapper.find(Alert)
      const typeInput = wrapper.find(TextInputWithLabelFormGroup)
      const patientTypeahead = wrapper.find(Typeahead)

      expect(alert.prop('message')).toEqual(error.message)
      expect(alert.prop('title')).toEqual('states.error')
      expect(alert.prop('color')).toEqual('danger')

      expect(patientTypeahead.prop('isInvalid')).toBeTruthy()

      expect(typeInput.prop('feedback')).toEqual(error.type)
      expect(typeInput.prop('isInvalid')).toBeTruthy()
    })
  })

  describe('on cancel', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()

    beforeEach(() => {
      history.push('/labs/new')
      const store = mockStore({ title: '', lab: { status: 'loading', error: {} } } as any)
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewLabRequest />
          </Router>
        </Provider>,
      )
    })

    it('should navigate back to /labs', () => {
      const cancelButton = wrapper.find(Button).at(1)

      act(() => {
        const onClick = cancelButton.prop('onClick') as any
        onClick({} as React.MouseEvent<HTMLButtonElement>)
      })

      expect(history.location.pathname).toEqual('/labs')
    })
  })

  describe('on save', () => {
    let wrapper: ReactWrapper
    const history = createMemoryHistory()
    let labRepositorySaveSpy: any
    const expectedDate = new Date()
    const expectedLab = {
      patient: '12345',
      type: 'expected type',
      status: 'requested',
      notes: 'expected notes',
      id: '1234',
      requestedOn: expectedDate.toISOString(),
    } as Lab

    beforeEach(() => {
      jest.resetAllMocks()
      Date.now = jest.fn(() => expectedDate.valueOf())
      labRepositorySaveSpy = jest.spyOn(LabRepository, 'save').mockResolvedValue(expectedLab as Lab)

      jest
        .spyOn(PatientRepository, 'search')
        .mockResolvedValue([{ id: expectedLab.patient, fullName: 'some full name' }] as Patient[])

      history.push('/labs/new')
      const store = mockStore({
        title: '',
        lab: { status: 'loading', error: {} },
        user: { user: { id: 'fake id' } },
      } as any)
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <NewLabRequest />
          </Router>
        </Provider>,
      )
    })

    it('should save the lab request and navigate to "/labs/:id"', async () => {
      const patientTypeahead = wrapper.find(Typeahead)
      await act(async () => {
        const onChange = patientTypeahead.prop('onChange')
        await onChange([{ id: expectedLab.patient }] as Patient[])
      })

      const typeInput = wrapper.find(TextInputWithLabelFormGroup)
      act(() => {
        const onChange = typeInput.prop('onChange') as any
        onChange({ currentTarget: { value: expectedLab.type } })
      })

      const notesTextField = wrapper.find(TextFieldWithLabelFormGroup)
      act(() => {
        const onChange = notesTextField.prop('onChange') as any
        onChange({ currentTarget: { value: expectedLab.notes } })
      })
      wrapper.update()

      const saveButton = wrapper.find(Button).at(0)
      await act(async () => {
        const onClick = saveButton.prop('onClick') as any
        await onClick()
      })

      expect(labRepositorySaveSpy).toHaveBeenCalledTimes(1)
      expect(labRepositorySaveSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          patient: expectedLab.patient,
          type: expectedLab.type,
          notes: expectedLab.notes,
          status: 'requested',
          requestedOn: expectedDate.toISOString(),
        }),
      )
      expect(history.location.pathname).toEqual(`/labs/${expectedLab.id}`)
    })
  })
})
