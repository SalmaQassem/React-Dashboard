import styles from "../../styles/_AuthButton.module.scss";

const AuthButton = (props) => {
  return (
    <button className={styles.button} type={props.type}>
      {props.text}
    </button>
  );
};

export default AuthButton;
