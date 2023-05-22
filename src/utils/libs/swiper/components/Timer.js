import $ from "jquery";
import { bindModuleMethods } from "swiper/esm/utils/utils";

/**
 * объект хранит необходимые методы для работы таймера
 */
const Timer = {
  /**
   * при необходимости добавляет 0 в начале числа num, чтобы образовать две цифры
   */
  makeTwoDigits(num) {
    return num < 10 ? "0" + num : num;
  },

  /**
   * переводит миллисекунды diffTime в читаемы вид '00:00'
   */
  formatTime(diffTime) {
    const swiper = this;

    const date = new Date(diffTime);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${swiper.timer.makeTwoDigits(minutes)}:${swiper.timer.makeTwoDigits(seconds)}`;
  },
  /**
   * печатает время в элементе который указан в параметрах свайпера
   */
  print(diffTime) {
    const swiper = this;

    if (!swiper.timer?.$elem || swiper.timer?.$elem.length === 0) {
      return;
    }

    let newTime = "";

    if (typeof swiper.params.timer.formatTime === "function") {
      newTime = swiper.params.timer.formatTime(diffTime);
    } else {
      newTime = swiper.timer.formatTime(diffTime);
    }

    const oldTime = swiper.timer.$elem.text();

    if (oldTime !== newTime) {
      swiper.timer.$elem.text(newTime);
    }
  },

  /**
   * сбрасывает таймер до 0 и удаляет таймер
   */
  stop() {
    const swiper = this;

    clearInterval(swiper.intervalId);

    swiper.timer.pause();
    swiper.timer.clear();
  },

  /**
   * сбрасывает вывод таймера до 0
   */
  clear() {
    const swiper = this;

    swiper.timer.print(0);
  },

  /**
   * останавливает таймер
   */
  pause() {
    const swiper = this;

    swiper.timer.running = false;
  },
  /**
   * возобновляет таймер
   */
  resume() {
    const swiper = this;

    swiper.timer.running = true;
  },

  /**
   * начинает отчитывать время сначала
   */
  reset() {
    const swiper = this;

    swiper.timer.endTime = Date.now() + swiper.params.autoplay.delay;
  },

  /**
   * запускает таймер
   */
  start() {
    const swiper = this;
    const { timer, params } = swiper;

    if (timer.intervalId) {
      timer.stop();
      timer.reset();
    }

    timer.running = true;
    timer.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const diffTime = new Date(timer.endTime - currentTime).getTime();

      if (timer.running && timer.endTime > currentTime) {
        timer.print(diffTime);
      }
    }, params.timer.updateTime);
  },
};

/**
 * компонент для swiper отвечающий за отчет времени переключения слада
 */
const component = {
  name: "timer",
  params: {
    timer: {
      selector: "",
      updateTime: 150,
      formatTime: null,
    },
  },
  create() {
    const swiper = this;

    bindModuleMethods(swiper, {
      timer: {
        ...Timer,
        $elem: null,
        intervalId: null,
        endTime: null,
        running: false,
      },
    });
  },
  on: {
    /**
     * инициализируем компонент
     */
    init(swiper) {
      if (swiper.autoplay && swiper.params.timer) {
        const $elem = $(swiper.params.timer.selector);

        if ($elem.length !== 0) {
          swiper.timer.$elem = $elem;

          swiper.timer.start();
        }
      }
    },

    /**
     * останавливает таймер при начале тач события
     */
    touchStart(swiper) {
      if (swiper.timer.running) {
        swiper.timer.pause();
      }
    },

    /**
     * сбрасывает и восстанавливаем таймер при конце тач события
     */
    touchEnd(swiper) {
      if (!swiper.timer.running) {
        swiper.timer.reset();
        swiper.timer.resume();
      }
    },

    /**
     * сбрасывает таймер после изменения слайда
     */
    slideChange(swiper) {
      if (swiper.timer.running) {
        swiper.timer.reset();
      }
    },

    /**
     * останавливаем таймер при остановке автоплея
     */
    autoplayStop(swiper) {
      if (swiper.timer.running) {
        swiper.timer.stop();
      }
    },

    /**
     * запускам таймер при включении автоплея
     */
    autoplayStart(swiper) {
      if (!swiper.timer.running) {
        swiper.timer.start();
      }
    },

    /**
     * останавливаем таймер во время уничтожения swiper
     */
    destroy(swiper) {
      if (swiper.autoplay.running) {
        swiper.timer.stop();
      }
    },
  },
};

export default component;
