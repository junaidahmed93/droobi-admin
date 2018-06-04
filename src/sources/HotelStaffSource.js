
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const addHotelStaffDataMapping = (HotelStaff) => {
  console.log('hotel staff', HotelStaff);
  const ops = {

    name: HotelStaff.name,
    // "password": HotelStaff.password,
    email: HotelStaff.email,
    phoneNumber: HotelStaff.phoneNumber,
    country: HotelStaff.nationality,
    deviceToken: '46783463hjg',
    roleName: 'hotelCheckInStaff',
    registerType: 'normal',
    emiratesId: HotelStaff.emiratesId,
    city: HotelStaff.city,
    nationality: HotelStaff.nationality,
    emergencyName: HotelStaff.emergencyName,
    emergencyNumber: HotelStaff.emergencyNumber,
    emergencyRelation: HotelStaff.emergencyRelation,
    dateOfBirth: HotelStaff.dateOfBirth,
    homeAddrress: HotelStaff.homeAddress,
    hotelId: loadState().hotelId,
    // "driverLicenceNumber": HotelStaff.passportNumber,
    // "driverLicenceExpiry": 1522822930502,
    // "airPortId": Converters.airPortNameToRegionId(HotelStaff.airportId),
    // "dateOfBirth": '2018-01-02',
    imagesDtoList: {
      imagesList: [
        {
          fileName: 'profile.jpg',
          type: 'display',
          images: HotelStaff.profilePicture,

        },

      ],
    },

  };
  return ops;
};

const editHotelStaffDataMapping = (HotelStaff) => {
  console.log('hote Stall update user', HotelStaff);
  const ops = {
    id: HotelStaff.id,
    name: HotelStaff.name,
    email: HotelStaff.email,
    phoneNumber: HotelStaff.phoneNumber,
    country: HotelStaff.nationality,
    deviceToken: '46783463hjg',
    roleName: 'hotelCheckInStaff',
    registerType: 'normal',
    emiratesId: HotelStaff.emiratesId,
    city: HotelStaff.city,
    nationality: HotelStaff.nationality,
    emergencyName: HotelStaff.emergencyName,
    emergencyNumber: HotelStaff.emergencyNumber,
    emergencyRelation: HotelStaff.emergencyRelation,
    dateOfBirth: Converters.dateConverter(HotelStaff.dateOfBirth),
    homeAddrress: HotelStaff.homeAddrress,
    imagesDtoList: {
      imagesList: [
        {
          fileName: 'profile.jpg',
          type: 'display',
          images: HotelStaff.displayImage,

        },
      ],
    },

  };
  return ops;
};

const HotelStaffSource = {
  getAllHotelStaff() {
    const user = loadState();
    const header = Object.assign({}, APIURL.API_HEADERS, { token: user.token });
    // let URL = APIURL.GET_HOTEL_STAFF.replace('{hotelId}', user.role.id);
    const URL = APIURL.GET_HOTEL_STAFF.replace('{hotelId}', user.hotelId);
    console.log('URL-------------------->', URL);
    return new Promise((resolve, reject) => {
      request.get(URL)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            console.log('responseData responseData responseData responseData', responseData);
            if (responseData && responseData.success === true) {
              console.log('160 hotel new staff -----', responseData);

              resolve({ requestedResult: true, data: responseData.data });
            }
            if (responseData && (responseData.success === false || responseData.status === 400)) {
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
  addHotelStaff(opsprter) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = addHotelStaffDataMapping(opsprter);
    console.log('payload--', payload);
    return new Promise((resolve, reject) => {
      request.post(APIURL.REGISTER_USER)
        .send(payload)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('160 hotel new staff -----', responseData);
              browserHistory.push('/home/hotel/staff');
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
  HotelStaffProfile(id) {
    const result = {};
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const url = APIURL.OPSPORTER_PROFILE.replace('{id}', id);
    return new Promise((resolve, reject) => {
      request.get(url)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          async function runAjax(item) {
            return new Promise(() => {
              const imageURL = APIURL.IMAGES.replace('{fileName}', item.fileName);
              request.get(imageURL)
                .accept('image/jpeg')
                .set(header)
                .responseType('blob')
                .timeout(30000)
                .end((errInGetImg, responseGetImages) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(responseGetImages.body);
                  reader.onloadend = () => {
                    const base64data = reader.result;
                    resolve(base64data);
                  };
                });
            });
          }
          async function getPorterImages(imagesName, responseData) {
            for (const item of imagesName) {
              result[item.type] = await runAjax(item, imagesName);
            }
            const HotelStaffProfile = Object.assign({}, responseData.data, result);
            console.log('HOTEL STAFF PROFILE', HotelStaffProfile);
            resolve({ requestedResult: true, data: HotelStaffProfile });
          }

          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            console.log('responseData', responseData);

            if (responseData && responseData.success === true) {
              const imagesName = responseData.data.imagesDtoList.imagesList;
              imagesName.push({ fileName: responseData.data.displayImageUrl, type: 'displayImage' });
              getPorterImages(imagesName, responseData);
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
  updateHotelStaff(HotelStaff) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = Object.assign({}, editHotelStaffDataMapping(HotelStaff));
    // const payload = {
    //     "name": "khizer",
    //     "id": 273,
    //     "email": "front.desk.zahid@mailinator.com",
    //     "phoneNumber": 659865868,
    //     "roleName": "hotelCheckInStaff"
    // }
    console.log('payload--', payload);
    const parseOb = JSON.stringify(payload);
    console.log('parseOb', parseOb);
    return new Promise((resolve, reject) => {
      request.put(APIURL.UPDATE_USER)

        .accept(APIURL.APPLICATION_TYPE)

        .set(header)

        .field('userDetails', parseOb)
        // .field('userDetails', testOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('247-----', responseData);
              browserHistory.push('/home/hotel/staff');
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

export default HotelStaffSource;
