import Timer from "./components/Timer";
import SlideContentEffect from "./components/SlideContentEffect";
import OverlayEffect from "./components/OverlayEffect";
import AutoplayScrollTrigger from "./components/AutoplayScrollTrigger";
import Swiper, { Autoplay, Navigation, Parallax, Pagination } from "swiper";

// инициализируем swiper со всеми необходимыми компонентами
Swiper.use([
  Autoplay,
  Navigation,
  Parallax,
  Pagination,
  Timer,
  SlideContentEffect,
  OverlayEffect,
  AutoplayScrollTrigger,
]);

export default Swiper;
