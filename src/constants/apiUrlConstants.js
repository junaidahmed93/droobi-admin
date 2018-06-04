/* eslint no-unused-vars: "off" */
const devAddress = 'ec2-18-221-64-126';
const qaAddress = 'ec2-18-216-218-164';

const BASEURL = 'https://dev-api.shyftclub.com/v1.0';
// const BASEURL = 'http://192.168.206.59:8080/v1.0';
// const BASEURL = `http://192.168.200.89:8080/v1.0`;

// const BASEURL = 'http://192.168.200.148:8080/v1.0';

export default {
  APPLICATION_TYPE: 'application/json',
  API_HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  LOGIN_URL: `${BASEURL}/auth/login`,
  REGISTER_USER: `${BASEURL}/user/register`,
  UPDATE_USER: `${BASEURL}/user/update`,
  STAFF_ACTIVATION: `${BASEURL}/user/activate`,
  STAFF_DEACTIVATION: `${BASEURL}/user/deactivate`,
  GET_PROFILE_INFO: `${BASEURL}/user/userDetails?userId={id}`,
  GET_USER: `${BASEURL}/admin/adminList`,
  GET_OPSPORTER: `${BASEURL}/admin/opsList`,
  GET_DRIPORTER: `${BASEURL}/admin/driPorterList`,
  GET_HOTEL_STAFF: `${BASEURL}/admin/adminList?hotelId={hotelId}`,
  GET_DRIPORTER_LOCATIONS: `${BASEURL}/porter`,
  OPSPORTER_PROFILE: `${BASEURL}/user/userDetails?userId={id}`,
  DRIPORTER_PROFILE: `${BASEURL}/user/userDetails?userId={id}`,
  GET_VEHICLE: `${BASEURL}/vehicle`,
  VEHICLE_REGISTER: `${BASEURL}/vehicle/add`,
  ASSIGN_VEHICLE: `${BASEURL}/porter/vehicle`,
  REGISTER_HOTEL_USER: `${BASEURL}/admin/hotelCheckIn`,
  NEW_BOOKING: `${BASEURL}/admin/booking`,
  EDIT_BOOKING: `${BASEURL}/booking/update`,
  CANCEL_BOOKING: `${BASEURL}/booking/confirmPayment`,
  CANCEL_BOOKING_REASON: `${BASEURL}/booking/cancel`,
  GET_BOOKING: `${BASEURL}/admin/bookingList?dateTime={dateTime}&current={current}&pageSize={pageSize}&roleName={roleName}`,
  GET_HOTEL_PARTNER_LIST: `${BASEURL}/admin/hotelCheckInList`,
  GET_COUNTRY_LIST: `${BASEURL}/booking/country`,
  GET_CUSTOMER_LIST: `${BASEURL}/user/customer`,
  GET_AIRPORT_LIST: `${BASEURL}/airport`,
  GET_SERVICEAREA_LIST: `${BASEURL}/servicearea`,
  FORGET_PASSWORD: `${BASEURL}/auth/forgot`,
  SET_NEW_PASSWORD: `${BASEURL}/auth/password`,
  IMAGES: `${BASEURL}/resource/image/{fileName}`,
  LOGOUT: `${BASEURL}/auth/logout`,

  FLIGHT_STATS: 'https://api.flightstats.com/flex/schedules/rest/v1/jsonp/flight/{carrier}/{flightNumber}/departing/{flightDate}?appId=61a38361&appKey=2c1cf07cfc00697c36310760ad33db2d',
  TEST_VEHICLE: 'http://192.168.206.74:8080/v1.0/admin/testMultipart',
  TEST_OPS_PROFILE: 'http://192.168.200.175:8080/v1.0/user/userDetails?userId={id}',
  TEST_OPS: 'http://192.168.200.175:8080/v1.0/user/register',

};
