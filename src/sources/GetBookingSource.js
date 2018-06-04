import momentTZ from 'moment-timezone';
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const allBookingMapping = (allbooking) => {
  const booking = [];
  allbooking.forEach((element) => {
    const flightTime = momentTZ.tz(element.bookingDto.flightDepartureTime, element.bookingDto.serviceAreaDto.timeZone).format();
    const pickupTime = momentTZ.tz(element.bookingDto.requestedPickupTime, element.bookingDto.serviceAreaDto.timeZone).format();
    const dropOffTime = momentTZ.tz(element.bookingDto.dropOffTime, element.bookingDto.serviceAreaDto.timeZone).format();
    const updatedWithTimeZone = Object.assign({}, element);
    updatedWithTimeZone.bookingDto.flightDepartureTime = flightTime;
    updatedWithTimeZone.bookingDto.requestedPickupTime = pickupTime;
    updatedWithTimeZone.bookingDto.dropOffTime = dropOffTime;
    booking.push(updatedWithTimeZone);
  });
  return booking;
};
const GetBookingSource = {
  getAllBookings() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    const url = APIURL.GET_BOOKING
      .replace('{dateTime}', 1519329660000)
      .replace('{current}', 0)
      .replace('{pageSize}', 30)
      .replace('{roleName}', 'admin');
    console.log('header', header);

    return new Promise((resolve, reject) => {
      request.get(url)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            if (responseData && responseData.data && responseData.success === true) {
              console.log('ADMIN ADMIN ADMIN', responseData);
              const bookingData = allBookingMapping(responseData.data.bookingList);
              resolve({ requestedResult: true, data: bookingData });
            }
            if (responseData && responseData.success === false) {
              const handleError = ErrorMapping.serverDefinedError(responseData);
              reject({ requestedResult: false, message: handleError });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
};

export default GetBookingSource;
