import React, { Component } from 'react';

class Weather extends Component {

  render() {
    return (
      <div id="weather-container">
        <p id="city">
          {this.props.city}
        </p>
        <p id="temperature">
          {this.props.temp}
        </p>
        <p id="weather">
          {this.props.weather}
        </p>
      </div>
    )
  }
}

export default Weather;
