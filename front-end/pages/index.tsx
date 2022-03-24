import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { EEffects } from '../src/interfaces/IEffects'
import EffectsSettings from '../src/components/effectsSettigns/EffectsSettings'
import HeadSEO from '../src/utils/HeadSEO'
import Layers from '../src/components/layers/layers'
import LayersSettings from '../src/components/layersSettings/layersSettings'
import IContentPage, { ELanguages } from '../src/interfaces/IContentPage'
import EditorHeader from '../src/components/header/editorHeader'
import styles from '../styles/Editor.module.scss'
import Loader from '../src/components/loader/loader'

//TODO: запилить попап со ссылкой на форму

const mockData: IContentPage = {
  layers: [{
    content: {
      [ELanguages.ru_RU]: { name: "Задний фонк", url: "/mock/p1.png" }
    },
    effects: {
      [EEffects.parallax]: { value: 0.5 },
      [EEffects.blur]: { value: 2.5 }
    }
  }, {
    content: {
      [ELanguages.ru_RU]: { name: "Персонаж", url: "/mock/Scott-p1.png" }
    },
    effects: {
      [EEffects.parallax]: { value: 0.6 }
    }
  }]
}


const Editor: NextPage = () => {
  const [editMode, setEditMode] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentLayer, setCurrentLayer] = useState(0)
  const [contentPage, setContentPage] = useState(mockData);
  const [currentLanguage, setCurrentLanguage] = useState(ELanguages.ru_RU);

  function requestMotionPermission() {
    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        (DeviceMotionEvent as any).requestPermission()
          .then((response: String) => {
            // if (response === 'granted') {
            // }
            setLoading(false)
            alert(`response ${response}`)
          })
          .catch(console.error)
      } else {
        console.log(JSON.stringify(DeviceMotionEvent));
      }
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  useEffect(() => {
    setEditMode(window.location.search ? false : true)
    requestMotionPermission()
    // setTimeout(() => setLoading(false), 1400)
    // alert(`DeviceMotionEvent ${!!window.DeviceMotionEvent}`)
    // alert(`DeviceOrientationEvent ${!!window.DeviceOrientationEvent}`)
  }, [])

  if (editMode === undefined || loading) return <Loader />

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
      <Layers contentPage={contentPage} currentLanguage={currentLanguage} />

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
