import { useEffect, useState } from "react";
import Image from "next/image";
import { ICurrentWeather } from "../interfaces/ICurrentWeather";
import { ILocation } from "../interfaces/ILocation";
import { useCurrentWeather, useWeatherForecast } from "../services/weather.service";
import IForecastWeather from "../interfaces/IForecastWeather";
import { DateTime } from "luxon";
import { CurrentWeather } from "./CurrentWeather";

type ContentProps = {
  location: ILocation
}

export function Content(props: ContentProps) {
  const [currentForecastWeather, setCurrentForecastWeather] = useState<IForecastWeather>();

  return (
    <main className="mt-8">
      <div className="current-weather">
        <CurrentWeather 
          location={props.location}/>
      </div>
    </main>
  );
}