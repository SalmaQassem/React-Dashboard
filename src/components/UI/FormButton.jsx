import styles from "../../styles/_FormButton.module.scss";
import { BsArrowLeftCircle } from "react-icons/bs";

const FormButton = (props) => {
  return (
    <button className={styles.button}>
      <span>{props.children}</span>
      <div className={styles.icon}>
        <BsArrowLeftCircle />
      </div>
    </button>
  );
};

export default FormButton;
