import styles from "../../styles/_FormItem.module.scss";

const FormItem = (props) => {
  const mouseDownHandler = () => {
    props.onMouseDown();
  };
  const mouseUpHandler = () => {
    props.onMouseUp();
  };
  const mouseLeaveHandler = () => {
    props.onMouseLeave();
  };
  return (
    <div
      className={props.class ? `${styles.input} ${props.class}` : styles.input}
    >
      <div className={styles.field}>
        <label htmlFor={props.id}>{props.label}</label>
        <input type={props.type} id={props.id} name={props.name} />
        <div
          className={
            props.onMouseDown ? `${styles.icon} ${styles.pass}` : styles.icon
          }
          onMouseDown={props.onMouseDown ? mouseDownHandler : () => {}}
          onMouseUp={props.onMouseUp ? mouseUpHandler : () => {}}
          onMouseLeave={props.onMouseLeave ? mouseLeaveHandler : () => {}}
        >
          {props.icon}
        </div>
      </div>
    </div>
  );
};
export default FormItem;
