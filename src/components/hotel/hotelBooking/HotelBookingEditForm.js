import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import InputEditBox from '../../../components/shared/forms/InputEditBox';
import InputEditSelect from '../../../components/shared/forms/InputEditSelect';
import Converters from '../../../utils/Converters';
import { getAirportFromDeptLoc, getTerminalFromDeptLoc, getCountries, getAirports } from '../../../utils/Helpers';

export default class BookingEditForm extends React.Component {
  constructor(props) {
    super(props);
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectCountry = countryList[0];
  }


  render() {
    return (
      <form className="form-validation">
        <h2 className="paper-title">Booking Details: <span style={{ color: '#27BCBD' }}>{this.props.booking.referenceId}</span> </h2>
        <h4 className="paper-title"> Status: <span className="Hotel-booking-status">{this.props.booking.status}</span>  </h4>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="guestName"
                setValue={this.props.setValue}
                prefilled={this.props.booking.name}
                label="Guest Name"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="contactNumber"
                setValue={this.props.setValue}
                hintText="+971234578900"
                prefilled={Number(this.props.booking.phoneNumber)}
                label="Contact Number"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="emailAddress"
                setValue={this.props.setValue}
                prefilled={this.props.booking.email}
                label="Email Address"
                type="email"
                disabled
              />
            </Col>
          </Row>
          <Row>
            {/* <Col md={4}>

                            <InputEditBox
                                id="passportNumber"
                                setValue={this.props.setValue}
                                prefilled={this.props.booking.passportNumber}
                                label="Passport Number"
                                type="number" />
                        </Col> */}
            <Col md={4}>
              <InputEditSelect
                id="country"
                values={this.selectCountry}
                setValue={this.props.setValue}
                prefilled={this.props.booking.country}
                label="Country"
                disabled
              />
              {/* <InputEditBox
                                id="nationality"
                                setValue={this.props.setValue}
                                prefilled={this.props.booking.nationality}
                                label="Nationality"
                                type="text" /> */}
            </Col>
            <Col md={4}>
              {/* <InputEditBox
                                id="emailAddress"
                                setValue={this.props.setValue}
                                label="Email Address"
                                type="email" /> */}
            </Col>
          </Row>

        </Grid>
        <h2 className="paper-title heading-spacing">Flight Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="flightNumber"
                setValue={this.props.setValue}
                prefilled={this.props.booking.flightNumber}
                label="Flight Number"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="flightDate"
                setValue={this.props.setValue}
                prefilled={Converters.dateConverter(this.props.booking.flightDepartureTime)}
                label="Flight Date"
                type="date"
                fixedFloat
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="flightTime"
                setValue={this.props.setValue}
                prefilled={Converters.timeConverter(this.props.booking.flightDepartureTime)}
                label="Flight Time"
                type="time"
                fixedFloat
                disabled
              />
            </Col>
          </Row>
        </Grid>

        <h2 className="paper-title heading-spacing">Pickup Luggage Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="pickupDate"
                setValue={this.props.setValue}
                prefilled={Converters.dateConverter(this.props.booking.requestedPickupTime)}
                label="Pickup Date"
                type="date"
                fixedFloat
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="pickupTime"
                setValue={this.props.setValue}
                prefilled={Converters.timeConverter(this.props.booking.requestedPickupTime)}
                label="Pickup Time"
                type="time"
                fixedFloat
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="numberOfBags"
                setValue={this.props.setValue}
                prefilled={Number(this.props.booking.numberOfBags)}
                label="No of Bags"
                type="number"
                disabled={this.props.editMode}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="numberOfCompanions"
                setValue={this.props.setValue}
                prefilled={this.props.booking.numberOfCompanions}
                label="Number of Companions"
                type="number"
                disabled={this.props.editMode}
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="commentsForDriporter"
                setValue={this.props.setValue}
                prefilled={this.props.booking.commentsForDriporter}
                label="Comments for Driporter"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="description"
                setValue={this.props.setValue}
                prefilled={this.props.booking.description}
                label="Description"
                type="text"
                disabled={this.props.editMode}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="flatOfficeNumber"
                setValue={this.props.setValue}
                prefilled={this.props.booking.flatOfficeNumber || ' '}
                label="Flat / Office #"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="floorNumber"
                setValue={this.props.setValue}
                prefilled={this.props.booking.floorNumber || ' '}
                label="Floor No."
                type="text"
                disabled
              />
            </Col>

          </Row>
        </Grid>

        <h2 className="paper-title heading-spacing">Dropoff Luggage Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="dropoffAirport"
                setValue={this.props.setValue}
                // values={this.selectAirportId}
                prefilled={getAirportFromDeptLoc(this.props.booking.departureLocationName)}
                label="Airport"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="dropoffTerminal"
                setValue={this.props.setValue}
                prefilled={getTerminalFromDeptLoc(this.props.booking.departureLocationName)}
                label="Terminal"
                type="text"
                disabled
              />
            </Col>
            <Col md={4}>
              <InputEditBox
                id="dropoffDate"
                setValue={this.props.setValue}
                prefilled={Converters.dateConverter(this.props.booking.dropOffTime)}
                label="Date"
                type="date"
                fixedFloat
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputEditBox
                id="dropoffTime"
                setValue={this.props.setValue}
                prefilled={Converters.timeConverter(this.props.booking.dropOffTime)}
                label="Time"
                type="time"
                fixedFloat
                disabled
              />
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}
