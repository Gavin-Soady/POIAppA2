'use strict';
const axios = require("axios");

const currentWeather = {

  getCurrentWeather: async function(lat,lon) {
    const apiKey = "cfd9ec36c5c610c679ec46cf057edfa7";
    const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log(`Weather API Key = ${apiKey}`);
    console.log(`Weather request = ${weatherRequest}`);
    let weather = {};
    const response = await axios.get(weatherRequest)
    console.log(weatherRequest);
    if (response.status == 200) {
      weather = response.data
    }
    console.log(weather)
    const report = {
      feelsLike : Math.round(weather.main.feels_like -273.15),
      clouds : weather.weather[0].description,
    }
    return report;
  },
  addPoiWeather: async function(pois) {
    for( let poi in pois){
      let currentWeather = await this.getCurrentWeather(pois[poi].lat, pois[poi].long);
      console.log(currentWeather["feelsLike"]);
      pois[poi].feelsLike = currentWeather["feelsLike"];
      if (currentWeather["clouds"] == "broken clouds"){
        pois[poi].clouds = "fa-cloud";
      }
      else if(currentWeather["clouds"] == "shower rain"){
        pois[poi].clouds = "fa-cloud-showers-heavy";
      }
      else if(currentWeather["clouds"] == "fa-sun"){
        pois[poi].clouds = "fa-sun";
      }
      else{
        pois[poi].clouds = "fa-umbrella";
      }
      console.log(pois[poi].clouds);

    };

    return pois;
  },


};

module.exports = currentWeather;