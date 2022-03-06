import useSWR from "swr";

const CURRENT_WEATHER_API = (lat: number, lon: number) => {
    return `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
}

const WEATHER_FORECAST_API = (lat: number, lon: number) => {
    return `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;
}

export async function GetCurrentWeather(lat: number, lon: number){
    const {data, error} = useSWR(CURRENT_WEATHER_API(lat, lon));
    
    return {
        currentWeather: data,
        isLoading: !error && !data,
        isError: error
    };
}

export async function GetWeatherForecast(lat: number, lon: number){
    const {data, error} = useSWR(WEATHER_FORECAST_API(lat, lon));

    return {
        weatherForecast: data,
        isLoading: !error && !data,
        isError: error
    }
}