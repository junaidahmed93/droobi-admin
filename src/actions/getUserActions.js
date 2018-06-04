import request from 'superagent';
import CONSTANTS from '../constants/actionConstants';
import APIURL from '../constants/apiUrlConstants';
import * as loaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import { loadState } from '../utils/StorageUtils';

export function getUserSuccess(userList) {
  console.log('getUserSuccess', userList);
  const action = {
    type: CONSTANTS.GET_USER_SUCCESS,
    userList,
  };
  return action;
}
export function getUserFail() {
  const action = {
    type: CONSTANTS.GET_USER_FAIL,
  };
  return action;
}

const requestGetUsers = () => {
  const token = loadState().token;
  const header = {
    'Content-Type': 'application/json',
    DeviceId: '12',
    OSVersion: 'Win10',
    token,
  };
  return new Promise((resolve, reject) => {
    request.get(APIURL.GET_USER)
      .accept(APIURL.APPLICATION_TYPE)
      .set(header)
      .timeout(30000)
      .end((err, res) => {
        if (res && res.text) {
          console.log('res', JSON.parse(res.text));
          resolve(JSON.parse(res.text));
        } else {
          console.log('75', err);
          reject(err);
        }
      });
  });
};


export function getUsers() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return requestGetUsers()
      .then((user) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getUserSuccess(user.data.adminList || user.data));
        console.log('addUserActions response', user);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getUserFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

//  const userDataMapping = (user) => {
//     let filteredUser =
//         {
//             "name": user.firstName + ' ' + user.lastName,
//             "password": user.password,
//             "email": user.emailAddress,
//             "phoneNumber": user.contactNumber,
//             "country": user.country,
//             "deviceToken": "46783463hjg",
//             "roleName": user.userRole,
//             "registerType": "normal",
//             "emiratesId": user.emiratesId,
//             "city": user.city,
//             "nationality": user.nationlaity,
//             "emergencyName": user.fullName,
//             "emergencyNumber": user.emergencyNumber,
//             "emergencyRelation": user.relation,
//             "dateOfBirth": user.dateOfBirth
//         }
//     return filteredUser;
// }

