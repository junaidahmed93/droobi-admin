
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const DashboardSource = {

  getDriporterLocations() {
    const user = loadState();
    if (user) {
      const token = user.token;
      const header = Object.assign({}, APIURL.API_HEADERS, { token });
      console.log('header', header);
      const URL = APIURL.GET_DRIPORTER_LOCATIONS;
      return new Promise((resolve, reject) => {
        request.get(URL)
          .accept(APIURL.APPLICATION_TYPE)
          .set(header)
          .timeout(30000)
          .end((err, response) => {
            if (response && response.text) {
              const driporterLocationInfo = [];
              const responseData = JSON.parse(response.text);
              if (responseData && responseData.success === true) {
                const allDriporter = responseData.data;

                for (let i = 0; i < allDriporter.length; i++) {
                  const t = Object.assign({}, allDriporter[i], { lat: allDriporter[i].latitude, lng: allDriporter[i].longitude });
                  driporterLocationInfo.push(t);
                }

                // let temp;
                // const data4 = JSON.parse(localStorage.getItem('location'));
                // console.log('data4', data4);
                // if (data4) {
                //   let lt = data4[0].lat;
                //   let lg = data4[0].lng;
                //   console.log('lt------', lt);
                //   console.log('gt-------', lg);
                //   lt = Number(lt) + 0.000150;
                //   lg = Number(lg) - 0.000300;

                //   let lt1 = data4[0].lat;
                //   let lg1 = data4[0].lng;
                //   console.log('lt------', lt1);
                //   console.log('gt-------', lg1);
                //   lt1 = Number(lt1) + 0.000450;
                //   lg1 = Number(lg1) - 0.000900;
                //   temp = [
                //     { lat: lt, lng: lg },
                //     { lat: lt1, lng: lg1 },
                //   ];
                //   localStorage.setItem('location', JSON.stringify(temp));
                // } else {
                //   temp = [
                //     { lat: 25.202505, lng: 55.275397 },
                //     { lat: 25.202711, lng: 55.275048 },
                //   ];
                //   localStorage.setItem('location', JSON.stringify(temp));
                // }

                // console.log('final push', temp);
                resolve({ requestedResult: true, data: driporterLocationInfo });
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
    }
  },


};

export default DashboardSource;
