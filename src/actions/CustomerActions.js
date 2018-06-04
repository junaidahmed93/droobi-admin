import CONSTANTS from '../constants/actionConstants';
import * as LoaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import CustomerSource from '../sources/CustomerSource';

export function getCustomerSuccess(customers) {
  const action = {
    type: CONSTANTS.GET_CUSTOMER_SUCCESS,
    customers,
  };
  return action;
}

export function getCustomerFail(message) {
  const action = {
    type: CONSTANTS.GET_CUSTOMER_FAIL,
    message,
  };
  return action;
}


export function getAllCustomer() {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return CustomerSource.getAllCustomer()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getCustomerSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getCustomerFail());
        NotificationActions.showNotification(err.message);
      });
  };
}


// export function editCustomer(customer) {
//     console.log("new booking", customer);
//     return dispatch => {
//         dispatch(LoaderActions.loaderStart());
//         return CustomerSource.editCustomer(customer)
//             .then((res) => {
//                 dispatch(LoaderActions.loaderStop());
//             })
//             .catch((err) => {
//                 dispatch(LoaderActions.loaderStop());
//                 dispatch(NotificationActions.showNotification(err.message));
//                 console.log('addUserActions error', err);
//             })
//     };
// }
