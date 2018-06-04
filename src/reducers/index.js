import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import userPanelReducer from './userPanelReducer';
import addUserReducer from './addUserReducer';
import AddVehicleReducer from './addVehicleReducer';
import bookingReducer from './bookingReducer';
import HotelBookingReducer from './HotelBookingReducer';
import HotelStaffReducer from './HotelStaffReducer';
import getUserReducer from './getUserReducer';
import loaderReducer from './loaderReducer';
import NotificationReducer from './NotificationReducer';
import opsporterReducer from './OpsporterReducer';
import DriporterReducer from './DriporterReducer';
import AddHotelPartnerReducer from './AddHotelPartnerReducer';
import EditHotelPartnerReducer from './EditHotelPartnerReducer';
import GetHotelPartnerReducer from './GetHotelPartnerReducer';
import HotelNewBookingReducer from './HotelNewBookingReducer';
import ForgetPasswordReducer from './ForgetPasswordReducer';
import NewBookingReducer from './NewBookingReducer';
import ProfileReducer from './ProfileReducer';
import CommonReducer from './CommonReducer';
import CustomerReducer from './CustomerReducer';
import FlightStatsReducer from './FlightStatsReducer';
import DashboardReducer from './DashboardReducer';
import VehicleReducer from './VehicleReducer';
import IncomingPatientReducer from './IncomingPatientReducer';

export default combineReducers({
  loginReducer,
  userPanelReducer,
  addUserReducer,
  AddVehicleReducer,
  bookingReducer,
  getUserReducer,
  loaderReducer,
  opsporterReducer,
  DriporterReducer,
  AddHotelPartnerReducer,
  EditHotelPartnerReducer,
  GetHotelPartnerReducer,
  HotelStaffReducer,
  HotelBookingReducer,
  HotelNewBookingReducer,
  NotificationReducer,
  ForgetPasswordReducer,
  NewBookingReducer,
  CommonReducer,
  ProfileReducer,
  FlightStatsReducer,
  DashboardReducer,
  CustomerReducer,
  VehicleReducer,
  IncomingPatientReducer,
});
