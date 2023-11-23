import React, { useState } from "react";
import "./WeatherApp.css";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import search from "../Assets/search.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";

const WeatherApp = () => {
  let api_key = "f0e08c6be53ca4ea9e51362e78cccec5";

  //   wicon is for the weather icon
  const [wicon, setWicon] = useState("cloud");

  // Search location for various weather conditions
  const searchWeather = async () => {
    const element = document.querySelector(".city");
    if (!element || element.value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        // Handle invalid location or other errors
        console.error("Error fetching weather data:", response.status);
        // Display an error message to the user or handle it in another way
        return;
      }

      let data = await response.json();

      const temperature = document.querySelector(".weather_temperature");
      const humidityElement = document.querySelector(".humidity_percentage");
      const windElement = document.querySelector(".wind_rate");
      const locationElement = document.querySelector(".weather_location");

      temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
      humidityElement.innerHTML = `${Math.round(data.main.humidity)}%`;
      windElement.innerHTML = `${Math.round(data.wind.speed)}km/h`;
      locationElement.innerHTML = data.name;

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWicon(clear);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWicon(cloud);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWicon(drizzle);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWicon(drizzle);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWicon(rain);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWicon(rain);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWicon(snow);
      } else {
        setWicon(clear);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Handle other errors (e.g., network issues)
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="city" placeholder="Search" />
        <div
          className="search_icon"
          onClick={() => {
            searchWeather();
          }}
        >
          <img src={search} alt="" />
        </div>
      </div>
      <div className="weather_image">
        <img src={wicon} alt="" className="cloud" />
      </div>
      <div className="weather_temperature">2°C</div>
      <div className="weather_location">London</div>
      <div className="data_container">
        <div className="element">
          <img src={humidity} alt="" className="icon" />
          <div className="data">
            <div className="humidity_percentage">48%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" className="icon" />
          <div className="data">
            <div className="wind_rate">18km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
