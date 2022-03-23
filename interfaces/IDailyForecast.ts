export interface IDailyForecast{
  dt: number,
  temp: {
    min: number,
    max: number
  },
  weather: [{
    icon: string
  }]
}