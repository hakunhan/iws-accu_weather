export interface IForecastWeather{
  dt: number,
  main: {
    temp: number,
    feelsLike: number,
    pressure: number,
    humidity: number,
  },
  weather: {
    id: number,
    main: string,
    description: string,
    icon: string
  },
  clouds: {
    all: number
  },
  wind: {
    speed: number,
    deg: number
  },
  visibility: number,
  pop: number,
  date?: string
}