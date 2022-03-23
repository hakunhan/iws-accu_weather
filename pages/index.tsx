import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Content } from '../components/Content';
import Navbar from '../components/Navbar';
import { ILocation } from '../interfaces/ILocation';

const Home: NextPage = () => {
  const [location, setLocation] = useState({
    name: "Hanoi",
    lat: 21.0294498,
    lon: 105.8544441
  });

  const updateLocation = (searchLocation: ILocation) => {
    console.log(searchLocation)
    setLocation(searchLocation);
  }

  useEffect(() => {
    const success = (pos: GeolocationPosition) => {
      const currentLocation: ILocation = {
        name: "",
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
  
      updateLocation(currentLocation);
    };

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success);
    }
  }, [])

  return (
    <>
      <Head>
        <title>IWS Weather</title>
        <meta name="description" content="Basic weather website for checking weather using OpenWeatherAPI" />
        <link rel="icon" href="/assets/cloudy-day-3.svg" />
      </Head>
      <div className='body max-w-screen-xl mx-auto'>
        <Navbar choosenResult={updateLocation}/>
        <Content location={location}/>
      </div>

    </>
  )
}

export default Home
