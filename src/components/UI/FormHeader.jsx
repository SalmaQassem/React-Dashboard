import styles from "../../styles/_FormHead.module.scss";
import logo from "../../assets/images/logo.png";

const FormHeader = (props) => {
  return (
    <div
      className={props.class ? `${styles.head} ${props.class}` : styles.head}
    >
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h1 className={styles.title}>{props.text}</h1>
      {props.children}
    </div>
  );
};
export default FormHeader;
