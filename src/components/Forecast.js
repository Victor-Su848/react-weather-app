import React, { useState, useEffect } from "react";

function Forecast(props) {
  const [forecastData, setForecastData] = useState({});

  const apiKey = process.env.REACT_APP_API_KEY;

  

  function kelvinToFarenheit(k) {
    return ((k - 273.15) * (9 / 5) + 32).toFixed(2);
  }

  function kelvinToCelsius(k) {
    return (k - 273.15).toFixed(2);
  }

  useEffect(() => {
    (fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.cityName}&appid=${apiKey}&cnt=5`
      )
        .then((res) => res.json())
        .then((data) => setForecastData(data))).catch(e => {
            console.log(e);
        });
    console.log(forecastData);
  }, [props.cityName]);

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
    <div className="forecast">{forecastData.list ? <div>
        <p>yes</p>
        
        {forecastData.list.map((e, i) => {
          return (
          <div key={e.dt} className="forecast-widget">
            <p>{e.main.temp}</p>
            <p>{e.weather[0].main}</p>
            <img src={displayWeatherIcon(e.weather[0].description)} alt="weather icon not available"></img>
          </div>
          );
        })}

    </div> : <p>Loading</p>}</div>
  );
}

export default Forecast;
