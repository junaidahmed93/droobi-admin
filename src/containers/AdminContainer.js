import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

const adminMenus = [
  'Home',
  'Patient Activity',

];
class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false,
      activeItem: 'HOME',
    };
  }


 
  getSideBarLinks = () => {
    const { activeItem } = this.state;
    const styles = {
      activeText: {
        color: '#27BCBD',
        // fontWeight: "bold"
        fontSize: '12px',
      },
      nonActive: {
        color: '#7E7E7E',
        cursor: 'pointer',
        fontSize: '12px',
      },
    };
    return (
      <div>
        <MenuItem>
          <div
            className="sideOptions"
            onClick={()=>{this.handleClick('home')}}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{ width: '40px', height: '40px',}} viewBox="0 0 24 24">
                <path fill="#27BCBD" d="M11,13H13V16H16V11H18L12,6L6,11H8V16H11V13M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>HOME</span>
            </div>
          </div>
        </MenuItem>

        <MenuItem>
          <div
            className="sideOptions"
            onClick={()=>{this.handleClick('patient')}}
            style={
              activeItem === true ? styles.activeText : styles.nonActive
            }
          >
            <div>
              <svg style={{  width: '40px', height: '40px',}} viewBox="0 0 24 24">
                <path fill="#27BCBD" d="M18,18.5A1.5,1.5 0 0,0 19.5,17A1.5,1.5 0 0,0 18,15.5A1.5,1.5 0 0,0 16.5,17A1.5,1.5 0 0,0 18,18.5M19.5,9.5H17V12H21.46L19.5,9.5M6,18.5A1.5,1.5 0 0,0 7.5,17A1.5,1.5 0 0,0 6,15.5A1.5,1.5 0 0,0 4.5,17A1.5,1.5 0 0,0 6,18.5M20,8L23,12V17H21A3,3 0 0,1 18,20A3,3 0 0,1 15,17H9A3,3 0 0,1 6,20A3,3 0 0,1 3,17H1V6C1,4.89 1.89,4 3,4H17V8H20M8,6V9H5V11H8V14H10V11H13V9H10V6H8Z" />
              </svg>
            </div>
            <div style={{ marginTop: '-28px' }}>
              <span>Patient Activity</span>
            </div>
          </div>
        </MenuItem>
      </div>
    );
  };

  handleClick(e,a) {
    if(e === 'home'){
      browserHistory.push(`/home/admin/dashboard`);
    }    
    if(e==='patient') {
      browserHistory.push('/home/admin/patient');
    }
  }


  render() {
    return (
      <div>
        <Grid fluid className="gridMain" style={{ padding: 0, paddingLeft: 2 }}>
          <Row style={{
            height: 'inherit',
            // overflow: 'hidden'
          }}
          >
            <Col xs={3} sm={2} md={2} lg={1} style={{ padding: 0 }} className="sideMenus">
              <Paper className="sideMenusPaper" style={{ width: 'inherit', overflowY: 'scroll', height: '100%' }} open>
                {this.getSideBarLinks()}
              </Paper>
            </Col>
            <Col style={{ overflowY: 'scroll', padding: 3 }} xs={9} sm={10} md={10} lg={11} className="rightSideItems">
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AdminComponent;
