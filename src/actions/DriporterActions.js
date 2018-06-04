import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import DriporterSource from '../sources/DriporterSource';
import * as NotificationActions from './NotificationActions';

export function addDriporterSuccess(driprter) {
  const action = {
    type: CONSTANTS.ADD_DRIPORTER_SUCCESS,
    driprter,
  };
  return action;
}
export function addDriporterFail() {
  const action = {
    type: CONSTANTS.ADD_DRIPORTER_FAIL,
  };
  return action;
}

export function getDriporterSuccess(driporters) {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_SUCCESS,
    driporters,
  };
  return action;
}
export function getDriporterFail() {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_FAIL,
  };
  return action;
}

export function getdriporterProfileSuccess(driporter) {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_PROFILE_SUCCESS,
    driporter,
  };
  return action;
}

export function getDriporterProfileFail() {
  const action = {
    type: CONSTANTS.GET_DRIPORTER_PROFILE_FAIL,
  };
  return action;
}

export function DriporterUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_DRIPORTER_SUCCESS,
  };
  return action;
}

export function DriporterUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_DRIPORTER_FAIL,
  };
  return action;
}

export function driporterProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.driporterProfile(id)
      .then((driporter) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getdriporterProfileSuccess(driporter.data));
        console.log('Porter profile', driporter);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getDriporterProfileFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('dri tdriporter profile err.message', err.message);
      });
  };
}
export function addDriporter(dri) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.addDriporter(dri)
      .then((res) => {
        console.log('res', res);
        dispatch(loaderActions.loaderStop());
        dispatch(addDriporterSuccess(res));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addDriporterFail());
        console.log('add tdriporter err.message', err.message);
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

export function getDriporter() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.getAllDriporter()
      .then((driporter) => {
        dispatch(getDriporterSuccess(driporter.data.driPorterList));
        dispatch(loaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(getDriporterFail());
        dispatch(loaderActions.loaderStop());
        console.log('ge tdriporter err.message', err.message);
        dispatch(NotificationActions.showNotification(err.message));
      });
  };
}

export function updateDriporter(driporter) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return DriporterSource.updateDriporter(driporter)
      .then(() => {
        dispatch(DriporterUpdateSuccess());
        dispatch(loaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(DriporterUpdateFail());
        console.log('update tdriporter err.message', err.message);
        dispatch(NotificationActions.showNotification(err.message));
        dispatch(loaderActions.loaderStop());
      });
  };
}

