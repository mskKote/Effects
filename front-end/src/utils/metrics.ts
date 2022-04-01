import ym from 'react-yandex-metrika';

/**
 * TODO нажатие на публикацию
 * TODO нажатие на info
 * TODO нажатие на "создать своё"
 * TODO нажатие на "пройти опрос!"
 */
class Metrics {
  private token = process.env.NEXT_PUBLIC_YANDEX_METRIKA as string

  publish() {
    ym(this.token, 'reachGoal', 'publish')
  }

  info() {
    ym(this.token, 'reachGoal', 'info')
  }

  createOwn() {
    ym(this.token, 'reachGoal', 'createOwn')
  }

  survey() {
    ym(this.token, 'reachGoal', 'survey')
  }
}

export default new Metrics()