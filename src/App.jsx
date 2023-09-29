import { useState } from "react";
import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/currentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import ForeCast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [foreCast, setForeCast] = useState(null);

  function searchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (reponse) => {
        const weatherResponse = await reponse[0].json();
        const fortcastResponse = await reponse[1].json();

        // setCurrentWeather(weatherResponse);
        // setForeCast(fortcastResponse);
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForeCast({ city: searchData.label, ...fortcastResponse });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log("currentWeather", currentWeather);
  console.log("foreCast", foreCast);

  return (
    <div className="container">
      <Search onSearchChange={searchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {foreCast && <ForeCast data={foreCast} />}
    </div>
  );
}

export default App;
