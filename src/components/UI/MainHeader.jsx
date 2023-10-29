import styles from "../../styles/_MainHeader.module.scss";

const StyledHeader = (props) => {
  return (
    <div className={`${styles.header} ${props.class ? props.class : ""}`}>
      <h1>{props.text}</h1>
      <div className={styles.icon}>{props.icon}</div>
    </div>
  );
};

export default StyledHeader;
