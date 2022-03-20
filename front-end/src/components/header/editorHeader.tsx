import React from 'react'
import Image from 'next/image'
import styles from './EditorHeader.module.scss'

type Props = {
}

// TODO: реализовать запрос на публикацию
// TODO: внести опубликованную ссылку в копию
// TODO: реализовать popup

const EditorHeader = ({ }: Props) => {
  return <header className={styles.editorHeader}>
    <button>Опубликовать</button>
    <div className={styles.resultPopup}>
      Контент доступен по ссылке
      <input value="https://ссылка/контент" disabled />
      <button>copy</button>
    </div>

    <div className={styles.profileContainer}>
      <Image src={"/user-icon.png"} layout={"fill"} alt="аккаунт" />
    </div>
  </header>
}

export default EditorHeader