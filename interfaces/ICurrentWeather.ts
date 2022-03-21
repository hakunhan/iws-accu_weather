export interface ICurrentWeather{
    dt: number,
    weather: [{
        id: number,
        main: string,
        description: string,
        icon: string
    }],
    main: {
        temp: number,
        feelsLike: number,
        pressure: number,
        humidity: number,
    },
    visibility: number,
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
    sys: {
        country: string
    },
    timezone?: number,
    name?: string
}