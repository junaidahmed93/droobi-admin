import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  profileData: [],
  error: '',
  success: false,
};
const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_PROFILE_SUCCESS:
      console.log('action.profileData', action.profileData);
      return Object.assign({}, state, {
        success: true,
        profileData: action.profileData,
      });
    case CONSTANTS.GET_PROFILE_FAIL:
      return Object.assign({}, state, {
        success: false,
      });
    case CONSTANTS.GET_PROFILE_SUCCESS_AFTER:
      console.log('add user reduceer FAIL');
      return Object.assign({}, state, {
        saveUser: false,
      });


    default:
      return state;
  }
};
export default ProfileReducer;
