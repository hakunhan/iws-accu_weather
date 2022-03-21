import { useEffect, useState } from "react";
import Image from "next/image";
import { ICurrentWeather } from "../interfaces/ICurrentWeather";
import { ILocation } from "../interfaces/ILocation";
import { useCurrentWeather, useWeatherForecast } from "../services/weather.service";
import { IForecastWeather } from "../interfaces/IForecastWeather";
import { DateTime } from "luxon";
import { CurrentWeather } from "./CurrentWeather";
import { WeatherForecast } from "./WeatherForecast";

type ContentProps = {
  location: ILocation
}

export function Content(props: ContentProps) {
  const [units, setUnits] = useState<string>('metric');
  const [currentForecastWeather, setCurrentForecastWeather] = useState<IForecastWeather>();

  const toggleTemperatureUnit = () => {
    setUnits((prevUnits) => {
      return prevUnits === 'metric' ? 'imperial' : 'metric';
    })
  }

  const updateCurrentForecast = (forecast: IForecastWeather | undefined) =>{
    setCurrentForecastWeather(forecast)
  }

  return (
    <main className="mt-8">
      <div className="current-weather m-auto items-center">
        <CurrentWeather 
          location={props.location}
          units={units}
          toggleTemperatureUnit={toggleTemperatureUnit}
          forecastWeather={currentForecastWeather}/>
        <WeatherForecast 
          location={props.location}
          units={units}
          updateCurrentForecast={updateCurrentForecast}/>
      </div>
    </main>
  );
}