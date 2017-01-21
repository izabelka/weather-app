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
      unit: 'C',
      weatherImg: ''
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
    setTimeout( function() {this.getWeather()}.bind(this), 2000);
    setTimeout( function() {this.getWeatherImage()}.bind(this), 3000);
  }

  getCoordinates() {
    return $.getJSON('https://freegeoip.net/json/')
      .then((data) => {
        this.setState({ 
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city
        });
      });
  }

  getWeather() {
    return $.getJSON('https://api.apixu.com/v1/current.json?key=b8ddb5efd2c84f44b86144237172101&q='
      + this.state.latitude + ',' + this.state.longitude)
      .then((data) => {
        this.setState({ 
          temp: Math.round(data.current.temp_c),
          weather: data.current.condition.text
        });
      });
  }

  getWeatherImage() {
    return $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ba3908d227b57ef7e5353363ed92c867&text='
      + this.state.weather + '+weather&tags=' + this.state.weather + '&format=json&nojsoncallback=1')
      .then((data) => {
        let randomIndex = Math.floor(Math.random() * data.photos.perpage)
        this.setState({ 
          weatherImg: 'https://farm' + data.photos.photo[randomIndex].farm + '.staticflickr.com/'
          + data.photos.photo[randomIndex].server  + '/' + data.photos.photo[randomIndex].id + '_' 
          + data.photos.photo[randomIndex].secret + '_b.jpg'
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
          isCelsius={this.changeUnits}
          backgroundImg={this.state.weatherImg}/>
        <div id="footer">
          <span>Local Weather App by</span> <a href="https://github.com/izabelka">Izabella Konstanciak</a><span>, 
          using </span><a href="https://www.apixu.com">Apixu</a> <span>API, </span><a href="https://www.flickr.com">Flickr</a>
          <span> and </span><a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>
        </div>
    </div>
    )
  }
}

export default App;