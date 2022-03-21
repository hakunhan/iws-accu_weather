import Image from "next/image";
import { DateTime } from "luxon";
import { ICurrentWeather } from "../interfaces/ICurrentWeather";
import { IForecastWeather } from "../interfaces/IForecastWeather";
import { useEffect, useState } from "react";
import { useCurrentWeather } from "../services/weather.service";
import { ILocation } from "../interfaces/ILocation";
import WeatherIcon from "./WeatherIcon";
import { registerLocale, getName } from "i18n-iso-countries";

type CurrentWeatherProps = {
  location: ILocation,
  units: string,
  toggleTemperatureUnit: () => void,
  forecastWeather?: IForecastWeather,
}

export function CurrentWeather(props: CurrentWeatherProps) {
  registerLocale(require("i18n-iso-countries/langs/en.json"))
  const [weather, setWeather] = useState<ICurrentWeather>({
    dt: 0,
    weather: [{
        id: 0,
        main: "",
        description: "",
        icon: ""
    }],
    main: {
        temp: 0,
        feelsLike: 0,
        pressure: 0,
        humidity: 0,
    },
    visibility: 0,
    wind: {
        speed: 0,
        deg: 0
    },
    clouds: {
        all: 0
    },
    rain: {
        oneHour: 0,
        threeHour: 0,
    },
    sys: {
        country: ""
    },
    timezone: 0,
    name: ""
  });
  const [currentDate, setCurrentDate] = useState<string>("");
  const {currentWeather, isLoading} = useCurrentWeather(props.location, props.units);

  useEffect(() => {
    setWeather(() =>{
      if(currentWeather && currentWeather.dt){
        setCurrentDate(DateTime.fromSeconds(currentWeather.dt, {zone: "utc"}).plus({second: currentWeather.timezone})
                              .toLocaleString(DateTime.DATETIME_MED));
      }
      return currentWeather;
  } );
  }, [currentWeather]);

  

  if(isLoading){
    return (
      <div>
        <Image src={"/assets/animated-icon/Spinner-1s-40px.svg"} height={40} width={40} alt="loading" />
      </div>
    )
  }
  
  return (
    <div className="flex flex-wrap items-center justify-between lg:mr-8">
      <div className="flex items-center order-2 lg:order-1">
        <div className="flex mr-4 items-center">
          <div className="weather-icon block w-28 h-28">
            <WeatherIcon iconId={weather?.weather[0].icon}/>
          </div>
          <h1 className="text-6xl">
            {weather?.main.temp.toFixed(0)}
            <label className="swap">
              <input type="checkbox" checked={props.units==='metric'} onChange={() => props.toggleTemperatureUnit()}/>
              <div className="swap-on">°C</div>
              <div className="swap-off">°F</div>
            </label>
          </h1>
        </div>
        <div>
          <div>Chance of rains: {100}%</div>
          <div>Humidity: {weather?.main.humidity}%</div>
          <div>Wind: {weather?.wind.speed} {props.units === "metric" ? "m/s" : "miles/h"}</div>
        </div>
      </div>
      <div className="text-right justify-end grow order-1 lg:order-2">
        <h1 className="font-bold text-2xl">{weather?.name} - {getName(weather?.sys.country, 'en', {select: "alias"})}</h1>
        <h2>{currentDate}</h2>
        <h2 className="capitalize">{weather?.weather[0].description}</h2>
      </div>
    </div>
  )
}