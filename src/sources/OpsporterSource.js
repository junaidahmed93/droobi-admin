
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import Converters from '../utils/Converters';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';

const addOpsporterDataMapping = (opsporter) => {
  const ops = {
    name: opsporter.name,
    email: opsporter.email,
    phoneNumber: opsporter.phoneNumber,
    country: opsporter.nationality,
    deviceToken: '46783463hjg',
    roleName: 'ops',
    registerType: 'normal',
    emiratesId: opsporter.emiratesId,
    city: opsporter.city,
    nationality: opsporter.nationality,
    emergencyName: opsporter.emergencyName,
    emergencyNumber: opsporter.emergencyNumber,
    emergencyRelation: opsporter.emergencyRelation,
    dateOfBirth: Converters.dateConverter(opsporter.dateOfBirth),
    homeAddrress: opsporter.homeAddress,
    maritalStatus: opsporter.maritalStatus,
    visaNumber: opsporter.visaNumber,
    passportNumber: opsporter.passportNumber,
    visaValidity: opsporter.visaValidity,
    passportValidity: opsporter.passportValidity,
    // "driverLicenceNumber": opsporter.passportNumber,
    // "driverLicenceExpiry": 1522822930502,
    airPortId: Converters.airPortNameToRegionId(opsporter.airportId),
    // "dateOfBirth": '2018-01-02',
    imagesDtoList: {
      imagesList: [
        {
          fileName: 'profile.jpg',
          type: 'display',
          // "images": opsporter.displayImage
          images: opsporter.profilePicture,

        },
        {
          fileName: 'passport.jpg',
          type: 'passport',
          // "images": opsporter.passport
          images: opsporter.passportImage,

        },
        {
          fileName: 'visa.jpg',
          type: 'visa',
          // "images": opsporter.visa
          images: opsporter.visaImage,

        },
        {
          fileName: 'emirates_id.jpg',
          type: 'emirates_id',
          // "images": opsporter.emirates_id
          images: opsporter.workPermit,

        },
      ],
    },

  };
  return ops;
};

const editOpsporterDataMapping = (opsporter) => {
  console.log('Opsporter Edit', opsporter);
  const ops = {
    name: opsporter.name,
    // "password": opsporter.password,
    email: opsporter.email,
    phoneNumber: opsporter.phoneNumber,
    country: opsporter.nationality,
    deviceToken: '46783463hjg',
    roleName: 'ops',
    registerType: 'normal',
    emiratesId: opsporter.emiratesId,
    city: opsporter.city,
    nationality: opsporter.nationality,
    emergencyName: opsporter.emergencyName,
    emergencyNumber: opsporter.emergencyNumber,
    emergencyRelation: opsporter.emergencyRelation,
    dateOfBirth: Converters.dateConverter(opsporter.dateOfBirth),
    homeAddrress: opsporter.homeAddrress,
    maritalStatus: opsporter.maritalStatus,
    visaNumber: opsporter.visaNumber,
    passportNumber: opsporter.passportNumber,
    visaValidity: Converters.dateConverter(opsporter.visaValidity),
    passportValidity: Converters.dateConverter(opsporter.passportValidity),
    // "roles": [
    //     { id: 3, roleType: "ops" }
    // ],
    // "driverLicenceNumber": opsporter.passportNumber,
    // "driverLicenceExpiry": 1522822930502,
    airPortId: opsporter.airPortId,
    // "dateOfBirth": '2018-01-02',
    imagesDtoList: {
      imagesList: [
        {
          // "fileName": "profile.jpg",
          fileName: opsporter.displayImageUrl,
          type: 'display',
          images: opsporter.displayImage,

        },
        {
          fileName: opsporter.imagesDtoList.imagesList[0].fileName,
          // "fileName": "passport.jpg",
          type: 'passport',
          images: opsporter.passport,

        },
        {
          // "fileName": "visa.jpg",
          fileName: opsporter.imagesDtoList.imagesList[1].fileName,
          type: 'visa',
          images: opsporter.visa,

        },
        {
          fileName: opsporter.imagesDtoList.imagesList[2].fileName,
          type: 'emirates_id',
          images: opsporter.emirates_id,

        },
      ],
    },

  };


  return ops;
};

const OpsporterSource = {
  getAllOpsporter() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    console.log('header', header);
    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_OPSPORTER)
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
  addOpsporter(opsprter) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = addOpsporterDataMapping(opsprter);
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
              console.log('58-----', response);
              browserHistory.push('/home/admin/opsporter');
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
  opsporterProfile(id) {
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
            const opsporterProfile = Object.assign({}, responseData.data, result);
            resolve({ requestedResult: true, data: opsporterProfile });
          }
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            console.log('opsporter profile', responseData);

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
  updateOpsporter(opsporter) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123' });
    const payload = Object.assign({}, editOpsporterDataMapping(opsporter), { id: opsporter.id });
    const parseOb = JSON.stringify(payload);
    console.log('finalPayload-- before parse', payload);

    return new Promise((resolve, reject) => {
      request.put(APIURL.UPDATE_USER)
        // .send(data)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .field('userDetails', parseOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              browserHistory.push('/home/admin/opsporter');
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

export default OpsporterSource;
