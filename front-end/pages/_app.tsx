import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika';
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      {/* Yandex.Metrika counter */}
      <YMInitializer version="2" accounts={[88113924]} options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true
      }} />
      {/* /Yandex.Metrika counter */}
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
