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
      longitude: '',
      temp: '',
      weather: ''};
  }

  componentDidMount() {
    this.getCoordinates();
    setTimeout( function() {this.getWeather()}.bind(this), 3000);
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

  getWeather() {
    const apiKey = 'daed4a90d4dc00a02f5d25d3d22cf3a0';
    return $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='
      + this.state.latitude + '&lon=' + this.state.longitude +
      '&units=metric&APPID='+ apiKey)
      .then((data) => {
        this.setState({ 
          temp: data.main.temp,
          weather: data.weather[0].main
        });
      });
  }

  render() {
    console.log(this.state.latitude)
    return(
        <Weather
          city={this.state.city}
          weather={this.state.weather}
          temp={this.state.temp}/>
      )
  }
}

export default App;