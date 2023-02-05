import React, { useState, useEffect } from "react";
import CurrentInfo from "./components/CurrentInfo";
import Forecast from "./components/Forecast";

function App() {
  const [apiData, setApiData] = useState({});
  const [geocodeData, setGeocodeData] = useState({});
  const [getState, setGetState] = useState("College Park");
  const [location, setLocation] = useState("College Park");
  const [fahrenheit, setFahrenheit] = useState(true);

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  // handle input change
  function inputHandler(event) {
    setGetState(event.target.value);
  }

  // handle submit button click
  function submitHandler(event) {
    event.preventDefault();
    setLocation(getState);
  }

  // useEffect runs when apiUrl changes
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${getState}&APPID=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setApiData(data));

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${getState}&limit=5&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setGeocodeData(data));

    console.log(geocodeData);
  }, [apiUrl]);

  function handleCheckBox(event) {
    console.log("CHECKBOX");
    if (event.target.checked) {
      console.log("checked");
      setFahrenheit(false);
    } else {
      console.log("not checked");
      setFahrenheit(true);
    }
  }

  return (
    <div className="App">
      <header className="">
        <div className="inner-header">
          <h1>React Weather App</h1>
          <div className="inner-header-right">
            <div className="toggle-button-cover">
              <div className="button-cover">
                <div className="button r" id="button-1">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="checkbox"
                    onClick={handleCheckBox}
                  />
                  <div className="knobs"></div>
                  <div className="layer"></div>
                </div>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                id="location-name"
                onChange={inputHandler}
                value={getState}
                placeholder="Search City"
              />
              <button type="button" onClick={submitHandler}>
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      {console.log(apiData)}

      {apiData.main && apiData.weather && geocodeData[0] ? (
        <main>
          <CurrentInfo
            cityInfo={apiData.main}
            cityName={apiData.name}
            weather={apiData.weather}
            fah={fahrenheit}
          ></CurrentInfo>
          <Forecast cityName={apiData.name}></Forecast>
        </main>
      ) : (
        <main>
          <p className="loading">Loading</p>
        </main>
      )}
    </div>
  );
}

export default App;
