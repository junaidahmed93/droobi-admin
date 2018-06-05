import momentTZ from 'moment-timezone';
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { patientData } from '../utils/data';
let data = patientData;
const IncomingPatientSource = {
    getAllIncomingPatients() {

        return new Promise((resolve, reject) => {


           let updatedPatientData = []
            patientData.forEach(element =>{
                let heatBeat = element.heartRate;
                let random = Math.floor((Math.random() * 100) / 10);
                let color, newHeartRate = element.heartRate;
                if(random > 5) {
                     newHeartRate = Number(element.heartRate) + (random);
                    color = 'red';
                }
                else{
                    newHeartRate = Number(element.heartRate) - (random);
                    color = 'green'
                }
                
                let finalObj = Object.assign({}, element, { color, heartRate:newHeartRate });
                updatedPatientData.push(finalObj);
            })
            resolve({ requestedResult: true, data: updatedPatientData });
        });
    },
};

export default IncomingPatientSource;
