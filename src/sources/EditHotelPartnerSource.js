import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const userDataMapping = (userData) => {
  const user = {
    hotelDto: {
      hotelName: userData.hotelName,
      longitude: userData.longitude,
      latitude: userData.latitude,
      address: userData.address,
      bookingLimit: userData.bookingLimit,
      id: userData.hotelId,
    },
    userDto: {
      homeAddrress: userData.homeAddress,
      id: userData.userId,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      country: userData.country,
      dataOfBirth: 1520985600000,
      roleName: userData.roleType,
      registerType: 'normal',
      emiratesId: userData.emiratesId,
      city: userData.city,
      nationality: userData.country,
      emergencyName: userData.emergencyName,
      emergencyNumber: userData.emergencyNumber,
      emergencyRelation: userData.emergencyRelation,
      dateOfBirth: userData.dateOfBirth,
    },
  };

  return user;
};
const EditHotelPartnerSource = {
  editHotelPartner(user) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = userDataMapping(user);

    return new Promise((resolve, reject) => {
      request.post(APIURL.REGISTER_HOTEL_USER)
        .send(payload)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
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

export default EditHotelPartnerSource;
