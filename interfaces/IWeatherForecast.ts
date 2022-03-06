import { ICurrentWeather } from "./ICurrentWeather";
export interface IWeatherForecast {
    list: ICurrentWeather[],
    city: {
        name: string,
        country: string,
        timezone: number
    }
}