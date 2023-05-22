import PropTypes from "prop-types";
import classNames from "classnames";

const HeaderContact = ({ className }) => {
  return (
    <div
      className={classNames("header-contact contact", className)}
      itemType="http://schema.org/Organization"
    >
      <a
        href="tel:+78633089090"
        className="header-contact__content contact__content link"
        itemProp="telephone"
      >
        +7 (863) 308 90 90
      </a>
    </div>
  );
};

HeaderContact.propTypes = {
  className: PropTypes.string,
};

export default HeaderContact;
