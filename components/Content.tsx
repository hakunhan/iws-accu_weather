import { useEffect, useState } from "react";
import Image from "next/image";
import { ICurrentWeather } from "../interfaces/ICurrentWeather";
import { ILocation } from "../interfaces/ILocation";
import { useCurrentWeather } from "../services/weather.service";

type ContentProps = {
  location: ILocation
}

type CurrentWeatherProps = {
  currentWeather: ICurrentWeather,
  
  isLoading: boolean,
  toggleTempertureUnit: () => void,
}

export function CurrentWeather(props: CurrentWeatherProps) {
  if(props.isLoading){
    return (
      <div>
        <Image src={"/assets/animated-icon/Spinner-1s-40px.svg"} height={40} width={40} alt="loading" />
      </div>
    )
  }
  
  return (
    <div className="flex">
      <div className="weather-icon"></div>
      <div>
        <h1>{props.currentWeather.main.temp}</h1>
        <label className="swap">
          <input type="checkbox" onClick={() => props.toggleTempertureUnit}/>
          <div className="swap-on">°C</div>
          <div className="swap-off">°F</div>
        </label>
      </div>
      <div>
        <div>Chance of rains: {props.currentWeather.}</div>
      </div>
    </div>
  )
}

export function Content(props: ContentProps) {
  const [weather, setWeather] = useState<ICurrentWeather>();
  const [units, setUnits] = useState<string>('metric');
  const {currentWeather, isLoading} = useCurrentWeather(props.location);

  useEffect(() => {
    setWeather(currentWeather);
  }, [currentWeather]);

  const toggleTempertureUnit = () => {
    setUnits((prevUnits) => {
      return prevUnits === 'metric' ? 'imperial' : 'metric';
    })
  }

  return (
    <main className="mt-8">
      <div className="current-weather">
        
      </div>
    </main>
  );
}