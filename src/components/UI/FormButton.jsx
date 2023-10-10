import styles from "../../styles/_FormButton.module.scss";
import { BsArrowLeftCircle } from "react-icons/bs";

const FormButton = (props) => {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button className={styles.button} onClick={handleClick}>
      <span>{props.children}</span>
      <div className={styles.icon}>
        <BsArrowLeftCircle />
      </div>
    </button>
  );
};

export default FormButton;
