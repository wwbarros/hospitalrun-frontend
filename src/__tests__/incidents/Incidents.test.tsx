import { mount, ReactWrapper } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Incidents from '../../incidents/Incidents'
import ReportIncident from '../../incidents/report/ReportIncident'
import ViewIncident from '../../incidents/view/ViewIncident'
import IncidentRepository from '../../shared/db/IncidentRepository'
import Incident from '../../shared/model/Incident'
import Permissions from '../../shared/model/Permissions'
import { RootState } from '../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('Incidents', () => {
  const setup = async (permissions: Permissions[], path: string) => {
    const expectedIncident = {
      id: '1234',
      code: '1234',
      date: new Date().toISOString(),
      reportedOn: new Date().toISOString(),
    } as Incident
    jest.spyOn(IncidentRepository, 'search').mockResolvedValue([])
    jest.spyOn(IncidentRepository, 'find').mockResolvedValue(expectedIncident)
    const store = mockStore({
      title: 'test',
      user: { permissions },
      breadcrumbs: { breadcrumbs: [] },
      components: { sidebarCollapsed: false },
    } as any)

    let wrapper: any
    await act(async () => {
      wrapper = await mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[path]}>
            <Incidents />
          </MemoryRouter>
        </Provider>,
      )
    })
    wrapper.update()

    return { wrapper: wrapper as ReactWrapper }
  }

  describe('routing', () => {
    describe('/incidents/new', () => {
      it('should render the new incident screen when /incidents/new is accessed', async () => {
        const { wrapper } = await setup([Permissions.ReportIncident], '/incidents/new')

        expect(wrapper.find(ReportIncident)).toHaveLength(1)
      })

      it('should not navigate to /incidents/new if the user does not have ReportIncident permissions', async () => {
        const { wrapper } = await setup([], '/incidents/new')

        expect(wrapper.find(ReportIncident)).toHaveLength(0)
      })
    })

    describe('/incidents/:id', () => {
      it('should render the view incident screen when /incidents/:id is accessed', async () => {
        const { wrapper } = await setup([Permissions.ViewIncident], '/incidents/1234')

        expect(wrapper.find(ViewIncident)).toHaveLength(1)
      })

      it('should not navigate to /incidents/:id if the user does not have ViewIncident permissions', async () => {
        const { wrapper } = await setup([], '/incidents/1234')

        expect(wrapper.find(ViewIncident)).toHaveLength(0)
      })
    })
  })
})
