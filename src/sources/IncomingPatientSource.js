import momentTZ from 'moment-timezone';
import request from 'superagent';
import APIURL from '../constants/apiUrlConstants';
import ErrorMapping from '../utils/ErrorMapping';
import { loadState } from '../utils/StorageUtils';
import { patientData } from '../utils/data';

const IncomingPatientSource = {
    getAllIncomingPatients() {
        return new Promise((resolve, reject) => {
            resolve({ requestedResult: true, data: patientData });
        });
    },
};

export default IncomingPatientSource;
