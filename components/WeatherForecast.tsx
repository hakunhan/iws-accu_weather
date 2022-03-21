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
  updateCurrentForecast: (forecast: IForecastWeather) => void
}

export function WeatherForecast(props: WeatherForecastProps){
  const [weatherForecasts, setWeatherForecasts] = useState<IWeatherForecast>();

  const {weatherForecast, isLoading} = useWeatherForecast(props.location, props.units);

  useEffect(() => {
    setWeatherForecasts(() => {
      if(weatherForecast){
        const currentTime = DateTime.now();
        let nearestForecast: IForecastWeather;

        weatherForecast.list.forEach((element: IForecastWeather) => {
          if(!nearestForecast){
            nearestForecast = element;
          }

          //TODO: get nearest forecast
        });

        return weatherForecast;
      }
    });
  }, [weatherForecast])

  if(isLoading){
    return (
      <div>
        <Image src={"/assets/animated-icon/Spinner-1s-40px.svg"} height={40} width={40} alt="loading" />
      </div>
    )
  }


}