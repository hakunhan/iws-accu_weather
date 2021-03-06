import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { ILocation } from "../interfaces/ILocation";
import { useDebounce } from "use-debounce";
import { useSearchLocation } from '../services/location.service';

type SearchItemProps = {
  results?: ILocation[],
  isLoading?: boolean,
  choosenResult: (result: ILocation) => void,
  clearInput: () => void
}

type NavbarProps = {
  choosenResult: (result: ILocation) => void;
}

const SearchItem = (props: SearchItemProps) => {
  if(props.isLoading) {
    return (
      <>
        <div className="relative">
          <ul className="dropdown-content fixed z-10 menu p-2 shadow bg-base-100 rounded-box w-60">
            <li><Image src={"/assets/animated-icon/Spinner-1s-40px.svg"} height={40} width={40} alt="loading" /></li>
          </ul>
        </div>
      </>
    )
  }

  if (props.results?.length) {
    return (
      <div className="relative">
        <ul className="dropdown-content fixed z-10 menu p-2 shadow bg-base-100 rounded-box w-60 opacity-75">
          {props.results?.length ? props.results.map((item, index) => 
            <li key={index}><a onClick={() => {
              props.choosenResult(item);
              props.clearInput();
            }}>{item.name} - {item.country}</a></li>
          ): ""}
        </ul>
      </div>
    )
  }
  
  return (
    <></>
  )
}

export default function Navbar(props: NavbarProps) {
  const [inputText, setInputText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ILocation[] | undefined>();
  const [searchKey] = useDebounce(inputText, 500);
  
  const {location, isLoading} = useSearchLocation(searchKey);
  const loadingSearch = (isLoading && searchKey.length !== 0)

  useEffect(() => {
    setSearchResult(location);
  }, [location]);

  const clearInput = () => {
    if(inputText){
      setInputText('');
    }
  }

  return (
    <>
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl cursor-default hidden lg:block">
            <Image src={"/assets/cloudy-day-3.svg"} alt="weather-icon" width={40} height={40}/>
            IWS Weather App
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              name="search" 
              type="search" 
              autoComplete="off" 
              placeholder="Search..."
              value={inputText} 
              onChange={(e) => {setInputText(e.target.value)}}
              className="input input-primary input-bordered" />
            <SearchItem 
              results={searchResult}
              isLoading={loadingSearch}
              choosenResult={props.choosenResult}
              clearInput={clearInput}/>
          </div>
          <span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]" data-tip="GitHub">
            <div className="flex-none items-center">
              <a aria-label="Github" target="_blank" href="https://github.com/hakunhan/iws-accu_weather" rel="noreferrer" className="btn btn-ghost drawer-button btn-square normal-case">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block h-5 w-5 fill-current md:h-6 md:w-6">
                  <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
                </svg>
              </a>
            </div>
          </span>
        </div>
      </nav>
    </>
  )
}