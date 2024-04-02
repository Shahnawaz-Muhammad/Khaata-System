import { createContext, useReducer } from "react";

export const CustomerContext = createContext();

export const customerReducer = (state, action) => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return {
        customers: action.payload,
      };
    case "CREATE_CUSTOMERS":
      return {
        customers: [action.payload.customer, ...state.customers],
      };
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter((customer) => customer._id !== action.payload.customerId),
      };
    case "SET_CUSTOMER_DETAILS":
      return {
        ...state,
        customerDetails: action.payload.customer,
        totalCost: action.payload.totalCost,
      };
    case "ADD_ITEM_TO_CUSTOMER":
      return {
        ...state,
        customerDetails: {
          ...state.customerDetails,
          items: [...state.customerDetails.items, action.payload],
        },
      };
    case "DELETE_ITEM":
      return {
        ...state.customerDetails,
        items: state.customerDetails.items.filter(
          (item) => item._id !== action.payload.itemId
        ),
      };
    default:
      return state;
  }
};

export const CustomerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, {
    customers: null,
  });

  return (
    <CustomerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};
