import styles from "../../styles/_FormButton.module.scss";

const FormButton = (props) => {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button
      type={props.type}
      className={
        props.class ? `${styles.button} ${props.class}` : styles.button
      }
      onClick={props.onClick && handleClick}
    >
      <span>{props.children}</span>
      {props.icon && <div className={styles.icon}>{props.icon}</div>}
    </button>
  );
};

export default FormButton;
