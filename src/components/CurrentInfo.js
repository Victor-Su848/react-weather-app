import React, { useState, useEffect } from "react";

function CurrentInfo(props) {
  
  function kelvinToFarenheit(k) {
    return ( (k - 273.15) * (9/5) + 32 ).toFixed(2);
  };

  function kelvinToCelsius(k) {
    return (k - 273.15).toFixed(2);
  }

  // display weather icon
  function displayWeatherIcon(weather) {
    let iconURL = "";
    console.log("displayWeathericon called. Weather is " + weather);
    switch (weather) {
      case "clear sky":
        iconURL = "http://openweathermap.org/img/wn/01d@2x.png";
        break;
      case "few clouds":
        iconURL = "http://openweathermap.org/img/wn/02d@2x.png";
        break;
      case "scattered clouds":
        iconURL = "http://openweathermap.org/img/wn/03d@2x.png";
        break;
      case "broken clouds":
        iconURL = "http://openweathermap.org/img/wn/04d@2x.png";
        break;
      case "shower rain":
        iconURL = "http://openweathermap.org/img/wn/09d@2x.png";
        break;
      case "rain":
        iconURL = "http://openweathermap.org/img/wn/19d@2x.png";
        break;
      case "thunderstorm":
        iconURL = "http://openweathermap.org/img/wn/11d@2x.png";
        break;
      case "snow":
        iconURL = "http://openweathermap.org/img/wn/13d@2x.png";
        break;
      case "mist":
        iconURL = "http://openweathermap.org/img/wn/50d@2x.png";
        break;
      default:
        console.log("error");
        break;
    }
    return iconURL;
  }

  return (
    <div className="daily-info">
      <div className="main-info-left">
        {console.log("Render of CurrentInfo. Below is the object")}
        {console.log(props.cityInfo)}
        <h2>{props.cityName}</h2>
        <p>Temperature: {props.fah ? (kelvinToFarenheit(props.cityInfo.temp)) : (kelvinToCelsius(props.cityInfo.temp))}</p>
        <p>Feels like: {props.fah ? (kelvinToFarenheit(props.cityInfo.feels_like)) : (kelvinToCelsius(props.cityInfo.feels_like))}</p>
      </div>
      <div className="main-info-right">
        <div className="weather-icon">
          <p>{props.weather[0].main}</p>
          <img src={displayWeatherIcon(props.weather[0].description)} alt="weather icon not available"></img>
        </div>

        <p>Max: {props.fah ? (kelvinToFarenheit(props.cityInfo.temp_max)) : (kelvinToCelsius(props.cityInfo.temp_max))}</p>
        <p>Min: {props.fah ? (kelvinToFarenheit(props.cityInfo.temp_min)) : (kelvinToCelsius(props.cityInfo.temp_min))}</p>
      </div>
    </div>
  );
}

export default CurrentInfo;
