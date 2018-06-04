
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import { loadState } from '../utils/StorageUtils';

const CustomerSource = {
  getAllCustomer() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_CUSTOMER_LIST)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, res) => {
          if (res && res.text) {
            const responseData = JSON.parse(res.text);
            console.log('Customer', responseData);
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
};

export default CustomerSource;
