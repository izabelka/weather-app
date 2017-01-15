import React, { Component } from 'react';
import $ from 'jquery';

class Weather extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      temp: '',
      weather: ''};
  }

  componentDidMount() {
    console.log(this.props.latitude)
    this.getWeather();
  }


  getWeather() {
    const apiKey = 'daed4a90d4dc00a02f5d25d3d22cf3a0';
    return $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='
      + this.props.latitude + '&lon=' + this.props.longitude +
      '&units=metric&APPID='+ apiKey)
      .then((data) => {
        this.setState({ 
          temp: data.main.temp,
          weather: data.weather[0].main
        });
      });
  }

  render() {
    return (
      <div id="weather-container">
        <p id="city">
          {this.props.city}
        </p>
        <p id="temperature">
          {this.state.temp}
        </p>
        <p id="weather">
          {this.state.weather}
        </p>
      </div>
    )
  }
}

export default Weather;
