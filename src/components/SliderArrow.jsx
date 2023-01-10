import Arrow from "../svg/Arrow";

import styles from "./SliderArrow.module.css";

function SliderArrow(props) {
  return (
    <div
      className={`${styles.container} ${props.isLeft && styles.left} ${
        props.styles
      }`}
      role="button">
      <Arrow
        isLeft={props.isLeft}
        iconStyles={styles.icon}
      />
    </div>
  );
}

export default SliderArrow;
