
import React, { Component } from 'react';
import Physicians from './Physicians';
import Schedules from './SchedulesFC';
import styled from 'styled-components'

import axios from 'axios';

class Main extends Component {
  constructor(props) {
		super(props);

		this.state = {

      selected: "",
      schedules: [],
      first:"",
      last:""

    }

    this.topHandler=this.topHandler.bind(this)
  }


  topHandler(docId) {
    this.setState({selected: docId})
    axios.get('http://localhost:5000/physicians/' + docId)
    .then(res => {
      const schedules   = res.data.appointments;
      const first_name  = res.data.first_name;
      const last_name   = res.data.last_name;
      this.setState({
                      schedules: schedules,
                      first:    first_name,
                      last:     last_name
                    });
    })
  }

  render() {
    return (
      <MainDiv>
        <Physicians topHandler={this.topHandler} />
        <Schedules selected={this.state.selected} first={this.state.first} last={this.state.last} schedules={this.state.schedules} />
      </MainDiv>
    );
  }
}

export default Main;

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
`
