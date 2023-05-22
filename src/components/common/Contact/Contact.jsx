import PropTypes from "prop-types";
import classNames from "classnames";

function getContactContentAttrs(type, data) {
  switch (type) {
    case "phone":
      return {
        href: `tel:${data.replace(/[^0-9+]/g, "")}`,
        itemProp: "telephone",
      };

    case "email":
      return {
        href: `mailto:${data}`,
        itemProp: "email",
      };

    default:
      return {};
  }
}

/**
 * Компонент контакта
 *
 * @param {Object} props
 * @param {string} props.type - Тип контакта
 * @param {string} props.data - Данные контакта
 * @param {string} [props.contentTag] - Тэг элемента в котором будет находится контакт
 * @param {string} [props.className] - Класс элемента
 * @param {('phone'|'email')} [props.itemProp] - Класс элемента
 */
function Contact({ type, data, contentTag, className, itemProp }) {
  const contentAttrs = getContactContentAttrs(type, data);
  const ContentTag = contentAttrs.href ? "a" : contentTag || "p";

  if (itemProp) {
    contentAttrs.itemProp = itemProp;
  }

  return (
    <div className={classNames("contact", className)}>
      <ContentTag className="contact__content" {...contentAttrs}>
        {data}
      </ContentTag>
    </div>
  );
}

Contact.propTypes = {
  type: PropTypes.oneOf(["phone", "email"]),
  data: PropTypes.string.isRequired,
  itemProp: PropTypes.string,
  tag: PropTypes.string,
  className: PropTypes.string,
};

export default Contact;
