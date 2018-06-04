
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const GetHotelPartnerSource = {
  hotelPartnerNormalizer(responseDtoList) {
    const normalizedParnterList = [];
    responseDtoList.forEach((element, id) => {
      console.log('12--elemet', element);
      normalizedParnterList.push({

        dataId: id,
        hotelName: element.hotelDto.hotelName,
        longitude: element.hotelDto.longitude,
        latitude: element.hotelDto.latitude,
        address: element.hotelDto.address,
        bookingLimit: element.hotelDto.bookingLimit,
        hotelId: element.hotelDto.id,
        userId: element.userDto.id,
        name: element.userDto.name,

        email: element.userDto.email,
        phoneNumber: element.userDto.phoneNumber,
        country: element.userDto.country,
        deviceToken: element.userDto.deviceToken,
        nationality: element.userDto.nationality,
        emiratesId: element.userDto.emiratesId,
        city: element.userDto.city,
        emergencyName: element.userDto.emergencyName,
        emergencyNumber: element.userDto.emergencyNumber,
        emergencyRelation: element.userDto.emergencyRelation,
        homeAddress: element.userDto.homeAddrress,
        dateOfBirth: element.userDto.dateOfBirth,
        roleType: element.userDto.roles[0].roleType,
        roleId: element.userDto.roles[0].id,


      });
    });
    return normalizedParnterList;
  },
  getHotelPartnerUsers() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    console.log('header', header);

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_HOTEL_PARTNER_LIST)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              const responseDtoList = responseData && responseData.data && responseData.data.hotelCheckInResponseDtoList;
              if (responseDtoList) {
                const normalList = this.hotelPartnerNormalizer(responseDtoList);
                resolve({ requestedResult: true, data: normalList });
              }
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

export default GetHotelPartnerSource;
