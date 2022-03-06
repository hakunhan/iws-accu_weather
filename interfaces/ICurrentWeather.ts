export interface ICurrentWeather{
    timestamp?: number,
    weather: {
        id: number,
        main: string,
        description: string,
        icon: string
    },
    main: {
        temp: number,
        feelsLike: number,
        pressure: number,
        humidity: number,
        tempMin: number,
        tempMax: number,
    },
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    rain?: {
        oneHour: number,
        threeHour: number,
    },
    timezone?: number,
    name?: string
}