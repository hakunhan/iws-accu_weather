import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {SWRConfig} from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        fetcher: fetcher
      }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
