import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { YMInitializer } from 'react-yandex-metrika';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    {/* <!-- Yandex.Metrika counter -->*/}
    <YMInitializer version="2" accounts={[88113924]} options={{
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true
    }} />
    {/* <!-- /Yandex.Metrika counter --> */}
    <Component {...pageProps} />
  </>
}

export default MyApp
