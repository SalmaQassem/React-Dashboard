import styles from "../../styles/_FormWrapper.module.scss";

const FormWrapper = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default FormWrapper;
