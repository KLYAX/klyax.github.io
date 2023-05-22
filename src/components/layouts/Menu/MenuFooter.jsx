function MenuFooter() {
  const contacts = [
    {
      href: "tel:+78633089090",
      itemProp: "telephone",
      label: "8 (863) 308 90 90",
    },
    {
      href: "mailto:info@globe-it.ru",
      itemProp: "email",
      label: "info@globe-it.ru",
    },
  ];

  return (
    <div className="menu__footer">
      <ul className="menu__contacts list">
        {contacts.map((contact, i) => (
          <li key={i} className="menu__contact contact">
            <a
              className="contact__content contact__content_medium link"
              href={contact.href}
              itemProp={contact.itemProp}
            >
              {contact.label}
            </a>
          </li>
          // <Contact href={contact.href} itemProp={contact.itemProp}>
          //   {contact.label}
          // </Contact>
        ))}
      </ul>
    </div>
  );
}

export default MenuFooter;
