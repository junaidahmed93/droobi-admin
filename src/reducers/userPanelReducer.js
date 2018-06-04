import CONSTANTS from '../constants/actionConstants';
import initialState from '../store/initialState';

const userPanelReducer = (state = initialState.userPanelReducer, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        isUserAdded: true,
      });

    case CONSTANTS.ADD_USER_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        isUserAdded: false,
      });

    default:
      return state;
  }
};
export default userPanelReducer;
