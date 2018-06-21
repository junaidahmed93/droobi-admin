import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import BookingCharts from '../../components/booking/BookingCharts';
import GlobalStyle from '../utils/Styles';
import * as actions from '../actions/IncomingPatientAction';
import IncomingPatient from '../components/booking/IncomingPatient';
import { nextBookings, previousBookings, startRecord, endRecord, totalRecords } from '../utils/Pagination';
import { patientData } from '../utils/data';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const shortSheets = {
  width: '47.5%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
};

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.state = {
      shownRecords: [],
      storedRecords: [],
      currentRowCount: 10,
      startSearch: false,
      open: false,
      showSearchbar: false,
      showFilterBar: false,
      showTagBar: false,
      value: '',
      deptValue: '',
      doctValue: '',
      errorText: '',
      errorClass: '',
      filteredValues: ['1', '2', '3', '4', '5'],
      selectedValue: '',
      local: ['68', '110', '105'],
      local2: ['68', '110', '105'],
      doctors: ['Dr. Arshaad', 'Dr. Sarim', 'Dr. Haris', 'Dr. Ahmed'],
    };
    this.searchedRecords = [];
    this.startingNextCount = 0;
    this.currentPageNumber = -1;
    this.interval = () => { };
    this.interval2 = () => { };
  }


  componentDidMount() {
    this.props.actions.getAllIncomingPatients();
    this.interval = setInterval(() => {
      this.props.actions.getAllIncomingPatients();
    }, 1000);

    this.interval2 = setInterval(() => {
      let a = [];
      for (let i = 0; i < this.state.local.length; i++) {
        const random = Math.floor((Math.random() * 100) / 10);
        a[i] = Number(this.state.local2[i]) + random;
      }

      this.setState({ local: a });
    }, 5000);
    // this.refreshBooking();
    // this.setState({shownRecords: patientData });
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      // shownRecords: nextProps.bookings,
      // storedRecords: nextProps.bookings,
    });

    setTimeout(() => {
      let endCount;
      let startCount;
      if (this.currentPageNumber > 0) {
        console.log('IF');
        startCount = this.currentPageNumber;
        endCount = startCount + 10;
      } else {
        console.log('Else');
        startCount = 0;
        endCount = this.state.currentRowCount;
      }
      this.setState({
        shownRecords: nextProps.bookings.slice(startCount, endCount),
        storedRecords: nextProps.bookings,
      });
    }, 5000);
  }


  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSearchChanged(object, value) {
    this.searchedRecords = [];
    if (value === '') {
      this.refreshBooking();
      this.setState({ shownRecords: this.state.storedRecords.slice(0, 10), startSearch: false });
      this.searchedRecords = [];
    } else {
      console.log('CLEAR INTERVAL');
      clearInterval(this.interval);
      this.state.storedRecords.forEach((item) => {
        if (item.userName.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.searchedRecords.push(item);
        }
      });
      this.startingNextCount = 0;
      this.setState({ shownRecords: this.searchedRecords, startSearch: true });
    }
  }

  handleChange = (event, index, value) => this.setState({ value });

  handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handlerSearch = () => {
    this.setState({ showSearchbar: true, showFilterBar: false, showTagBar: false });
  }

  handlerFilter = () => {
    this.setState({ showSearchbar: false, showFilterBar: true, showTagBar: false });
  }

  handlerTag = () => {
    this.setState({ showSearchbar: false, showFilterBar: false, showTagBar: true });
  }

  refreshBooking() {
    this.interval = setInterval(() => {
      console.log('startingNextCount', this.startingNextCount);
      this.currentPageNumber = this.startingNextCount;
      // this.props.actions.getAllBookings();
    }, 10000);
  }

  nextButton() {
    const nextRecords = nextBookings(this.state, this.startingNextCount);
    if (nextRecords) {
      this.startingNextCount = nextRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(nextRecords, nextRecords + 10) });
    }
  }

  previousButton() {
    const previousRecords = previousBookings(this.state, this.startingNextCount);
    if (!(previousRecords < 0)) {
      this.startingNextCount = previousRecords;
      this.setState({ shownRecords: this.state.storedRecords.slice(previousRecords, previousRecords + 10) });
    }
  }

  handleChange = (event, index, values) => this.setState({ values });

  handleChangeDept = (event, index, values) => this.setState({ deptValue: values });

  handleChangeDoct = (event, index, values) => this.setState({ doctValue: values });

  assigndoc = () => {
    this.state.shownRecords.pop();

    this.setState({ open: false, shownRecords: this.state.shownRecords });
  }
  assignDoctor = () => {
    this.setState({ open: true });
  }

  onClickDialoge = () => {
    this.setState({ open: false });
  }

  render() {
    const actionsButton = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onClick={() => { this.onClickDialoge(); }}
      />,
    ];

    const { values, selectedValue, filteredValues, doctors, open, errorText, value } = this.state;
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>


          <Grid>
            <Row>
              <Col md={3} />
              <Col md={7}>
                <h1>Welcome to Droobi Ambulance System</h1>
              </Col>
              <Col md={2} />
            </Row>
          </Grid>
        </Paper>

        <Paper style={shortSheets} zDepth={0} >
          <Grid fluid>
            <Row>
              <Col md={2}>

              </Col>
              <Col md={8}>

                <span style={{ padding: '5px', fontSize: '20px' }}>Doctors Available</span>
              </Col>
              <Col md={2}>
              </Col>

            </Row>
            <Row>
              <Table onRowSelection={this.handleRowSelection}  >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Speciality</TableHeaderColumn>
                    <TableHeaderColumn>ER</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow >
                    <TableRowColumn>Dr. Jibran</TableRowColumn>
                    <TableRowColumn>Surgeon</TableRowColumn>
                    <TableRowColumn>2</TableRowColumn>
                  </TableRow>
                  <TableRow >
                    <TableRowColumn>Dr. Ahmed</TableRowColumn>
                    <TableRowColumn>Physician</TableRowColumn>
                    <TableRowColumn>4</TableRowColumn>
                  </TableRow>
                  <TableRow >
                    <TableRowColumn>Dr. Hamid</TableRowColumn>
                    <TableRowColumn>Surgeon</TableRowColumn>
                    <TableRowColumn>1</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Row>
          </Grid>
        </Paper>
        <Paper style={shortSheets} zDepth={0} >
          <Grid fluid>
            <Row>
              <Col md={2}>

              </Col>
              <Col md={8} >
                <span style={{ padding: '5px', fontSize: '20px' }}>On going operations</span>
              </Col>
              <Col md={2}>
              </Col>

            </Row>
            <Row>
              <Table onRowSelection={this.handleRowSelection}  >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Patient</TableHeaderColumn>
                    <TableHeaderColumn>Doctor</TableHeaderColumn>
                    <TableHeaderColumn>Disease</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow >
                    <TableRowColumn>Faizan</TableRowColumn>
                    <TableRowColumn>Dr. Danish</TableRowColumn>
                    <TableRowColumn>Kidney stones</TableRowColumn>
                  </TableRow>
                  <TableRow >
                    <TableRowColumn>Hammad</TableRowColumn>
                    <TableRowColumn>Dr. Azam</TableRowColumn>
                    <TableRowColumn>Heart</TableRowColumn>
                  </TableRow>
                  <TableRow >
                    <TableRowColumn>Naseer</TableRowColumn>
                    <TableRowColumn>Dr. Waqas</TableRowColumn>
                    <TableRowColumn>Eye</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Row>
          </Grid>
        </Paper>
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <span className="paper-title">Patients Enroute to Hospital</span> <span>Real time data coming from Ambulance</span>

              </Col>
              <Col xs={6} />
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <IncomingPatient rows={this.state.shownRecords} assignDoctor={this.assignDoctor} />

          <div className="flex-container-pagination Pagination">
            <div className="pagination-child pagination-child-count">
              <span style={GlobalStyle.tablePageCount}>
                {startRecord(this.state, this.startingNextCount)} - {endRecord(this.state, this.startingNextCount)} of {totalRecords(this.state)}
              </span>
            </div>
            <div className="pagination-child">
              <div className="pagination-left-button"><LeftArrow style={GlobalStyle.paginationButtons} onClick={this.previousButton} /></div>
            </div>
            <div className="pagination-child">
              <div className="pagination-right-button"><RightArrow style={GlobalStyle.paginationButtons} onClick={this.nextButton} /></div>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
        </Paper>


        <Dialog
          title="Upcoming requests"
          actions={actionsButton}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div>

            <Grid>

              <Row>
                <br />
              </Row>
              <Row>
                Assign Manually
              </Row>
              <Row>
                <Col md={4}>
                  <SelectField
                    floatingLabelText="List of Doctors"
                    className="search-text-field"
                    value={this.state.doctValue}
                    onChange={this.handleChangeDoct}
                  >

                    {doctors.map(v => <MenuItem value={v} primaryText={v} key={v} />)}
                  </SelectField>
                </Col>
                <Col md={1}></Col>
                <Col md={4}>
                  <SelectField
                    style={{ width: '200px' }}
                    floatingLabelText="Emg Department"
                    className="search-text-field"
                    value={this.state.deptValue}
                    onChange={this.handleChangeDept}
                  >
                    <MenuItem value={1} primaryText="ER-1" />
                    <MenuItem value={2} primaryText="ER-2" />
                    <MenuItem value={3} primaryText="ER-3" />
                    <MenuItem value={4} primaryText="ER-4" />
                    <MenuItem value={5} primaryText="ER-5" />
                  </SelectField>
                </Col>
                <Col md={2}>
                  <FlatButton
                    label="Assign"
                    primary
                    onClick={this.assigndoc}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    bookings: state.IncomingPatientReducer.incomingPatient,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
