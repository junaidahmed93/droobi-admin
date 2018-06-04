import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const addDriporterDataMapping = (driporter) => {
  console.log('DRIPORTER---------', driporter);
  const ops = {
    name: driporter.name,
    // "password": driporter.password,
    email: driporter.email,
    phoneNumber: driporter.phoneNumber,
    country: driporter.nationality,
    deviceToken: '46783463hjg',
    roleName: 'porter',
    registerType: 'normal',
    emiratesId: driporter.emiratesId,
    city: driporter.city,
    nationality: driporter.nationality,
    emergencyName: driporter.emergencyName,
    emergencyNumber: driporter.emergencyNumber,
    emergencyRelation: driporter.emergencyRelation,
    dateOfBirth: driporter.dateOfBirth,
    homeAddrress: driporter.homeAddress,
    maritalStatus: driporter.maritalStatus,
    visaNumber: driporter.visaNumber,
    passportNumber: driporter.passportNumber,
    visaValidity: driporter.visaValidity,
    passportValidity: driporter.passportValidity,
    // "driverLicenceNumber": driporter.passportNumber,
    // "driverLicenceExpiry": 1522822930502,
    serviceAreaId: Converters.serviceAreaNameToId(driporter.serviceAreaId),
    // "serviceAreaId":1,
    // "dateOfBirth": '2018-01-02',
    imagesDtoList: {
      imagesList: [
        {
          fileName: 'profile.jpg',
          type: 'display',
          // "images": driporter.displayImage
          images: driporter.profilePicture,

        },
        {
          fileName: 'passport.jpg',
          type: 'passport',
          // "images": driporter.passport
          images: driporter.passportImage,

        },
        {
          fileName: 'visa.jpg',
          type: 'visa',
          // "images": driporter.visa
          images: driporter.visaImage,

        },
        {
          fileName: 'emirates_id.jpg',
          type: 'emirates_id',
          // "images": driporter.emirates_id
          images: driporter.workPermit,

        },
      ],
    },

  };
  console.log('Driporter Going----->', ops);
  return ops;
};

const editdriporterDataMapping = (driporter) => {
  console.log('editdriporterDataMapping', driporter);
  const ops = {
    id: driporter.id,
    name: driporter.name,
    // "password": driporter.password,
    email: driporter.email,
    phoneNumber: driporter.phoneNumber,
    country: driporter.nationality,
    deviceToken: '46783463hjg',
    roleName: 'porter',
    registerType: 'normal',
    emiratesId: driporter.emiratesId,
    city: driporter.city,
    nationality: driporter.nationality,
    emergencyName: driporter.emergencyName,
    emergencyNumber: driporter.emergencyNumber,
    emergencyRelation: driporter.emergencyRelation,
    dateOfBirth: Converters.dateConverter(driporter.dateOfBirth),
    homeAddrress: driporter.homeAddrress,
    maritalStatus: driporter.maritalStatus,
    visaNumber: driporter.visaNumber,
    passportNumber: driporter.passportNumber,
    visaValidity: Converters.dateConverter(driporter.visaValidity),
    passportValidity: Converters.dateConverter(driporter.passportValidity),
    // "driverLicenceNumber": driporter.passportNumber,
    // "driverLicenceExpiry": 1522822930502,
    serviceAreaId: driporter.serviceAreaId,
    // "dateOfBirth": '2018-01-02',

    imagesDtoList: {
      imagesList: [
        {
          fileName: 'profile.jpg',
          type: 'display',
          images: driporter.displayImage,

        },
        {
          fileName: 'passport.jpg',
          type: 'passport',
          images: driporter.passport,

        },
        {
          fileName: 'visa.jpg',
          type: 'visa',
          images: driporter.visa,

        },
        {
          fileName: 'emirates_id.jpg',
          type: 'emirates_id',
          images: driporter.emirates_id,

        },
      ],
    },

  };
  console.log('editdriporterDataMapping return', ops);
  return ops;
};

const driporterSource = {
  getAllDriporter() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });

    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_DRIPORTER)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', responseData);
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
  addDriporter(opsprter) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = addDriporterDataMapping(opsprter);
    console.log('DRIPORTER PAYLOAD', payload);
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
              console.log('58-----', response);
              browserHistory.push('/home/admin/driporter');
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
  driporterProfile(id) {
    const result = {};
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const url = APIURL.DRIPORTER_PROFILE.replace('{id}', id);
    return new Promise((resolve, reject) => {
      request.get(url)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          async function runAjax(item) {
            /* eslint no-shadow: "off" */
            return new Promise((resolve) => {
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
            const driporterProfile = Object.assign({}, responseData.data, result);
            resolve({ requestedResult: true, data: driporterProfile });
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
  updateDriporter(driporter) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = Object.assign({}, editdriporterDataMapping(driporter));
    const parseOb = JSON.stringify(payload);
    console.log('Edit Dri--', payload);
    return new Promise((resolve, reject) => {
      request.put(APIURL.UPDATE_USER)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .field('userDetails', parseOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              browserHistory.push('/home/admin/driporter');
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

export default driporterSource;
