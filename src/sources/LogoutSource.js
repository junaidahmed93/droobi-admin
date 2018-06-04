
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const LogoutSource = {
  requestLogOutSource() {
    const user = loadState();
    const header = Object.assign({}, APIURL.API_HEADERS, { token: user.token });
    return new Promise((resolve, reject) => {
      request
        .post(APIURL.LOGOUT)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              resolve({ requestedResult: true });
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

export default LogoutSource;
