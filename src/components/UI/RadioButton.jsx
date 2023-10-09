import styles from "../../styles/_RadioButton.module.scss";
import { BsCheck2 } from "react-icons/bs";

const RadioButton = ({ label, name, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input type="radio" name={name} {...rest} />
        <span className={styles.checkMark}>
          <BsCheck2 />
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
};
export default RadioButton;
