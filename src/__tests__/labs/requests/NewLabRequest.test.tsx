import '../../../__mocks__/matchMediaMock'
import React from 'react'
import NewLabRequest from 'labs/requests/NewLabRequest'
import TextFieldWithLabelFormGroup from 'components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from 'components/input/TextInputWithLabelFormGroup'
import { mount, ReactWrapper } from 'enzyme'
import { Button, Typeahead, Label, Alert } from '@hospitalrun/components'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMemoryHistory } from 'history'
import { act } from 'react-dom/test-utils'
import LabRepository from 'clients/db/LabRepository'
import PatientRepository from 'clients/db/PatientRepository'
import Lab from 'model/Lab'
import Patient from 'model/Patient'
import * as titleUtil from '../../../page-header/useTitle'

const mockStore = configureMockStore([thunk])

describe('New Lab Request', () => {
  describe('title and breadcrumbs', () => {
    let titleSpy: any
    const history = createMemoryHistory()

    beforeEach(() => {
      const store = mockStore({ title: '' })
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
      const store = mockStore({ title: '' })
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
      history.push('/labs/new')
      const store = mockStore({ title: '' })
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
      patientId: '12345',
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
        .mockResolvedValue([{ id: expectedLab.patientId, fullName: 'some full name' }] as Patient[])

      history.push('/labs/new')
      const store = mockStore({ title: '' })
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
        await onChange([{ id: expectedLab.patientId }] as Patient[])
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
          patientId: expectedLab.patientId,
          type: expectedLab.type,
          notes: expectedLab.notes,
          status: 'requested',
          requestedOn: expectedDate.toISOString(),
        }),
      )
      expect(history.location.pathname).toEqual(`/labs/${expectedLab.id}`)
    })

    it('should require a patient', async () => {
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
      wrapper.update()

      const alert = wrapper.find(Alert)
      const typeahead = wrapper.find(Typeahead)
      expect(alert).toBeDefined()
      expect(alert.prop('title')).toEqual('states.error')
      expect(alert.prop('message')).toEqual('labs.requests.error.unableToRequest')
      expect(typeahead.prop('isInvalid')).toBeTruthy()
      expect(labRepositorySaveSpy).not.toHaveBeenCalled()
    })

    it('should require a type', async () => {
      const patientTypeahead = wrapper.find(Typeahead)
      await act(async () => {
        const onChange = patientTypeahead.prop('onChange')
        await onChange([{ id: expectedLab.patientId }] as Patient[])
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
      wrapper.update()

      const alert = wrapper.find(Alert)
      const typeInput = wrapper.find(TextInputWithLabelFormGroup)
      expect(alert).toBeDefined()
      expect(alert.prop('title')).toEqual('states.error')
      expect(alert.prop('message')).toEqual('labs.requests.error.unableToRequest')
      expect(typeInput.prop('isInvalid')).toBeTruthy()
      expect(typeInput.prop('feedback')).toEqual('labs.requests.error.typeRequired')
      expect(labRepositorySaveSpy).not.toHaveBeenCalled()
    })
  })
})
