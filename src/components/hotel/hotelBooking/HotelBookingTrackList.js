import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import GlobalStyle from '../../../utils/Styles';

export default class HotelBookingTrackList extends React.Component {
  constructor(props) {
    super(props);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.state = {
      showCheckboxes: false,
      selectable: false,
    };
  }

  handleCellClick(rowNumber, columnNumber, evt) {
    const id = evt.target.dataset.uid;
    let selectedBooking;
    this.props.rows.forEach((arrayItem) => {
      // eslint-disable-next-line
      if (id == arrayItem.id) {
        selectedBooking = arrayItem;
      }
    });
    this.props.selectedBooking(selectedBooking);
  }

  render() {
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.batchId}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.flightNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.userName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.driPorterName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.status}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.numberOfBags}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.pickupLocationName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowSpacing}>{data.departureLocationName}</TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Batch Id</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Flight No </TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Customer</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Driporter</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Status</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Luggage</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Pickup Location</TableHeaderColumn>
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Drop off</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
          {rows}
        </TableBody>
      </Table>
    );
  }
}
