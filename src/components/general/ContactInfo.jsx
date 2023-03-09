import ContactIcon from "../../svg/ContactIcon";

import styles from "./ContactInfo.module.css";

import useContent from "../../hooks/use-content/use-content";

function ContactInfo(props) {
  const [content] = useContent();
  const componentContext = content.components.ContactInfo;

  return (
    <div className={`${styles.container} ${props.styles}`}>
      <a href={`tel:${componentContext.phone}`}>
        <ContactIcon
          type="phone"
          isDark={true}
          styles={styles["tel-icon"]}
        />
        <span>{componentContext.phone}</span>
      </a>
      <a href={`mailto:${componentContext.email}`}>
        <ContactIcon
          type="email"
          isDark={true}
        />
        <span>{componentContext.email}</span>
      </a>
    </div>
  );
}

export default ContactInfo;
