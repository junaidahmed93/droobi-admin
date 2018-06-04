import CONSTANTS from '../constants/actionConstants';
import initialState from '../store/initialState';

const addUserReducer = (state = initialState.addUserReducer, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_USER_SUCCESS:
      console.log('add user reduceer success');
      return Object.assign({}, state, {
        savedUser: true,
      });
    case CONSTANTS.ADD_USER_SUCCESS_AFTER:
      console.log('add user reduceer success');
      return Object.assign({}, state, {
        savedUser: false,
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
export default addUserReducer;
