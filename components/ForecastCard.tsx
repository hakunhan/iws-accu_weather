import { DateTime } from "luxon"
import { IDailyForecast } from "../interfaces/IDailyForecast"
import WeatherIcon from "./WeatherIcon"

type ForecastCardProps = {
  dailyForecast: IDailyForecast,
}

export function ForecastCard(props: ForecastCardProps){
  return (
    <>
      <div className="card min-w-max bg-base-100 shadow-md mx-2">
        <WeatherIcon iconId={props.dailyForecast.weather[0].icon}/>
        <div className="card-body p-2 items-center text-center">
          <h2 className="card-title">{DateTime.fromSeconds(props.dailyForecast.dt, {zone: 'utc'}).toFormat('EEE')}</h2>
          <p className="text-sm"><strong>{Math.round(props.dailyForecast.temp.max * 10) / 10}°</strong> - {Math.round(props.dailyForecast.temp.min * 10) /10}°</p>
          <p className="text-sm">Rain: {props.dailyForecast.pop * 100}%</p>
        </div>
      </div>
    </>
  )
}