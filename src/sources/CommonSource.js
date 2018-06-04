
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const CommonSource = {
  getCountryList() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_COUNTRY_LIST)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('response DATA COUNTRT');
            if (responseData && responseData.data && responseData.data.countryList) {
              resolve({ requestedResult: true, data: responseData.data.countryList });
            }
            if (responseData && responseData.data === null) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  getAirports() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_AIRPORT_LIST)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('response Get airports', responseData);
            if (responseData && responseData.data && responseData.data) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.data === null) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  getServiceArea() {
    const token = loadState().token;
    // const token = 'b12357fd5bb445088ab038acb08040de';
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_SERVICEAREA_LIST)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('response Get airports', responseData);
            if (responseData && responseData.data && responseData.data) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.data === null) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  getBookingCancelReasons() {
    const token = loadState().token;
    // const token = 'b12357fd5bb445088ab038acb08040de';
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.CANCEL_BOOKING_REASON)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('response booking cancel', responseData);
            if (responseData && responseData.data && responseData.data) {
              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && responseData.data === null) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            reject(err);
          }
        });
    });
  },
  staffActivation(userId, staff) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, userId });

    return new Promise((resolve, reject) => {
      request.put(APIURL.STAFF_ACTIVATION)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('porter', responseData);
            if (responseData && responseData.success && responseData.success === true) {
              browserHistory.push(`/home/admin/${staff}`);
              resolve({ requestedResult: true });
            }
            if (responseData && responseData.success && responseData.success === false) {
              const responseErrorMessage = responseData.errors[0].errorMessage;
              resolve({ requestedResult: false, message: responseErrorMessage });
            }
          } else {
            const handleError = ErrorMapping.unhandleError(err);
            reject({ requestedResult: false, message: handleError });
          }
        });
    });
  },
  staffDeActivation(userId, staff) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, userId });
    return new Promise((resolve, reject) => {
      request.put(APIURL.STAFF_DEACTIVATION)
        .set(header)
        .timeout(30000).end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              browserHistory.push(`/home/admin/${staff}`);
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
};

export default CommonSource;
