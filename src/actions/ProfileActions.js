import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import ProfileSource from '../sources/ProfileSource';

export function getProfileSuccess(profileData) {
  const action = {
    type: CONSTANTS.GET_PROFILE_SUCCESS,
    profileData,
  };
  return action;
}

export function getProfileFail() {
  const action = {
    type: CONSTANTS.GET_PROFILE_FAIL,
  };
  return action;
}

export function getProfileSuccessAfter() {
  const action = {
    type: CONSTANTS.GET_PROFILE_SUCCESS_AFTER,
  };
  return action;
}

export function ProfileUpdateSuccess() {
  const action = {
    type: CONSTANTS.PROFILE_UPDATE_SUCCESS,
  };
  return action;
}

export function ProfileUpdateFail() {
  const action = {
    type: CONSTANTS.PROFILE_UPDATE_FAIL,
  };
  return action;
}

export function getProfileDetails(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ProfileSource.getProfileDetails(id)
      .then((profile) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getProfileSuccess(profile.data));
        console.log('Porter profile', profile);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getProfileFail());
        console.log('Error in porter profile', err);
      });
  };
}


export function updateProfile(profile) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return ProfileSource.updateProfile(profile)
      .then((updated) => {
        dispatch(loaderActions.loaderStop());
        dispatch(ProfileUpdateSuccess());
        console.log('addUserActions response', updated);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(ProfileUpdateFail());
        console.log('addUserActions error', err);
      });
  };
}

