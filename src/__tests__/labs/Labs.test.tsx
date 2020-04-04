import '../../__mocks__/matchMediaMock'
import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { act } from '@testing-library/react'
import Labs from 'labs/Labs'
import NewLabRequest from 'labs/requests/NewLabRequest'
import Permissions from 'model/Permissions'
import ViewLab from 'labs/ViewLab'
import LabRepository from 'clients/db/LabRepository'
import Lab from 'model/Lab'
import Patient from 'model/Patient'
import PatientRepository from 'clients/db/PatientRepository'

const mockStore = configureMockStore([thunk])

describe('Labs', () => {
  jest.spyOn(LabRepository, 'findAll').mockResolvedValue([])
  jest
    .spyOn(LabRepository, 'find')
    .mockResolvedValue({ id: '1234', requestedOn: new Date().toISOString() } as Lab)
  jest
    .spyOn(PatientRepository, 'find')
    .mockResolvedValue({ id: '12345', fullName: 'test test' } as Patient)

  describe('routing', () => {
    describe('/labs/new', () => {
      it('should render the new lab request screen when /labs/new is accessed', () => {
        const store = mockStore({
          title: 'test',
          user: { permissions: [Permissions.RequestLab] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        })

        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/labs/new']}>
              <Labs />
            </MemoryRouter>
          </Provider>,
        )

        expect(wrapper.find(NewLabRequest)).toHaveLength(1)
      })

      it('should not navigate to /labs/new if the user does not have RequestLab permissions', () => {
        const store = mockStore({
          title: 'test',
          user: { permissions: [] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        })

        const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/labs/new']}>
              <Labs />
            </MemoryRouter>
          </Provider>,
        )

        expect(wrapper.find(NewLabRequest)).toHaveLength(0)
      })
    })

    describe('/labs/:id', () => {
      it('should render the view lab screen when /labs/:id is accessed', async () => {
        const store = mockStore({
          title: 'test',
          user: { permissions: [Permissions.ViewLab] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        })

        let wrapper: any

        await act(async () => {
          wrapper = await mount(
            <Provider store={store}>
              <MemoryRouter initialEntries={['/labs/1234']}>
                <Labs />
              </MemoryRouter>
            </Provider>,
          )

          expect(wrapper.find(ViewLab)).toHaveLength(1)
        })
      })

      it('should not navigate to /labs/:id if the user does not have ViewLab permissions', async () => {
        const store = mockStore({
          title: 'test',
          user: { permissions: [] },
          breadcrumbs: { breadcrumbs: [] },
          components: { sidebarCollapsed: false },
        })

        const wrapper = await mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={['/labs/1234']}>
              <Labs />
            </MemoryRouter>
          </Provider>,
        )

        expect(wrapper.find(ViewLab)).toHaveLength(0)
      })
    })
  })
})
