import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import OpsporterSource from '../sources/OpsporterSource';
import * as NotificationActions from './NotificationActions';

export function addOpsporterSuccess(opsprter) {
  const action = {
    type: CONSTANTS.ADD_OPSPORTER_SUCCESS,
    opsprter,
  };
  return action;
}
export function addOpsporterFail() {
  const action = {
    type: CONSTANTS.ADD_OPSPORTER_FAIL,
  };
  return action;
}

export function getOsporterSuccess(opsprter) {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_SUCCESS,
    opsprter,
  };
  return action;
}
export function getOpsporterFail() {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_FAIL,
  };
  return action;
}

export function getOpsporterProfileSuccess(opsporter) {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_PROFILE_SUCCESS,
    opsporter,
  };
  return action;
}

export function getOpsporterProfileFail() {
  const action = {
    type: CONSTANTS.GET_OPSPORTER_PROFILE_FAIL,
  };
  return action;
}

export function opsorterUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_OPSPORTER_SUCCESS,
  };
  return action;
}

export function opsporterUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_OPSPORTER_FAIL,
  };
  return action;
}

export function opsporterProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.opsporterProfile(id)
      .then((opsporter) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsporterProfileSuccess(opsporter.data));
        console.log('Porter profile', opsporter);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsporterProfileFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('Error in porter profile', err);
      });
  };
}
export function addOpsporter(ops) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.addOpsporter(ops)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addOpsporterSuccess(res));
        console.log('addUserActions response', res);
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addOpsporterFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

export function getOpsporter() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.getAllOpsporter()
      .then((opsporter) => {
        dispatch(loaderActions.loaderStop());
        console.log('addUserActions response', opsporter);
        dispatch(getOsporterSuccess(opsporter.data.opsporters));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getOpsporterFail());
        console.log('addUserActions error', err);
        dispatch(NotificationActions.showNotification(err.message));
      });
  };
}

export function updateOpsporter(opsporter) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return OpsporterSource.updateOpsporter(opsporter)
      .then((updated) => {
        dispatch(loaderActions.loaderStop());
        dispatch(opsorterUpdateSuccess());
        console.log('addUserActions response', updated);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(opsporterUpdateFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

