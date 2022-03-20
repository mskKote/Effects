import type { NextPage } from 'next'
import EffectsSettings from '../src/components/effectsSettigns/EffectsSettings'
import HeadSEO from '../src/utils/HeadSEO'
import Layers from '../src/components/layers/layers'
import LayersSettings from '../src/components/layersSettings/layersSettings'
import IContentPage from '../src/interfaces/IContentPage'
import EditorHeader from '../src/components/header/editorHeader'
import styles from '../styles/Editor.module.scss'

//TODO: при необходимости включить Redux
//TODO: запилить попап со ссылкой на форму

const mockData: IContentPage = {}


const Editor: NextPage = () => {
  return (<div className={styles.editorContainer}>
    <HeadSEO
      title="Effects"
      description="Manga&comics with effects"
      keywords={["Comics", "manga", "effects", "parallax", "2.5d"]}
      author="🔮 Effects team"
      iconImg="/icon.svg"
      socialNetworkImg="/icon.svg" />

    {/* Поле для публикации и аккаунта */}
    <EditorHeader />

    {/* Настроки эффектов */}
    <EffectsSettings />

    {/* Сами слои */}
    <Layers layers={mockData} />

    {/* Настройки слоёв */}
    <LayersSettings />

    {/* Призыв пройти опрос */}
    <footer className={styles.feedBack}>
      Нам критически важен ваш фидбэк,&nbsp;
      <a
        href="google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        пройдите форму с опросом
      </a>
    </footer>
  </div>)
}

export default Editor
