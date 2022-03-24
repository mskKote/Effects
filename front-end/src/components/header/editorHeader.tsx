import React from 'react'
import Image from 'next/image'
import styles from './EditorHeader.module.scss'

type Props = {
}

// TODO: реализовать запрос на публикацию
// TODO: внести опубликованную ссылку в копию
// TODO: реализовать popup

const EditorHeader = ({ }: Props) => {
  const popup = React.useRef(null)
  const copy = React.useRef(null)
  const link = "https://cdn.gallerix.asia/x/src/news/2020/Jun/photopea.jpg";
  function showPopup() {
    popup.current.style.display = "block";
  }
  function closePopup() {
    popup.current.style.display = "none";
  }
  function copyToClipboard() {
    copy.current.select();
    document.execCommand("copy");
  }
  return <header className={styles.editorHeader}>
    <button className={styles.addVariable}
      onClick={showPopup}>
      <span>Опубликовать</span>
      <svg width="15px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
    
    <div ref={popup} className={styles.popup}>
      <div className={styles.popupForm}>
        <h1>Ссылка на пикчу</h1>
        <input ref={copy} defaultValue={link}></input>
        <p onClick={copyToClipboard}>📋</p><p className={styles.close} onClick={closePopup}>Close</p>
      </div>
    </div>

    <div className={styles.profileContainer}>
      <Image src={"/user-icon.png"} layout={"fill"} alt="аккаунт" />
    </div>
  </header>
}

export default EditorHeader