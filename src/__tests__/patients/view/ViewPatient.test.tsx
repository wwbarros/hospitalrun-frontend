import '../../../__mocks__/matchMediaMock'
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { mocked } from 'ts-jest/utils'
import { act } from 'react-dom/test-utils'
import { Route, Router } from 'react-router-dom'
import { TabsHeader, Tab } from '@hospitalrun/components'
import configureMockStore, { MockStore } from 'redux-mock-store'
import thunk from 'redux-thunk'
import GeneralInformation from 'patients/GeneralInformation'
import { createMemoryHistory } from 'history'
import RelatedPersonTab from 'patients/related-persons/RelatedPersonTab'
import * as ButtonBarProvider from 'page-header/ButtonBarProvider'
import Allergies from 'patients/allergies/Allergies'
import Diagnoses from 'patients/diagnoses/Diagnoses'
import NotesTab from 'patients/notes/NoteTab'
import Patient from '../../../model/Patient'
import PatientRepository from '../../../clients/db/PatientRepository'
import * as titleUtil from '../../../page-header/useTitle'
import ViewPatient from '../../../patients/view/ViewPatient'
import * as patientSlice from '../../../patients/patient-slice'
import Permissions from '../../../model/Permissions'

const mockStore = configureMockStore([thunk])

describe('ViewPatient', () => {
  const patient = {
    id: '123',
    prefix: 'prefix',
    givenName: 'givenName',
    familyName: 'familyName',
    suffix: 'suffix',
    sex: 'male',
    type: 'charity',
    occupation: 'occupation',
    preferredLanguage: 'preferredLanguage',
    phoneNumber: 'phoneNumber',
    email: 'email@email.com',
    address: 'address',
    code: 'P00001',
    dateOfBirth: new Date().toISOString(),
  } as Patient

  let history: any
  let store: MockStore

  const setup = (permissions = [Permissions.ReadPatients]) => {
    jest.spyOn(PatientRepository, 'find')
    const mockedPatientRepository = mocked(PatientRepository, true)
    mockedPatientRepository.find.mockResolvedValue(patient)

    history = createMemoryHistory()
    store = mockStore({
      patient: { patient },
      user: { permissions },
    })

    history.push('/patients/123')
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/patients/:id">
            <ViewPatient />
          </Route>
        </Router>
      </Provider>,
    )

    wrapper.update()
    return wrapper
  }

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should dispatch fetchPatient when component loads', async () => {
    await act(async () => {
      await setup()
    })

    expect(PatientRepository.find).toHaveBeenCalledWith(patient.id)
    expect(store.getActions()).toContainEqual(patientSlice.fetchPatientStart())
    expect(store.getActions()).toContainEqual(patientSlice.fetchPatientSuccess(patient))
  })

  it('should render a header with the patients given, family, and suffix', async () => {
    jest.spyOn(titleUtil, 'default')
    await act(async () => {
      await setup()
    })
    expect(titleUtil.default).toHaveBeenCalledWith(
      `${patient.givenName} ${patient.familyName} ${patient.suffix} (${patient.code})`,
    )
  })

  it('should add a "Edit Patient" button to the button tool bar if has WritePatients permissions', () => {
    jest.spyOn(ButtonBarProvider, 'useButtonToolbarSetter')
    const setButtonToolBarSpy = jest.fn()
    mocked(ButtonBarProvider).useButtonToolbarSetter.mockReturnValue(setButtonToolBarSpy)

    setup([Permissions.WritePatients])

    const actualButtons: React.ReactNode[] = setButtonToolBarSpy.mock.calls[0][0]
    expect((actualButtons[0] as any).props.children).toEqual('actions.edit')
  })

  it('button toolbar empty if only has ReadPatients permission', () => {
    jest.spyOn(ButtonBarProvider, 'useButtonToolbarSetter')
    const setButtonToolBarSpy = jest.fn()
    mocked(ButtonBarProvider).useButtonToolbarSetter.mockReturnValue(setButtonToolBarSpy)

    setup()

    const actualButtons: React.ReactNode[] = setButtonToolBarSpy.mock.calls[0][0]
    expect(actualButtons.length).toEqual(0)
  })

  it('should render a tabs header with the correct tabs', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    expect(tabsHeader).toHaveLength(1)

    expect(tabs).toHaveLength(6)
    expect(tabs.at(0).prop('label')).toEqual('patient.generalInformation')
    expect(tabs.at(1).prop('label')).toEqual('patient.relatedPersons.label')
    expect(tabs.at(2).prop('label')).toEqual('scheduling.appointments.label')
    expect(tabs.at(3).prop('label')).toEqual('patient.allergies.label')
    expect(tabs.at(4).prop('label')).toEqual('patient.diagnoses.label')
    expect(tabs.at(5).prop('label')).toEqual('patient.notes.label')
  })

  it('should mark the general information tab as active and render the general information component when route is /patients/:id', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    const generalInformation = wrapper.find(GeneralInformation)
    expect(tabs.at(0).prop('active')).toBeTruthy()
    expect(generalInformation).toHaveLength(1)
    expect(generalInformation.prop('patient')).toEqual(patient)
  })

  it('should navigate /patients/:id when the general information tab is clicked', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    await act(async () => {
      await (tabs.at(0).prop('onClick') as any)()
    })

    wrapper.update()

    expect(history.location.pathname).toEqual('/patients/123')
  })

  it('should mark the related persons tab as active when it is clicked and render the Related Person Tab component when route is /patients/:id/relatedpersons', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    await act(async () => {
      const tabsHeader = wrapper.find(TabsHeader)
      const tabs = tabsHeader.find(Tab)
      tabs.at(1).prop('onClick')()
    })

    wrapper.update()

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    const relatedPersonTab = wrapper.find(RelatedPersonTab)

    expect(history.location.pathname).toEqual(`/patients/${patient.id}/relatedpersons`)
    expect(tabs.at(1).prop('active')).toBeTruthy()
    expect(relatedPersonTab).toHaveLength(1)
    expect(relatedPersonTab.prop('patient')).toEqual(patient)
  })

  it('should mark the allergies tab as active when it is clicked and render the allergies component when route is /patients/:id/allergies', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    await act(async () => {
      const tabsHeader = wrapper.find(TabsHeader)
      const tabs = tabsHeader.find(Tab)
      tabs.at(3).prop('onClick')()
    })

    wrapper.update()

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    const allergiesTab = wrapper.find(Allergies)

    expect(history.location.pathname).toEqual(`/patients/${patient.id}/allergies`)
    expect(tabs.at(3).prop('active')).toBeTruthy()
    expect(allergiesTab).toHaveLength(1)
    expect(allergiesTab.prop('patient')).toEqual(patient)
  })

  it('should mark the diagnoses tab as active when it is clicked and render the diagnoses component when route is /patients/:id/diagnoses', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    await act(async () => {
      const tabsHeader = wrapper.find(TabsHeader)
      const tabs = tabsHeader.find(Tab)
      tabs.at(4).prop('onClick')()
    })

    wrapper.update()

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    const diagnosesTab = wrapper.find(Diagnoses)

    expect(history.location.pathname).toEqual(`/patients/${patient.id}/diagnoses`)
    expect(tabs.at(4).prop('active')).toBeTruthy()
    expect(diagnosesTab).toHaveLength(1)
    expect(diagnosesTab.prop('patient')).toEqual(patient)
  })

  it('should mark the notes tab as active when it is clicked and render the note component when route is /patients/:id/notes', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = await setup()
    })

    await act(async () => {
      const tabsHeader = wrapper.find(TabsHeader)
      const tabs = tabsHeader.find(Tab)
      tabs.at(5).prop('onClick')()
    })

    wrapper.update()

    const tabsHeader = wrapper.find(TabsHeader)
    const tabs = tabsHeader.find(Tab)
    const notesTab = wrapper.find(NotesTab)

    expect(history.location.pathname).toEqual(`/patients/${patient.id}/notes`)
    expect(tabs.at(5).prop('active')).toBeTruthy()
    expect(notesTab).toHaveLength(1)
    expect(notesTab.prop('patient')).toEqual(patient)
  })
})
