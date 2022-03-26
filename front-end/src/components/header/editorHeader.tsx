import React, { useState } from 'react'
import Image from 'next/image'
import styles from './EditorHeader.module.scss'

type Props = {
}

const defaultCopyText = "Копировать 📋"
const EditorHeader = ({ }: Props) => {
  const [link, setLink] = useState("");
  const [copyText, setCopyText] = useState(defaultCopyText);

  function publish() {
    //TODO: публикация
    setCopyText(defaultCopyText)
    setLink("https://effects.vercel.app?id=1")
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(link)
    setCopyText("Скопировано 👌")
    setTimeout(() => setCopyText(defaultCopyText), 1250)
  }
  return <header className={styles.editorHeader}>
    {/* Опубликованный URL */}
    <input className={styles.publishedUrl} value={link} placeholder={"Тут будет URL..."} />
    <button className={styles.copyPublishedUrl} onClick={copyToClipboard}>{copyText}</button>

    {/* Кнопка публикации */}
    <button className={styles.publish} onClick={publish}>
      <span>Опубликовать</span>
      <svg width="15px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5" />
        <polyline points="8 1 12 5 8 9" />
      </svg>
    </button>

    {/* Профиль */}
    <div className={styles.profileContainer}>
      <Image src={"/user-icon.png"} layout={"fill"} alt="аккаунт" />
    </div>
  </header>
}

export default EditorHeader