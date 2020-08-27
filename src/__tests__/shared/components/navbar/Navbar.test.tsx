import { Navbar as HospitalRunNavbar } from '@hospitalrun/components'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import cloneDeep from 'lodash/cloneDeep'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Navbar from '../../../../shared/components/navbar/Navbar'
import Permissions from '../../../../shared/model/Permissions'
import User from '../../../../shared/model/User'
import { RootState } from '../../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('Navbar', () => {
  const history = createMemoryHistory()

  const setup = (permissions: Permissions[], user?: User) => {
    const store = mockStore({
      title: '',
      user: { permissions, user },
    } as any)

    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </Router>,
    )
    return wrapper
  }

  const userName = {
    givenName: 'givenName',
    familyName: 'familyName',
  } as User

  const allPermissions = [
    Permissions.ReadPatients,
    Permissions.WritePatients,
    Permissions.ReadAppointments,
    Permissions.WriteAppointments,
    Permissions.DeleteAppointment,
    Permissions.AddAllergy,
    Permissions.AddDiagnosis,
    Permissions.RequestLab,
    Permissions.CancelLab,
    Permissions.CompleteLab,
    Permissions.ViewLab,
    Permissions.ViewLabs,
    Permissions.RequestMedication,
    Permissions.CancelMedication,
    Permissions.CompleteMedication,
    Permissions.ViewMedication,
    Permissions.ViewMedications,
    Permissions.ViewIncidents,
    Permissions.ViewIncident,
    Permissions.ReportIncident,
    Permissions.AddVisit,
    Permissions.ReadVisits,
    Permissions.RequestImaging,
    Permissions.ViewImagings,
  ]

  describe('hamberger', () => {
    it('should render a hamberger link list', () => {
      const wrapper = setup(allPermissions)
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const hamberger = hospitalRunNavbar.find('.nav-hamberger')
      const { children } = hamberger.first().props() as any

      const [dashboardIcon, dashboardLabel] = children[0].props.children
      const [newPatientIcon, newPatientLabel] = children[1].props.children
      const [settingsIcon, settingsLabel] = children[children.length - 1].props.children

      expect(dashboardIcon.props.icon).toEqual('dashboard')
      expect(dashboardLabel).toEqual('dashboard.label')
      expect(newPatientIcon.props.icon).toEqual('patient-add')
      expect(newPatientLabel).toEqual('patients.newPatient')
      expect(settingsIcon.props.icon).toEqual('setting')
      expect(settingsLabel).toEqual('settings.label')
    })

    it('should not show an item if user does not have a permission', () => {
      // exclude labs, incidents, and imagings permissions
      const wrapper = setup(cloneDeep(allPermissions).slice(0, 6))
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const hamberger = hospitalRunNavbar.find('.nav-hamberger')
      const { children } = hamberger.first().props() as any

      const labels = [
        'labs.requests.new',
        'labs.requests.label',
        'incidents.reports.new',
        'incidents.reports.label',
        'medications.requests.new',
        'medications.requests.label',
        'imagings.requests.new',
        'imagings.requests.label',
      ]

      children.forEach((option: any) => {
        labels.forEach((label) => {
          expect(option.props.children).not.toEqual(label)
        })
      })
    })
  })

  it('should render a HospitalRun Navbar', () => {
    const wrapper = setup(allPermissions)
    const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)

    expect(hospitalRunNavbar).toHaveLength(1)
  })

  describe('header', () => {
    it('should render a HospitalRun Navbar with the navbar header', () => {
      const wrapper = setup(allPermissions)
      const header = wrapper.find('.nav-header')
      const { children } = header.first().props() as any

      expect(children.props.children).toEqual('HospitalRun')
    })

    it('should navigate to / when the header is clicked', () => {
      const wrapper = setup(allPermissions)
      const header = wrapper.find('.nav-header')

      act(() => {
        const onClick = header.first().prop('onClick') as any
        onClick()
      })

      expect(history.location.pathname).toEqual('/')
    })
  })

  describe('add new', () => {
    it('should show a shortcut if user has a permission', () => {
      const wrapper = setup(allPermissions)
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const addNew = hospitalRunNavbar.find('.nav-add-new')
      const { children } = addNew.first().props() as any

      const [icon, label] = children[0].props.children

      expect(icon.props.icon).toEqual('patient-add')
      expect(label).toEqual('patients.newPatient')
    })

    it('should not show a shortcut if user does not have a permission', () => {
      // exclude labs and incidents permissions
      const wrapper = setup(cloneDeep(allPermissions).slice(0, 6))
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const addNew = hospitalRunNavbar.find('.nav-add-new')
      const { children } = addNew.first().props() as any

      children.forEach((option: any) => {
        expect(option.props.children).not.toEqual('labs.requests.new')
        expect(option.props.children).not.toEqual('incidents.requests.new')
        expect(option.props.children).not.toEqual('imagings.requests.new')
      })
    })
  })

  describe('account', () => {
    it("should render a link with the user's identification", () => {
      const expectedUserName = `user.login.currentlySignedInAs ${userName.givenName} ${userName.familyName}`

      const wrapper = setup(allPermissions, userName)
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const accountLinkList = hospitalRunNavbar.find('.nav-account')
      const { children } = accountLinkList.first().props() as any

      expect(children[0].props.children).toEqual([undefined, expectedUserName])
    })

    it('should render a setting link list', () => {
      const wrapper = setup(allPermissions)
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const accountLinkList = hospitalRunNavbar.find('.nav-account')
      const { children } = accountLinkList.first().props() as any

      expect(children[1].props.children).toEqual([undefined, 'settings.label'])
    })

    it('should navigate to /settings when the list option is selected', () => {
      const wrapper = setup(allPermissions)
      const hospitalRunNavbar = wrapper.find(HospitalRunNavbar)
      const accountLinkList = hospitalRunNavbar.find('.nav-account')
      const { children } = accountLinkList.first().props() as any

      act(() => {
        children[0].props.onClick()
        children[1].props.onClick()
      })

      expect(history.location.pathname).toEqual('/settings')
    })
  })
})
