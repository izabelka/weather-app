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
      weather: '',
      unit: 'C'
    };
    this.changeUnits = this.changeUnits.bind(this);
  }

  changeUnits (newUnit) {
    if (newUnit === 'F'){
      this.setState({
        unit: newUnit,
        temp: this.toCelsius(this.state.temp)
      })
    } else {
      this.setState({
        unit: newUnit,
        temp: this.toFahrenheit(this.state.temp)
      })
    }
  }

  toCelsius(temp) {
    return Math.round((temp * 9 / 5 + 32) * 100) / 100
  }

  toFahrenheit(temp) {
    return Math.round(((temp - 32) * 5 / 9) * 100) / 100
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
    return(
        <Weather
          city={this.state.city}
          weather={this.state.weather}
          temp={this.state.temp}
          unit={this.state.unit}
          isCelsius={this.changeUnits}/>
      )
  }
}

export default App;