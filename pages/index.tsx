import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IWS Weather</title>
        <meta name="description" content="Basic weather website for checking weather using OpenWeatherAPI" />
        <link rel="icon" href="/assets/cloudy-day-3.svg" />
      </Head>
    </>
  )
}

export default Home
