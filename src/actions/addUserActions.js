import request from 'superagent';
import { browserHistory } from 'react-router';
import CONSTANTS from '../constants/actionConstants';
import APIURL from '../constants/apiUrlConstants';
import * as NotificationActions from './NotificationActions';
import * as LoaderActions from './loaderActions';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

export function addUserSuccess() {
  const action = {
    type: CONSTANTS.ADD_USER_SUCCESS,

  };
  return action;
}
export function addUserFail() {
  const action = {
    type: CONSTANTS.ADD_USER_FAIL,

  };
  return action;
}

export function addUserSuccessAfter() {
  const action = {
    type: CONSTANTS.ADD_USER_SUCCESS_AFTER,

  };
  return action;
}


const editAdminUserDataMapping = (user) => {
  const filteredUser =
    {
      id: user.id,
      name: user.name,
      // "password": user.password,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      deviceToken: '46783463hjg',
      roleName: user.roles[0].roleType,
      registerType: 'normal',
      emiratesId: user.emiratesId,
      city: user.city,
      nationality: user.nationality,
      emergencyName: user.emergencyName,
      emergencyNumber: user.emergencyNumber,
      emergencyRelation: user.emergencyRelation,
      dateOfBirth: Converters.dateConverter(user.dateOfBirth),
    };

  return filteredUser;
};

const userDataMapping = (user) => {
  const filteredUser =
    {
      name: user.fullName,
      password: user.password,
      email: user.emailAddress,
      phoneNumber: user.contactNumber,
      country: user.country,
      deviceToken: '46783463hjg',
      roleName: user.userRole,
      registerType: 'normal',
      emiratesId: user.emiratesId,
      city: user.city,
      nationality: user.nationlaity,
      emergencyName: user.emergencyName,
      emergencyNumber: user.emergencyNumber,
      emergencyRelation: user.relation,
      dateOfBirth: user.dateOfBirth,
    };
  return filteredUser;
};

const requestAddUser = (user) => {
  const payload = userDataMapping(user);
  const token = loadState().token;
  const header = {
    'Content-Type': 'application/json',
    DeviceId: '12',
    OSVersion: 'Win10',
    token,
  };
  return new Promise((resolve, reject) => {
    request.post(APIURL.REGISTER_USER)
      .send(payload)
      .accept(APIURL.APPLICATION_TYPE)
      .set(header)
      .timeout(30000)
      .end((err, response) => {
        if (response && response.text) {
          const responseData = JSON.parse(response.text);
          if (responseData && responseData.success === true) {
            console.log('130-----', response);
            resolve({ requestedResult: true, data: responseData.data });
          }
          if (responseData && responseData.success === false) {
            console.log('62-----', response);
            const handleError = ErrorMapping.serverDefinedError(responseData);
            reject({ requestedResult: false, message: handleError });
          }
        } else {
          const handleError = ErrorMapping.unhandleError(err);
          reject({ requestedResult: false, message: handleError });
        }
      });
  });
};

const requestEditAdminUser = (user) => {
  const payload = editAdminUserDataMapping(user);
  console.log('final payload', payload);
  const parseOb = JSON.stringify(payload);
  const token = loadState().token;
  const header = {
    // "Content-Type": "application/json",
    DeviceId: '12',
    OSVersion: 'Win10',
    token,
  };
  return new Promise((resolve, reject) => {
    request.put(APIURL.UPDATE_USER)
      .accept(APIURL.APPLICATION_TYPE)
      .set(header)
      .field('userDetails', parseOb)
      .timeout(30000)
      .end((err, response) => {
        if (response && response.text) {
          const responseData = JSON.parse(response.text);
          if (responseData && responseData.success === true) {
            browserHistory.push('/home/admin/user-panel');
            console.log('Edit Admin ', response);
            resolve({ requestedResult: true, data: responseData.data });
          }
          if (responseData && responseData.success === false) {
            console.log('Edit Admin 179', response);
            const handleError = ErrorMapping.serverDefinedError(responseData);
            reject({ requestedResult: false, message: handleError });
          }
        } else {
          const handleError = ErrorMapping.unhandleError(err);
          reject({ requestedResult: false, message: handleError });
        }
      });
  });
};


export function editAdminUser(user) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return requestEditAdminUser(user)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(addUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(addUserFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}
export function userAdd(user) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return requestAddUser(user)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(addUserSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(addUserFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

