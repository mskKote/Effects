import Head from 'next/head'
import { YMInitializer } from 'react-yandex-metrika';

type Props = {
  title: string,
  description: string,
  keywords: Array<string>,
  author: string,
  iconImg: string,
  socialNetworkImg: string
}

const EffectsHead = ({
  title = "Effects",
  description = "Manga&comics with effects",
  keywords = ["Comics", "manga", "effects", "parallax", "2.5d"],
  author = "🔮 Effects team",
  iconImg,
  socialNetworkImg }: Props) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href={iconImg} />
    {/* Common */}
    <meta charSet="UTF-8" />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords.join(", ")} />
    <meta name="viewport" content="width=device-width" />
    <meta name="Author" content={author} />
    {/* Social networks */}
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content="effects" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={socialNetworkImg} />
    <meta property="og:url" content="https://effects.vercel.app/" />
    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="effects" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={socialNetworkImg} />

    {/* Yandex.Metrika counter */}
    {/* <YMInitializer version="2" accounts={[88113924]} options={{
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true
    }} /> */}
    {/* /Yandex.Metrika counter */}

  </Head>)

export default EffectsHead
