import useSWR from "swr";

const SEARCH_API = (keyword: string) => {
    return keyword ?
        `http://api.openweathermap.org/geo/1.0/direct?q=${keyword}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}` 
        : null;
}

export function useSearchLocation(keyword: string){
    const {data, error} = useSWR(SEARCH_API(keyword), {revalidateOnFocus: false});
    
    return {
        location: data,
        isLoading: !error && !data,
        isError: error
    }
}