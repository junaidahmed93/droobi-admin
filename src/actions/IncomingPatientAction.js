import CONSTANTS from '../constants/actionConstants';
import * as LoaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import IncomingPatientSource from '../sources/IncomingPatientSource';

export function getIncomingPatientsSuccess(incomingPatient) {
    const action = {
        type: CONSTANTS.GET_INCOMING_PATIENTS_SUCCESS,
        incomingPatient,
    };
    return action;
}

export function getIncomingPatientsFail(message) {
    const action = {
        type: CONSTANTS.GET_INCOMING_PATIENTS_FAIL,
        message,
    };
    return action;
}

export function getAllIncomingPatients() {
    return (dispatch) => {
        // dispatch(LoaderActions.loaderStart());
        return IncomingPatientSource.getAllIncomingPatients()
            .then((res) => {
                dispatch(LoaderActions.loaderStop());
                if (res && res.requestedResult === true) {
                    console.log("res----------", res);
                    const bookings = [];
                    res.data.forEach((element) => {
                        bookings.push(element);
                    });
                    dispatch(getIncomingPatientsSuccess(bookings));
                } else {
                    dispatch(NotificationActions.showNotification(res.message));
                }
            })
            .catch((err) => {
                dispatch(LoaderActions.loaderStop());
                dispatch(getIncomingPatientsFail());
                NotificationActions.showNotification(err.message);
                console.log('addUserActions error', err);
            });
    };
}

