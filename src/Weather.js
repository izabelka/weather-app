import React, { Component } from 'react';
import $ from 'jquery';

class Weather extends Component {

  changeUnits() {
    if(this.props.unit === 'C'){
      this.props.isCelsius('F');
    } else {
      this.props.isCelsius('C')
    } 
  }

  render() {
    return (
      <div id="weather-container">
        <p id="city">
          {this.props.city}
        </p>
        <p id="temperature">
          <span onClick={this.changeUnits.bind(this)}>{this.props.temp}  {this.props.unit}</span>
        </p>
        <p id="weather">
          {this.props.weather}
        </p>
      </div>
    )
  }
}

export default Weather;
