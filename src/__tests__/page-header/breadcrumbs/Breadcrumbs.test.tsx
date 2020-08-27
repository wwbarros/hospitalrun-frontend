import {
  Breadcrumb as HRBreadcrumb,
  BreadcrumbItem as HRBreadcrumbItem,
} from '@hospitalrun/components'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Breadcrumbs from '../../../page-header/breadcrumbs/Breadcrumbs'
import Breadcrumb from '../../../shared/model/Breadcrumb'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('Breadcrumbs', () => {
  const setup = (breadcrumbs: Breadcrumb[]) => {
    const history = createMemoryHistory()
    const store = mockStore({
      breadcrumbs: { breadcrumbs },
    } as any)

    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Breadcrumbs />
        </Router>
      </Provider>,
    )

    return wrapper
  }

  it('should not render the breadcrumb when there are no items in the store', () => {
    const wrapper = setup([])

    expect(wrapper.find(HRBreadcrumb)).toHaveLength(0)
    expect(wrapper.find(HRBreadcrumbItem)).toHaveLength(0)
  })

  it('should render breadcrumbs items', () => {
    const breadcrumbs = [
      { i18nKey: 'patient.label', location: '/patient' },
      { text: 'Bob', location: '/patient/1' },
      { text: 'Edit Patient', location: '/patient/1/edit' },
    ]
    const wrapper = setup(breadcrumbs)

    const items = wrapper.find(HRBreadcrumbItem)

    expect(items).toHaveLength(3)
    expect(items.at(0).text()).toEqual('patient.label')
    expect(items.at(1).text()).toEqual('Bob')
    expect(items.at(2).text()).toEqual('Edit Patient')
  })
})
