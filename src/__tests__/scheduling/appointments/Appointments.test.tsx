import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Dashboard from '../../../dashboard/Dashboard'
import HospitalRun from '../../../HospitalRun'
import { addBreadcrumbs } from '../../../page-header/breadcrumbs/breadcrumbs-slice'
import Appointments from '../../../scheduling/appointments/Appointments'
import EditAppointment from '../../../scheduling/appointments/edit/EditAppointment'
import NewAppointment from '../../../scheduling/appointments/new/NewAppointment'
import ViewAppointments from '../../../scheduling/appointments/ViewAppointments'
import AppointmentRepository from '../../../shared/db/AppointmentRepository'
import PatientRepository from '../../../shared/db/PatientRepository'
import Appointment from '../../../shared/model/Appointment'
import Patient from '../../../shared/model/Patient'
import Permissions from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('/appointments', () => {
  it('should render the appointments screen when /appointments is accessed', async () => {
    const store = mockStore({
      title: 'test',
      user: { permissions: [Permissions.ReadAppointments] },
      appointments: { appointments: [] },
      breadcrumbs: { breadcrumbs: [] },
      components: { sidebarCollapsed: false },
    } as any)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/appointments']}>
          <Appointments />
        </MemoryRouter>
      </Provider>,
    )

    await act(async () => {
      wrapper.update()
    })

    expect(wrapper.find(ViewAppointments)).toHaveLength(1)

    expect(store.getActions()).toContainEqual(
      addBreadcrumbs([
        { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
        { i18nKey: 'dashboard.label', location: '/' },
      ]),
    )
  })

  it('should render the Dashboard when the user does not have read appointment privileges', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          title: 'test',
          user: { user: { id: '123' }, permissions: [] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        } as any)}
      >
        <MemoryRouter initialEntries={['/appointments']}>
          <HospitalRun />
        </MemoryRouter>
      </Provider>,
    )

    expect(wrapper.find(Dashboard)).toHaveLength(1)
  })
})

describe('/appointments/new', () => {
  it('should render the new appointment screen when /appointments/new is accessed', async () => {
    const store = mockStore({
      title: 'test',
      user: { permissions: [Permissions.WriteAppointments] },
      appointment: {},
      breadcrumbs: { breadcrumbs: [] },
      components: { sidebarCollapsed: false },
    } as any)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/appointments/new']}>
          <Appointments />
        </MemoryRouter>
      </Provider>,
    )

    wrapper.update()

    expect(wrapper.find(NewAppointment)).toHaveLength(1)
    expect(store.getActions()).toContainEqual(
      addBreadcrumbs([
        { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
        { i18nKey: 'scheduling.appointments.new', location: '/appointments/new' },
        { i18nKey: 'dashboard.label', location: '/' },
      ]),
    )
  })

  it('should render the Dashboard when the user does not have read appointment privileges', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          title: 'test',
          user: { user: { id: '123' }, permissions: [] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        } as any)}
      >
        <MemoryRouter initialEntries={['/appointments/new']}>
          <HospitalRun />
        </MemoryRouter>
      </Provider>,
    )

    expect(wrapper.find(Dashboard)).toHaveLength(1)
  })
})

describe('/appointments/edit/:id', () => {
  it('should render the edit appointment screen when /appointments/edit/:id is accessed', () => {
    const appointment = {
      id: '123',
      patient: '456',
    } as Appointment

    const patient = {
      id: '456',
    } as Patient

    jest.spyOn(AppointmentRepository, 'find').mockResolvedValue(appointment)
    jest.spyOn(PatientRepository, 'find').mockResolvedValue(patient)

    const store = mockStore({
      title: 'test',
      user: { permissions: [Permissions.WriteAppointments, Permissions.ReadAppointments] },
      appointment: { appointment, patient: {} as Patient },
      breadcrumbs: { breadcrumbs: [] },
      components: { sidebarCollapsed: false },
    } as any)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/appointments/edit/123']}>
          <Appointments />
        </MemoryRouter>
      </Provider>,
    )

    expect(wrapper.find(EditAppointment)).toHaveLength(1)

    expect(store.getActions()).toContainEqual(
      addBreadcrumbs([
        { i18nKey: 'scheduling.appointments.label', location: '/appointments' },
        { text: '123', location: '/appointments/123' },
        {
          i18nKey: 'scheduling.appointments.editAppointment',
          location: '/appointments/edit/123',
        },
        { i18nKey: 'dashboard.label', location: '/' },
      ]),
    )
  })

  it('should render the Dashboard when the user does not have read appointment privileges', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          title: 'test',
          user: { user: { id: '123' }, permissions: [Permissions.WriteAppointments] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        } as any)}
      >
        <MemoryRouter initialEntries={['/appointments/edit/123']}>
          <HospitalRun />
        </MemoryRouter>
      </Provider>,
    )

    expect(wrapper.find(Dashboard)).toHaveLength(1)
  })

  it('should render the Dashboard when the user does not have write appointment privileges', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          title: 'test',
          user: { user: { id: '123' }, permissions: [Permissions.ReadAppointments] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        } as any)}
      >
        <MemoryRouter initialEntries={['/appointments/edit/123']}>
          <HospitalRun />
        </MemoryRouter>
      </Provider>,
    )

    expect(wrapper.find(Dashboard)).toHaveLength(1)
  })
})
