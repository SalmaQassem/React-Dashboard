import styles from "../../styles/_FormContainer.module.scss";
const FormContainer = (props) => {
  return (
    <div
      className={
        props.class ? `${styles.container} ${props.class}` : styles.container
      }
    >
      {props.children}
    </div>
  );
};

export default FormContainer;
