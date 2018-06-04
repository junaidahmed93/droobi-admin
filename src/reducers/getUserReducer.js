import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  userList: [],
  error: '',
  success: false,
};
const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        success: true,
        userList: action.userList,
      });
    case CONSTANTS.GET_USER_FAIL:
      return Object.assign({}, state, {
        success: false,
      });
    case CONSTANTS.ADD_USER_FAIL:
      console.log('add user reduceer FAIL');
      return Object.assign({}, state, {
        saveUser: false,
      });


    default:
      return state;
  }
};
export default getUserReducer;
