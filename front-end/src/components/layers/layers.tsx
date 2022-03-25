import React, { useEffect, useRef, useState } from 'react'
import IContentPage, { ELanguages } from '../../interfaces/IContentPage'
import { EEffects } from '../../interfaces/IEffects'
import Layer from './layer/layer'
import Parallax from 'parallax-js'
import styles from './Layers.module.scss'

type Props = {
  contentPage: IContentPage
  currentLanguage: ELanguages
}

const Layers = ({ contentPage, currentLanguage }: Props) => {
  const { layers } = contentPage
  const parallaxRef = useRef<HTMLElement>(null)
  const [permission, setPermission] = useState<boolean>(false)

  function requestMotionPermission() {
    try {
      console.log("typeof", typeof (DeviceMotionEvent as any).requestPermission);
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        (DeviceMotionEvent as any).requestPermission()
          .then((response: String) => {
            // if (response === 'granted') {
            // }
            setPermission(true)
            alert(`response ${response}`)
          })
          .catch(console.error)
      } else {
        setPermission(true)
        console.log("DeviceMotionEvent", JSON.stringify(DeviceMotionEvent));
      }
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  useEffect(() => {
    console.log('useEffect');
    if (typeof (DeviceMotionEvent as any).requestPermission !== 'function') {
      setPermission(true)
    }
    new Parallax(parallaxRef?.current)
  }, [permission, parallaxRef, layers[0]?.effects[EEffects.parallax]?.value])

  return (<main className={styles.layersContainer} ref={parallaxRef}>
    {!permission ?
      <button onClick={requestMotionPermission}>Требуется разрешение</button> :
      layers.length === 0 ?
        <h1 className={styles.placeholder}>Добавьте слой</h1> :
        layers.map((layer, i) =>
          <Layer key={i} layer={layer} currentLanguage={currentLanguage} />)}
  </main>)
}

export default Layers