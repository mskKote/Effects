import type { NextPage } from 'next'
import EffectsSettings from '../src/components/effectsSettigns/EffectsSettings'
import HeadSEO from '../src/utils/HeadSEO'
import Layers from '../src/components/layers/layers'
import LayersSettings from '../src/components/layersSettings/layersSettings'
import IContentPage from '../src/interfaces/iContentPage'
// import Image from 'next/image'
import styles from '../styles/Home.module.scss'


const mockData: IContentPage = {}


const Editor: NextPage = () => {
  return (<>
    <HeadSEO
      title="Effects"
      description="Manga&comics with effects"
      keywords={["Comics", "manga", "effects", "parallax", "2.5d"]}
      author="🔮 Effects team"
      iconImg="/icon.svg"
      socialNetworkImg="/icon.svg" />

    {/* Настроки эффектов */}
    <EffectsSettings />

    {/* Сами слои */}
    <Layers layers={mockData} />

    {/* Настройки слоёв */}
    <LayersSettings />

    {/* Призыв пройти опрос */}
    <footer>
      Нам критически важен ваш фидбэк,
      <a
        href="google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        пройдите форму с опросом
      </a>
    </footer>
  </>)
}

export default Editor
