import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Schedules = () => {
  function  renderRows() {
    return  this.props.schedules
        .map((schedule, index) => <tr>
                    <td>{schedule.id}</td>
                    <td>{schedule.patient_name}</td>
                    <td>{schedule.time}</td>
                    <td>{schedule.type}
                    </td>
        </tr>)
  }

  if (this.props.selected && this.props.selected !== "") {
    return (
      <div>
        <div>
          <h2>Dr. {this.props.first} {this.props.last}</h2>
          <h3>{this.props.last}@notablehealth.com</h3>
        </div>
        <div>
          <table>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Kind</th>
            </tr>
          {this.renderRows()}
          </table>
         </div>
      </div>
    );
  } else {
    return (
      <div>
        Nothing
      </div>
    )
  }
}

export default Schedules;

Schedules.propTypes = {
  first: PropTypes.string,
  last: PropTypes.string,
  selected: PropTypes.string,
  schedules: PropTypes.object
}

const DataTable = styled.table`
  width: 300px;
  height: 300px;
`;
