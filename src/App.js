import React, { Component } from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import { store, persistor } from './store';
import LoginContainer from './containers/LoginContainer';
import MainContainer from './containers/MainContainer';
import AdminContainer from './containers/AdminContainer';
import AllPatientsContainer from './containers/AllPatientsContainer';
import SinglePatientContainer from './containers/SinglePatientContainer';
import DashboaradContainer from './containers/DashboaradContainer';

import NotFound from './containers/NotFound';
// import HttpsRedirect from 'react-https-redirect';

class App extends Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace) {
    if (!store.getState().loginReducer.isLoggedIn) {
      replace({
        pathname: '/',
      });
    }
    if (nextState.location.pathname === '/home' || nextState.location.pathname === '/home/' || nextState.location.pathname === '/home/hotel' || nextState.location.pathname === '/home/hotel/') {
      replace({
        pathname: '/home/admin/dashboard',
      });
    }
  }
  requireHotelAdmin(nextState, replace) {
    // if (store.getState().loginReducer.user.role.roleType === 'hotelCheckInAdmin') {
    //   replace({
    //     pathname: '/home/hotel/bookings'
    //   })
    // }

    if (store.getState().loginReducer.user.userId === 245) {
      replace({
        pathname: '/home/hotel/bookings',
      });
    }
  }
  mustAdmin(nextState, replace) {
    if (store.getState().loginReducer.user.role.roleType === 'hotelCheckInAdmin') {
      replace({
        pathname: '/home/hotel/bookings',
      });
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            {/* <HttpsRedirect> */}
            <Router history={browserHistory}>
              <Route path="/">
                <IndexRoute component={LoginContainer} />
                <Route path="/home" component={MainContainer} onEnter={this.requireAuth}>
                  <Route path="admin" component={AdminContainer} onEnter={this.mustAdmin}>
                    <Route path="dashboard" component={DashboaradContainer} />
                    <Route path="patient" component={AllPatientsContainer} />
                    <Route path="patient/:id" component={SinglePatientContainer} />                    
                  </Route>
                </Route>
                <Route path="*" component={NotFound} />
              </Route>
            </Router>
            {/* </HttpsRedirect> */}
          </Provider>
        </PersistGate>
      </MuiThemeProvider>
    );
  }
}

export default App;
