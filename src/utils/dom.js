import $ from "jquery";

export const getElemDataAfterTransformations = (elem, cb) => {
  const $elem = $(elem);

  const $clone = $elem.clone();

  $elem.css("position", "absolute");

  $clone.appendTo($elem.parent());

  const result = cb($clone[0]);

  $clone.remove();
  $elem.css("position", "");

  return result;
};

/**
 * Возвращает true, если хоть один пиксель элемента находится во вьюпорте
 *
 * @param {HTMLElement} elem
 */
export const isInView = (elem) => {
  const { top, right, left, bottom } = elem.getBoundingClientRect();

  return top < window.innerHeight && left < window.innerWidth && bottom > 0 && right > 0;
};
