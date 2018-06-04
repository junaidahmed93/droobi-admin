
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import locations from '../constants/locationsContants';
import ErrorMapping from '../utils/ErrorMapping';
import { flightStatsInputParser } from '../utils/Helpers';
import { loadState } from '../utils/StorageUtils';

// const airportResult = (e) => {
//   console.log('Flight call back ---=====', e);
// };
const bookingDataMapping = (booking) => {
  console.log('bookingDataMapping', booking);
  const flightTimeStamp = Converters.flightDateAndTimeWithUTC(booking.flightDate, booking.flightTime);
  const pickupTimeStamp = Converters.LocalToUTC(booking.pickupTime);
  const dropoffTimeStamp = Converters.LocalToUTC(booking.dropoffTime);

  console.log('flightTimeStamp', flightTimeStamp);
  // let check = new Date(Date.UTC(flightTimeStamp));
  const newBooking = {
    userDto: {
      name: booking.guestName,
      email: booking.emailAddress,
      phoneNumber: booking.contactNumber,
      roleName: 'guest',
      country: booking.country,
      registerType: 'normal',
    },
    bookingDto: {
      flightNumber: Converters.flightNumberFormat(booking.flightNumber),
      flightDepartureTime: flightTimeStamp,
      departureLocationName: `${booking.dropoffAirport}↵${booking.dropoffTerminal}`,
      departureLongitude: locations[Converters.airPortNameToRegionId(booking.dropoffAirport)].longitude,
      departureLatitude: locations[Converters.airPortNameToRegionId(booking.dropoffAirport)].latitude,
      pickupLocationName: booking.pickupAddress,
      requestedPickupLongitude: (booking.pickupLong).toString(),
      requestedPickupLatitude: (booking.pickupLat).toString(),
      requestedPickupTime: pickupTimeStamp,
      numberOfBags: booking.luggages,
      numberOfCompanions: booking.numberOfCompanions,
      description: booking.description,
      commentsForDriporter: booking.commentsForDriporter,
      completeAddress: `${booking.flatOfficeNumber ? booking.flatOfficeNumber : ''} ${booking.floorNumber ? booking.floorNumber : ''}`,
      serviceAreaId: Converters.airPortNameToRegionId(booking.dropoffAirport),
      dropOffTime: dropoffTimeStamp,
      // "dropOffTime":""
    },
  };
  console.log('DB ready', newBooking);
  return newBooking;
};

const editBookingDataMapping = (booking) => {
  console.log('bookingDataMapping', booking);
  const newBooking = {
    id: booking.bookingId,
    email: booking.email,
    flightNumber: booking.flightNumber,
    flightDepartureTime: booking.flightDepartureTime,
    pickupLocationName: booking.pickupLocationName,
    requestedPickupLongitude: booking.requestedPickupLongitude,
    requestedPickupLatitude: booking.requestedPickupLatitude,
    requestedPickupTime: booking.requestedPickupTime,
    numberOfBags: Number(booking.numberOfBags),
    numberOfCompanions: Number(booking.numberOfCompanions),
    description: booking.description,
  };
  console.log('DB ready', newBooking);
  return newBooking;
};

const NewBookingSource = {
  newBooking(booking) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = bookingDataMapping(booking);
    console.log('New booking payload--', payload);

    return new Promise((resolve, reject) => {
      request.post(APIURL.NEW_BOOKING)
        .send(payload)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              browserHistory.push('/home/admin/bookings');
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success === false) {
              console.log('62-----', response);
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

  editBooking(booking) {
    const token = loadState().token;
    const payload = editBookingDataMapping(booking);
    console.log('payload--', payload);

    return new Promise((resolve, reject) => {
      request.put(APIURL.EDIT_BOOKING)
        .send(payload)
        .accept(APIURL.APPLICATION_TYPE)
        .set({ token })
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', responseData);
              browserHistory.push('/home/admin/bookings');
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success === false) {
              console.log('62-----', response);
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

  cancelBooking(booking) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    // const payload = bookingDataMapping(booking);
    console.log('payload--', booking);

    return new Promise((resolve, reject) => {
      request.post(APIURL.CANCEL_BOOKING)
        .send(booking)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              browserHistory.push('/home/admin/bookings');
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.success === false) {
              console.log('62-----', response);
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

  getFlightStats(flightInfo) {
    const flightInput = flightStatsInputParser(flightInfo);
    // flightInput having Carrier code and date PK 101 20/04/2018
    const URL = APIURL.FLIGHT_STATS
      .replace('{carrier}', flightInput[0])
      .replace('{flightNumber}', flightInput[1])
      .replace('{flightDate}', flightInput[2]);
    console.log('URL----', URL);
    const departureAirport = Converters.airPortNameTofsCode(flightInfo.dropoffAirport);

    return new Promise((resolve, reject) => {
      request.get(URL)
        .use(jsonp({ callbackName: 'airportResult', timeout: 10000 }))
        .end((err, res) => {
          if (res && res.body) {
            let obj,
              flightFound = false;
            console.log('responseData.FIND A FLIGHT', res);
            if (res.body.scheduledFlights && res.body.scheduledFlights.length > 0) {
              const flightResponse = res.body.scheduledFlights;
              flightResponse.forEach((element) => {
                console.log('element', element);
                if (element.departureAirportFsCode === departureAirport) {
                  flightFound = true;
                  obj = {
                    originalDate: element.departureTime,
                    departureTerminal: element && element.departureTerminal ? element.departureTerminal : 'Main Terminal',
                    departureTime: element.departureTime.substr(11, 5),
                    departureDate: element.departureTime.substr(0, 10),
                    flightEquipmentIataCode: '77W',
                    flightNumber: element.carrierFsCode + element.flightNumber,
                  };
                }
              });
              // let currentFlight = responseData.scheduledFlights[0];

              if (flightFound) {
                resolve({ requestedResult: true, data: obj });
              } else {
                // reject({ requestedResult: false, message: "No Flight Scheduled" })
                resolve({ requestedResult: false, data: '' });
              }
            }

            if (res && res.body && res && res.body.scheduledFlights && res && res.body.scheduledFlights.length === 0) {
              resolve({ requestedResult: false, data: '' });
            }
          } else {
            console.log('handle Error', err);
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },

};


export default NewBookingSource;
