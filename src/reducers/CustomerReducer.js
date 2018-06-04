import CONSTANTS from '../constants/actionConstants';

const initialState = {
  customers: [],
};
const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_CUSTOMER_SUCCESS: {
      const customers = action && action.customers ? action.customers.reverse() : action.customers;
      return {
        ...state, customers,
      };
    }

    case CONSTANTS.GET_CUSTOMER_FAIL:
      return {
        ...state, customers: [],
      };
    default:
      return state;
  }
};
export default CustomerReducer;
