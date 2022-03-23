import { DateTime } from "luxon"
import { IDailyForecast } from "../interfaces/IDailyForecast"
import WeatherIcon from "./WeatherIcon"

type ForecastCardProps = {
  dailyForecast: IDailyForecast,
}

export function ForecastCard(props: ForecastCardProps){
  console.log(props)
  return (
    <>
      <div className="card w-40 bg-base-100 shadow-sm">
        <WeatherIcon iconId={props.dailyForecast.weather[0].icon}/>
        <div className="card-body p-2 items-center text-center">
          <h2 className="card-title">{DateTime.fromSeconds(props.dailyForecast.dt, {zone: 'utc'}).toFormat('EEE')}</h2>
          <p className="text-sm"><strong>{props.dailyForecast.temp.max}°</strong> - {props.dailyForecast.temp.min}°</p>
        </div>
      </div>
    </>
  )
}