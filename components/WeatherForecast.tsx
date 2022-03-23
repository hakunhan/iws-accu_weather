import Image from "next/image";
import { DateTime } from "luxon";
import { ILocation } from "../interfaces/ILocation";
import { useEffect, useState } from "react";
import { IWeatherForecast } from "../interfaces/IWeatherForecast";
import { useDailyForecast, useWeatherForecast } from "../services/weather.service";
import { IForecastWeather } from "../interfaces/IForecastWeather";
import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IDailyForecast } from "../interfaces/IDailyForecast";
import { ForecastCard } from "./ForecastCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

type WeatherForecastProps = {
  location: ILocation,
  units: string,
  updateCurrentForecast: (forecast: IForecastWeather | undefined) => void
}

function filterDataForToday(data: IForecastWeather[]){
  return data.filter(item => DateTime.utc().hasSame(DateTime.fromSeconds(item.dt, {zone: "utc"}), 'day'))
}

function getTimeLabel(data: IForecastWeather[]){
  return data.map(item => DateTime.fromSeconds(item.dt, {zone: "utc"}).toLocaleString(DateTime.TIME_24_SIMPLE));
}

export function WeatherForecast(props: WeatherForecastProps){
  const [weatherForecasts, setWeatherForecasts] = useState<IWeatherForecast>();
  const [dailyForecasts, setDailyForecasts] = useState<IDailyForecast[]>();

  const {weatherForecast} = useWeatherForecast(props.location, props.units);
  const {dailyForecast} = useDailyForecast(props.location, props.units);

  let todayForecast;
  let chartData: ChartData = {
    labels: undefined,
    datasets: [{
      label: "",
      data: [0],
      borderColor: 'rgb(55, 124, 251)',
    }]
  };

  useEffect(() => {
    setWeatherForecasts(() => {
      if(weatherForecast){
        return weatherForecast;
      }
    });
  }, [weatherForecast]);

  useEffect(() => {
    setDailyForecasts(() => {
      if(dailyForecast){
        console.log(dailyForecast)
        return dailyForecast.daily;
      }
    });
  }, [dailyForecast]);

  useEffect(() => {
    const currentTime = DateTime.utc();
    let nearestForecast: IForecastWeather | undefined = undefined;

    weatherForecasts?.list.forEach((element: IForecastWeather) => {
      if(!nearestForecast){
        nearestForecast = element;
      }

      if(Math.abs(currentTime.diff(DateTime.fromSeconds(element.dt, {zone: "utc"})).toMillis()) 
      < Math.abs(currentTime.diff(DateTime.fromSeconds(nearestForecast.dt, {zone: "utc"})).toMillis())){
        nearestForecast = element;
      }
    });

    props.updateCurrentForecast(nearestForecast);
  }, [props, weatherForecasts])

  if(weatherForecasts){
    todayForecast = filterDataForToday(weatherForecasts.list);
    const labels = getTimeLabel(todayForecast);
    chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Weather',
          data: todayForecast.map(item => Math.round(item.main.temp * 10) / 10),
          borderColor: 'rgb(55, 124, 251)',
        }
      ]
    }
  }

  return (
    <>
      <div className="h-40 mx-2">
        <Line 
          options={{
            maintainAspectRatio: false,
          }}
          // @ts-ignore:
          data={chartData}
        />
      </div>
      <div className="flex justify-between mt-4 overflow-x-auto pb-2">
          {dailyForecasts?.map((item, index) => {
            return (
              <ForecastCard
                key={index} 
                dailyForecast={item}
              />
            )
          })}
      </div>
    </>
  )
}