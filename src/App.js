import React, { Component } from 'react';
import $ from 'jquery'; 
import './App.css';
import Weather from './Weather'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      latitude: '',
      longitude: ''};
  }

  componentDidMount() {
    this.getCoordinates();
  }

  getCoordinates() {
    return $.getJSON('http://freegeoip.net/json/')
      .then((data) => {
        this.setState({ 
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city
        });
      });
  }

  render() {
    console.log(this.state.latitude)
    return(
        <Weather
          city={this.state.city}
          latitude={this.state.latitude}
          longitude={this.state.longitude}/>
      )
  }
}

export default App;