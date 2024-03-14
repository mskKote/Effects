import ym from "react-yandex-metrika";

/**
 ** нажатие на публикацию
 ** нажатие на info
 ** нажатие на "создать своё"
 ** нажатие на "пройти опрос!"
 */
class Metrics {
  publish() {
    ym("reachGoal", "publish");
  }

  info() {
    ym("reachGoal", "info");
  }

  createOwn() {
    ym("reachGoal", "createOwn");
  }

  survey() {
    ym("reachGoal", "survey");
  }
}

const metrics = new Metrics();

export default metrics;
