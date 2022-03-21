import { ILocation } from './../interfaces/ILocation';
import useSWR from "swr";

const CURRENT_WEATHER_API = (location: ILocation, units: string) => {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=${units}`;
}

const WEATHER_FORECAST_API = (location: ILocation, units: string) => {
    return `http://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=${units}`;
}

export function useCurrentWeather(location: ILocation, units: string){
    const {data, error} = useSWR(CURRENT_WEATHER_API(location, units));
    
    return {
        currentWeather: data,
        isLoading: !error && !data,
        isError: error
    };
}

export function useWeatherForecast(location: ILocation, units: string){
    const {data, error} = useSWR(WEATHER_FORECAST_API(location, units));

    return {
        weatherForecast: data,
        isLoading: !error && !data,
        isError: error
    }
}