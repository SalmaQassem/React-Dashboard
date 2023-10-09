import styles from "../../styles/_MainHeader.module.scss";

const StyledHeader = (props) => {
  return (
    <div className={styles.header}>
      <h1>{props.text}</h1>
      <div className={styles.icon}>{props.icon}</div>
    </div>
  );
};

export default StyledHeader;
