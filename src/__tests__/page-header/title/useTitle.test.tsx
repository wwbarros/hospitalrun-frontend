import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Provider } from 'react-redux'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as titleSlice from '../../../page-header/title/title-slice'
import useTitle from '../../../page-header/title/useTitle'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])

describe('useTitle', () => {
  it('should call the updateTitle with the correct data', () => {
    const wrapper = ({ children }: any) => <Provider store={mockStore({})}>{children}</Provider>

    jest.spyOn(titleSlice, 'updateTitle')
    const expectedTitle = 'title'

    renderHook(() => useTitle(expectedTitle), { wrapper } as any)
    expect(titleSlice.updateTitle).toHaveBeenCalledTimes(1)
    expect(titleSlice.updateTitle).toHaveBeenCalledWith(expectedTitle)
  })
})
