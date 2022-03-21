import { IForecastWeather } from "./IForecastWeather";
export interface IWeatherForecast {
    list: IForecastWeather[],
    city: {
        name: string,
        country: string,
        timezone: number
    }
}