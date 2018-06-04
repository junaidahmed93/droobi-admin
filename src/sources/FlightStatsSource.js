
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import Converters from '../utils/Converters';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { flightStatsInputParser } from '../utils/Helpers';


// const airportResult = (e) => {
//   console.log('Airport Flight Callback', e);
// };
const FlightStatsSource = {
  getFlightStatsOLD(flightInfo) {
    const flightInput = flightStatsInputParser(flightInfo);
    // flightInput having Carrier code and date PK 101 20/04/2018
    const URL = APIURL.FLIGHT_STATS
      .replace('{carrier}', flightInput[0])
      .replace('{flightNumber}', flightInput[1])
      .replace('{flightDate}', flightInput[2]);
    console.log('URL----', URL);
    const departureAirport = Converters.airPortNameTofsCode(flightInfo.dropoffAirport);
    // if (flightInfo.dropoffAirport === 'Dubai International Airport') {
    //     departureAirport = 'DXB'
    // }
    // if (flightInfo.dropoffAirport === 'Jinnah International Airport') {
    //     departureAirport = 'KHI'
    // }

    return new Promise((resolve, reject) => {
      // let obj = {
      //     departureTerminal: "2",
      //     departureTime: "2018-04-17T12:05:00.000",
      //     flightEquipmentIataCode: "77W",
      //     flightNumber: "928",
      // }
      // resolve({ requestedResult: false, data: obj })
      request.get(URL)
        .timeout(30000).end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            let obj,
              flightFound = false;
            console.log('responseData.FIND A FLIGHT', responseData);
            if (responseData && responseData.scheduledFlights && responseData.scheduledFlights.length > 0) {
              const flightResponse = responseData.scheduledFlights;
              flightResponse.forEach((element) => {
                console.log('element', element);
                if (element.departureAirportFsCode === departureAirport) {
                  flightFound = true;
                  obj = {
                    originalDate: element.departureTime,
                    departureTerminal: element && element.departureTerminal ? element.departureTerminal : '1',
                    departureTime: element.departureTime.substr(11, 5),
                    departureDate: element.departureTime.substr(0, 10),
                    // flightEquipmentIataCode: "77W",
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

            if (responseData && responseData.scheduledFlights && responseData.scheduledFlights.length === 0) {
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

export default FlightStatsSource;
