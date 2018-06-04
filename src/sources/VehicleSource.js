
import request from 'superagent';
import { browserHistory } from 'react-router';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import Converters from '../utils/Converters';

const addVehicleDataMapping = (vehicle) => {
  const vehicleData = {
    model: vehicle.model,
    type: vehicle.type,
    engineNumber: vehicle.engineNumber,
    chassisNumber: vehicle.chassisNumber,
    insuranceNumber: vehicle.insuranceNumber,
    insuranceExpiry: Converters.vehicleDateConverter(vehicle.insuranceExpiry),
    engineType: vehicle.engineType,
    registrationNumber: vehicle.registrationNumber,
    colour: vehicle.colour,
    numberPlate: vehicle.numberPlate,
    loadCapacity: vehicle.loadCapacity,
    carImageUrl: vehicle.carImageUrl,
    leftSideImageUrl: vehicle.leftSideImageUrl,
    rightSideImageUrl: vehicle.rightSideImageUrl,
    engineSideImageUrl: vehicle.engineSideImageUrl,
    backSideImageUrl: vehicle.backSideImageUrl,
  };
  return vehicleData;
};

const editVehicleDataMapping = (vehicle) => {
  console.log('Opsporter Edit', vehicle);
  const vehicleData = {
    id: vehicle.id,
    model: vehicle.model,
    type: vehicle.type,
    engineNumber: vehicle.engineNumber,
    chassisNumber: vehicle.chassisNumber,
    insuranceNumber: vehicle.insuranceNumber,
    insuranceExpiry: Converters.vehicleDateConverter(vehicle.insuranceExpiry),
    engineType: vehicle.engineType,
    registrationNumber: vehicle.registrationNumber,
    colour: vehicle.colour,
    numberPlate: vehicle.numberPlate,
    loadCapacity: vehicle.loadCapacity,
    carImageUrl: vehicle.carImageUrl,
    leftSideImageUrl: vehicle.leftSideImageUrl,
    rightSideImageUrl: vehicle.rightSideImageUrl,
    engineSideImageUrl: vehicle.engineSideImageUrl,
    backSideImageUrl: vehicle.backSideImageUrl,
  };
  return vehicleData;
};

const VehicleSource = {
  getAllVehicle() {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    console.log('header', header);
    return new Promise((resolve, reject) => {
      request.get(APIURL.GET_VEHICLE)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', responseData.data);
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
  addVehicle(vehicle) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = addVehicleDataMapping(vehicle);
    console.log('vehicle payload--', payload);
    return new Promise((resolve, reject) => {
      request.post(APIURL.VEHICLE_REGISTER)
        .send(payload)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', response);
              browserHistory.push('/home/admin/vehicle');
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
  vehicleProfile(id) {
    const result = {};
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, {
      token, deviceId: '123', OSVersion: 'win10', vehicleId: id,
    });
    const url = APIURL.GET_VEHICLE;
    return new Promise((resolve, reject) => {
      request.get(url)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          async function runAjax(item) {
            /* eslint no-shadow: "off" */
            return new Promise((resolve, reject) => {
              const imageURL = APIURL.IMAGES.replace('{fileName}', item.fileName);
              request.get(imageURL)
                .accept('image/jpeg')
                .set(header)
                .responseType('blob')
                .timeout(30000)
                .end((errInGetImg, responseGetImages) => {
                  const reader = new FileReader();
                  if (responseGetImages && responseGetImages.body) {
                    reader.readAsDataURL(responseGetImages.body);
                    reader.onloadend = () => {
                      const base64data = reader.result;
                      resolve(base64data);
                    };
                  } else {
                    console.log('Error in getting images');
                    reject('');
                  }
                });
            });
          }
          async function getPorterImages(imagesName, responseData) {
            for (const item of imagesName) {
              console.log('imagesName imagesName imagesName', item);
              result[item.type] = await runAjax(item, imagesName);
            }
            const vehicleProfile = Object.assign({}, responseData.data.vehicleList[0], result);
            console.log('vehicleProfile', vehicleProfile);
            resolve({ requestedResult: true, data: vehicleProfile });
          }
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            console.log('opsporter profile', responseData);

            if (responseData && responseData.success === true) {
              const resData = responseData.data.vehicleList[0];
              const imagesName = [];
              imagesName.push(
                { fileName: resData.backSideImageUrl, type: 'backSideImageUrl' },
                { fileName: resData.carImageUrl, type: 'carImageUrl' },
                { fileName: resData.engineSideImageUrl, type: 'engineSideImageUrl' },
                { fileName: resData.leftSideImageUrl, type: 'leftSideImageUrl' },
                { fileName: resData.rightSideImageUrl, type: 'rightSideImageUrl' },
              );
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
  updateVehicleOld(vehicle) {
    const token = loadState().token;
    const header = Object.assign({}, { token, deviceId: '123' });
    const payload = Object.assign({}, editVehicleDataMapping(vehicle), { id: vehicle.id });
    const parseOb = JSON.stringify(payload);
    console.log('finalPayload-- before parse', payload);

    return new Promise((resolve, reject) => {
      request.put(APIURL.VEHICLE_REGISTER)
        // .send(data)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .field('userDetails', parseOb)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('Updated success', response);
              browserHistory.push('/home/admin/vehicle');
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
  updateVehicle(vehicle) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token, deviceId: '123', OSVersion: 'win10' });
    const payload = editVehicleDataMapping(vehicle);
    console.log('vehicle payload--', payload);
    return new Promise((resolve, reject) => {
      request.post(APIURL.VEHICLE_REGISTER)
        .send(payload)
        .accept(APIURL.APPLICATION_TYPE)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            if (responseData && responseData.success === true) {
              console.log('58-----', responseData);
              browserHistory.push('/home/admin/vehicle');
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
  assignVehicle(obj) {
    const token = loadState().token;
    const header = Object.assign({}, APIURL.API_HEADERS, { token });
    return new Promise((resolve, reject) => {
      request.post(APIURL.ASSIGN_VEHICLE)
        .accept(APIURL.APPLICATION_TYPE)
        .send(obj)
        .set(header)
        .timeout(30000)
        .end((err, response) => {
          if (response && response.text) {
            const responseData = JSON.parse(response.text);
            console.log('267 responseData', responseData);
            if (responseData && responseData.success === true) {
              console.log('267 responseData', responseData);
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

export default VehicleSource;
