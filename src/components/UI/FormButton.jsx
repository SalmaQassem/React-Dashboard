import styles from "../../styles/_FormButton.module.scss";

const FormButton = (props) => {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button className={`${styles.button} ${props.class}`} onClick={handleClick}>
      <span>{props.children}</span>
      <div className={styles.icon}>{props.icon}</div>
    </button>
  );
};

export default FormButton;
