import React, { Component } from 'react';
import $ from 'jquery';
import './css/reset.css';
import './css/App.css';
import './css/weather-icons.min.css';
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
    return Math.round((temp * 9 / 5 + 32))
  }

  toFahrenheit(temp) {
    return Math.round(((temp - 32) * 5 / 9))
  }

  componentDidMount() {
    this.getCoordinates();
    setTimeout( function() {this.getWeather()}.bind(this), 2500);
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
      '&units=metric&APPID='+ apiKey )
      .then((data) => {
        this.setState({ 
          temp: Math.round(data.main.temp),
          weather: data.weather[0].main
        });
      });
  }

  render() {
    return(
      <div>
        <Weather
          city={this.state.city}
          weather={this.state.weather}
          temp={this.state.temp}
          unit={this.state.unit}
          isCelsius={this.changeUnits}/>
        <div id="footer">
          <span>Local Weather App by</span> <a href="https://github.com/izabelka">Izabella Konstanciak</a><span>, 
          using </span><a href="http://openweathermap.org">OpenWeatherMap</a> <span>API 
          and </span><a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>
        </div>
    </div>
    )
  }
}

export default App;