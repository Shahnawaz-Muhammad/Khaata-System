import { CustomerContext } from '../context/CustomerContext'
import { useContext } from 'react'

export const useCustomerContext = () => {
  const context = useContext(CustomerContext)

  if (!context) {
    throw Error('useCustomerContext must be used inside an CustomerContextProvider')
  }

  return context
}