import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { browserHistory } from 'react-router';
import GlobalStyle from '../../../utils/Styles';

export default class BookingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckboxes: false,
      selectable: false,
    };
  }

  handleCellClick(rowNumber, columnNumber, evt) {
    const id = evt.target.dataset.uid;
    browserHistory.push(`/home/hotel/bookings/${id}`);
  }

  render() {
    const rows = this.props.rows.map(data => (
      <TableRow style={GlobalStyle.tableRowSpacing} key={data.id} className="table-row-style">
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.referenceId}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.batchId}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.flightNumber}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.userName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.driPorterName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.status}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.numberOfBags}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.pickupLocationName}</TableRowColumn>
        <TableRowColumn data-uid={data.id} style={GlobalStyle.tableRowCell}>{data.departureLocationName}</TableRowColumn>
      </TableRow>

    ));
    return (
      <Table selectable onCellClick={this.handleCellClick}>
        <TableHeader style={GlobalStyle.tableHeaderSpacing} displaySelectAll={this.state.showCheckboxes} adjustForCheckbox={this.state.showCheckboxes}>
          <TableRow style={GlobalStyle.tableHeaderSpacing} className="table-header-style">
            <TableHeaderColumn style={GlobalStyle.tableHeaderSpacing}>Ref Id</TableHeaderColumn>
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
