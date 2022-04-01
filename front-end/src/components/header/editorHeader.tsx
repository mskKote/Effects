import React, { useState } from 'react'
import Image from 'next/image'
import Requests from '../../utils/Requests';
import IContentPage from '../../interfaces/IContentPage';
import styles from './EditorHeader.module.scss'
import metrics from '../../utils/metrics';

type Props = {
  contentPage: IContentPage
}

const EditorHeader = ({ contentPage }: Props) => {
  const [link, setLink] = useState("");
  const defaultCopyText = "Копировать 📋"
  const [copyText, setCopyText] = useState(defaultCopyText);

  async function publish() {
    metrics.publish()
    setCopyText(defaultCopyText)
    const result = await Requests.publishPage(contentPage)
    console.log("publish", result)
    setLink(`${Requests.URL}?id=${result}`)
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(link)
    setCopyText("Скопировано 👌")
    setTimeout(() => setCopyText(defaultCopyText), 1250)
  }


  return <header className={styles.editorHeader}>
    {/* Опубликованный URL */}
    <input
      className={styles.publishedUrl}
      value={link}
      placeholder={"Тут будет URL..."}
      readOnly />
    <button
      className={styles.copyPublishedUrl}
      disabled={link.length === 0}
      onClick={copyToClipboard}>
      {copyText}
    </button>

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