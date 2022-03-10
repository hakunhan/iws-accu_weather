import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IWS Weather</title>
        <meta name="description" content="Basic weather website for checking weather using OpenWeatherAPI" />
        <link rel="icon" href="/assets/cloudy-day-3.svg" />
      </Head>
      <div className='body max-w-screen-xl mx-auto'>
        <Navbar />
      </div>
    </>
  )
}

export default Home
