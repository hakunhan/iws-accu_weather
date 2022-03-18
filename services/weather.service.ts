import { ILocation } from './../interfaces/ILocation';
import useSWR from "swr";

const CURRENT_WEATHER_API = (location: ILocation) => {
    return `api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
}

const WEATHER_FORECAST_API = (location: ILocation) => {
    return `api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.long}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
}

export function useCurrentWeather(location: ILocation){
    const {data, error} = useSWR(CURRENT_WEATHER_API(location));
    
    return {
        currentWeather: data,
        isLoading: !error && !data,
        isError: error
    };
}

export function useWeatherForecast(location: ILocation){
    const {data, error} = useSWR(WEATHER_FORECAST_API(location));

    return {
        weatherForecast: data,
        isLoading: !error && !data,
        isError: error
    }
}