import useSWR from "swr";
import { ILocation } from "../interfaces/ILocation";

const SEARCH_API = (keyword: string) => {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${keyword}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`
}

export async function SearchLocation(keyword: string){
    const {data, error} = useSWR(SEARCH_API(keyword));
    
    return {
        location : data,
        isLoading: !error && !data,
        isError: error
    }
}