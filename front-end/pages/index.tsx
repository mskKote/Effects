import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { EEffects } from '../src/interfaces/IEffect'
import EffectsSettings from '../src/components/effectsSettigns/EffectsSettings'
import HeadSEO from '../src/utils/HeadSEO'
import Layers from '../src/components/layers/layers'
import LayersSettings from '../src/components/layersSettings/layersSettings'
import IContentPage from '../src/interfaces/IContentPage'
import EditorHeader from '../src/components/header/editorHeader'
import styles from '../styles/Editor.module.scss'
import Loader from '../src/components/loader/loader'

//TODO: при необходимости включить Redux
//TODO: запилить попап со ссылкой на форму

const mockData: IContentPage = {
  layers: [{
    content: [{ languages: "ru_RU", url: "/mock/p1.png" }],
    effects: [
      { type: EEffects.parallax, value: 0.5 },
      { type: EEffects.blur, value: 2.5 }
    ]
  }, {
    content: [{ languages: "ru_RU", url: "/mock/Scott-p1.png" }],
    effects: [
      { type: EEffects.parallax, value: 0.6 },
    ]
  }]
}


const Editor: NextPage = () => {
  const [editMode, setEditMode] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLayer, setCurrentLayer] = useState(0)
  const [contentPage, setContentPage] = useState(mockData);

  useEffect(() => {
    setEditMode(window.location.search ? false : true)
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (editMode === undefined || loading) return <Loader />
  console.log("Editor >>:", contentPage.layers[0].effects[0].value);

  return (
    <div className={`${styles.editorContainer} ${editMode ? styles.editorTime : styles.showTime}`}>

      <HeadSEO
        title="Effects"
        description="Manga&comics with effects"
        keywords={["Comics", "manga", "effects", "parallax", "2.5d"]}
        author="🔮 Effects team"
        iconImg="/icon.svg"
        socialNetworkImg="/icon.svg" />

      {/* Поле для публикации и аккаунта */}
      {editMode && <EditorHeader />}

      {/* Настроки эффектов */}
      {editMode &&
        <EffectsSettings
          contentPage={contentPage}
          setContentPage={setContentPage}
          currentLayer={currentLayer} />}

      {/* Сами слои */}
      <Layers layers={contentPage.layers} />

      {/* Настройки слоёв */}
      {editMode &&
        <LayersSettings
          contentPage={contentPage} setContentPage={setContentPage}
          currentLayer={currentLayer} setCurrentLayer={setCurrentLayer} />}

      {/* Призыв пройти опрос */}
      <footer className={styles.feedBack}>
        Нам критически важен ваш фидбэк,&nbsp;
        <a
          href="google.com"
          target="_blank"
          rel="noopener noreferrer">
          пройдите форму с опросом
        </a>
      </footer>
    </div>)
}

export default Editor
