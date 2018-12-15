import React, { Component } from 'react';
import axios from 'axios';

class Physicians extends Component {
  constructor(props) {
		super(props);

    this.state = {
      doctors: []
    }
    this.renderDoctors = this.renderDoctors.bind(this);

  }



  handleClick = (e, data) => {
    this.props.topHandler(parseInt(e.target.getAttribute('data-docid')));

}

  componentDidMount() {
    axios.get('http://localhost:5000/physicians')
    .then(res => {
      const doctors = res.data;
      this.setState({doctors: doctors});
    })
}

  renderDoctors() {
    return this.state.doctors
      .map((doctor, index) => <li onClick={this.handleClick} data-docid={doctor.id} key={index}>{doctor.last_name}, {doctor.first_name}</li>);
  }

  render() {
    return (
      <div>
        <h2 >
          Notable
        </h2>
        <h3>Physicians</h3>
        <ul>
         {this.renderDoctors()}
        </ul>
      </div>
    );
  }
}

export default Physicians;
