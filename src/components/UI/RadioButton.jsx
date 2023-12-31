import styles from "../../styles/_RadioButton.module.scss";
import { BsCheck2 } from "react-icons/bs";

const RadioButton = ({ label, radioName, register, icon, checked, value }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          {...register(radioName)}
          value={value}
          defaultChecked={checked}
        />
        <span className={styles.checkMark}>
          {icon === "true" && <BsCheck2 />}
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
};
export default RadioButton;
