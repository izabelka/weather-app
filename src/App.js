import React, { Component } from 'react';
import $ from 'jquery'; 
import './App.css';
import Weather from './Weather'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      latitude: 0,
      longitude: 0,
      temperature: 0,
      weather: ''};
  }

  componentDidMount() {
    this.getCoordinates();
    this.getWeather();
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
      + this.state.latitude + '&lon=' 
      + this.state.longitude + '&APPID=' + apiKey)
      .then((data) => {
        this.setState({ 
          temperature: data.main.temp,
          weather: data.weather[0].main
        });
      });
  }

  render() {
    return(
        <Weather
          city={this.state.city}
          temp={this.state.temperature}
          weather={this.state.weather} />
      )
  }
}

export default App;