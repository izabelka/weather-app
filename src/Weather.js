import React, { Component } from 'react';
var weatherDescription = require('./json/weatherDescription.json');

class Weather extends Component {

  changeUnits() {
    if(this.props.unit === 'C'){
      this.props.isCelsius('F');
    } else {
      this.props.isCelsius('C')
    } 
  }

  render() {
    if (this.props.weather !== '') {
      var icon = weatherDescription[this.props.weather.toLowerCase()]['icon'];
    }
    return (
      <div id="weather-container">
        <p id="city">
          {this.props.city}
        </p>
        <p id="temperature">
          <span onClick={this.changeUnits.bind(this)}>{this.props.temp} &deg;{this.props.unit}</span>
        </p>
        <i className={icon}></i>
        <p id="weather">
          {this.props.weather}
        </p>
      </div>
    )
  }
}

export default Weather;
