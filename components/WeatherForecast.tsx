import Image from "next/image";
import { DateTime } from "luxon";
import { ILocation } from "../interfaces/ILocation";
import { useEffect, useState } from "react";
import { IWeatherForecast } from "../interfaces/IWeatherForecast";
import { useWeatherForecast } from "../services/weather.service";
import { IForecastWeather } from "../interfaces/IForecastWeather";

type WeatherForecastProps = {
  location: ILocation,
  units: string,
  updateCurrentForecast: (forecast: IForecastWeather | undefined) => void
}

export function WeatherForecast(props: WeatherForecastProps){
  const [weatherForecasts, setWeatherForecasts] = useState<IWeatherForecast>();

  const {weatherForecast, isLoading} = useWeatherForecast(props.location, props.units);

  useEffect(() => {
    setWeatherForecasts(() => {
      if(weatherForecast){
        

        return weatherForecast;
      }
    });
  }, [props, weatherForecast]);

  useEffect(() => {
    const currentTime = DateTime.utc();
    let nearestForecast: IForecastWeather | undefined = undefined;

    weatherForecasts?.list.forEach((element: IForecastWeather) => {
      if(!nearestForecast){
        nearestForecast = element;
      }

      if(Math.abs(currentTime.diff(DateTime.fromSeconds(element.dt, {zone: "utc"})).toMillis()) 
      < Math.abs(currentTime.diff(DateTime.fromSeconds(element.dt, {zone: "utc"})).toMillis())){
        nearestForecast = element;
      }
    });

    props.updateCurrentForecast(nearestForecast);
  }, [props, weatherForecasts])

  return (
    <>
    </>
  )
}