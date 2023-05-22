import gsap from "gsap";
import { isInView } from "utils/dom";

/**
 * Возвращает анимацию для элементов страницы будут анимироваться при переходе
 *
 * @param {HTMLElement} view - Представления в котором находятся элементы которые надо анимировать
 * @param {object} options - Настройки анимации
 * @param {object} initialVarsValues - Настройки анимации
 * @param {gsap.TweenVars} vars - Параметры анимации
 */
export const getViewTransitionItemTween = (view, { initialVarsValues = {}, vars = {} } = {}) => {
  // Находим все элементы которые надо анимировать и которые находятся во вьюпорте
  const targets = Array.from(view.querySelectorAll(".view-transition-item > *")).filter(isInView);

  const result = gsap.timeline();

  if (targets.length !== 0) {
    const targetsParents = targets.map((target) => target.parentNode);

    result.set(targetsParents, {
      overflow: "hidden",
    });

    result
      // отключаем установленное свойство transition, чтобы не мешать анимации
      .set(targets, { transition: "none" })
      .from(targets, {
        ease: "ease-out",
        stagger(i, target) {
          const { stagger } = target.parentNode.dataset;

          return stagger === undefined ? (initialVarsValues.stagger || 0.04) * i : stagger;
        },
        yPercent(_, target) {
          const { yPercent } = target.parentNode.dataset;

          return yPercent === undefined ? initialVarsValues.yPercent || 101 : yPercent;
        },
        xPercent: (_, target) => target.parentNode.dataset.xPercent,
        maxHeight: (_, target) => target.parentNode.dataset.maxHeight,
        duration(_, target) {
          const { duration } = target.parentNode.dataset;

          return duration === undefined ? initialVarsValues.duration || 0.4 : duration;
        },
        delay: (_, target) => target.parentNode.dataset.delay,
        ...vars,
      })
      .set(targets, { transition: "" });

    result.set(targetsParents, {
      overflow: "",
    });
  }

  return result;
};
