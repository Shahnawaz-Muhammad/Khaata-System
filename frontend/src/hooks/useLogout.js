import { useAuthContext } from './useAuthContext'
import { useCustomerContext } from './useCustomerContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchCustomer } = useCustomerContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchCustomer({ type: 'SET_CUSTOMER', payload: null })
  }

  return { logout }
}