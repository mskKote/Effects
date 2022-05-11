import React, { useState } from 'react'
import metrics from '../../utils/metrics'
import styles from "./Research.module.scss"


type Props = {
	url: string
}

const Research = ({ url }: Props) => {

	//* Popup для формы и кнопки перехода в редактор
	const [popupVisible, setPopupVisible] = useState(false);
	const togglePopup = () => {
		if (!popupVisible) metrics.info();
		setPopupVisible(x => !x)
	}

	return (<footer className={styles.feedBack}>
		<div className={styles.cell} style={{ display: popupVisible ? "block" : "none" }}>
			<div className={styles.panel}>
				<header>
					<h1>Спасибо за просмотр!</h1>
				</header>
				<p>По ссылке на опрос вы можете поделиться своими впечатлениями</p>
				<p>Нам важно понять, куда развивать такой формат</p>

				<div className={styles.links}>
					<a
						className={styles.create}
						target="_blank"
						rel="noreferrer"
						onClick={metrics.createOwn}
						href={`${url}&edit`}>
						Создать своё
					</a>
					<a
						className={styles.google}
						target="_blank"
						rel="noreferrer"
						onClick={metrics.survey}
						href="https://docs.google.com/forms/d/e/1FAIpQLSd-fLRt1EPcjmakDyMS3_gJltiKaWTIKF7LT6sPO0SPhAiisw/viewform">
						Пройти опрос!
					</a>
				</div>
				<small>MVP1: редактор лучше открывать на большом экране</small>
			</div>
		</div>
		<button onClick={togglePopup} className={styles.toggle}>
			<div className={styles.cross}>
				{popupVisible ? <>
					<div className={styles.x} />
					<div className={styles.y} />
				</> :
					<div className={styles.i}>i</div>}
			</div>
		</button>
	</footer>)
}

export default Research