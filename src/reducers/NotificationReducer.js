import CONSTANTS from '../constants/actionConstants';

const initialState = {
  isLoading: 0,
};
const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.SHOW_NOTIFICATION:
      state.isLoading += 1;
      console.log('state.isLoading ++', state.isLoading);
      return {
        ...state, message: action.message,
      };

    case CONSTANTS.HIDE_NOTIFICATION:
      state.isLoading = state.isLoading > 0 ? (state.isLoading - 1) : 0;
      console.log('state.isLoading --', state.isLoading);
      return {
        ...state, message: '',
      };

    default:
      return state;
  }
};
export default NotificationReducer;
