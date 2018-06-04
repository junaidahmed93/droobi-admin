import CONSTANTS from '../constants/actionConstants';

const initialState = {
  addDriporterSucees: false,
  driporterList: [],
  error: '',
  driporterListSuccess: false,
  driporterProfileSuccess: false,
};
const DriporterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_DRIPORTER_SUCCESS:
      return Object.assign({}, state, {
        addDriporterSucees: true,
      });
    case CONSTANTS.ADD_DRIPORTER_FAIL:
      return Object.assign({}, state, {
        addDriporterSucees: false,
      });
    case CONSTANTS.GET_DRIPORTER_SUCCESS:
      console.log('THIS IS Reducer ', action);
      return Object.assign({}, state, {
        driporterListSuccess: true,
        driporterList: action.driporters,
      });
    case CONSTANTS.GET_DRIPORTER_FAIL:
      return Object.assign({}, state, {
        driporterListSuccess: false,
      });
    case CONSTANTS.GET_DRIPORTER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        driporterProfileSuccess: true,
        driporterProfile: action.driporter,
      });
    case CONSTANTS.GET_DRIPORTER_PROFILE_FAIL:
      return Object.assign({}, state, {
        driporterProfileSuccess: false,
      });
    default:
      return state;
  }
};
export default DriporterReducer;
