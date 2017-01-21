import React, { Component } from 'react';
// var weatherDescription = require('./json/weatherDescription.json');

class Weather extends Component {

  changeUnits() {
    if(this.props.unit === 'C'){
      this.props.isCelsius('F');
    } else {
      this.props.isCelsius('C')
    } 
  }
  render() {
    if (this.props.backgroundImg !== '') {
      // var icon = weatherDescription[this.props.weather.toLowerCase()]['icon'];
      var weatherBackground = {
        backgroundImage: `url(${this.props.backgroundImg})`
      };
    }
    return (
      <div id="weather-bg" style={weatherBackground}>
        <div id="weather-container">
          <p id="city">
            {this.props.city}
          </p>
          <p id="temperature">
            <span onClick={this.changeUnits.bind(this)}>{this.props.temp} &deg;{this.props.unit}</span>
          </p>
          
          <p id="weather">
            {this.props.weather}
          </p>
        </div>
      </div>
    )
  }
}

export default Weather;
