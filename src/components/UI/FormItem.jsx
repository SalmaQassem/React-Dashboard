import styles from "../../styles/_FormItem.module.scss";
import { useTranslation } from "react-i18next";

const FormItem = ({
  Class,
  id,
  type,
  register,
  name,
  label,
  icon,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  error,
  placeholder,
}) => {
  const [t, i18n] = useTranslation("global");

  const mouseDownHandler = () => {
    onMouseDown();
  };
  const mouseUpHandler = () => {
    onMouseUp();
  };
  const mouseLeaveHandler = () => {
    onMouseLeave();
  };
  const engLang = i18n.language === "en" ? styles.en : "";
  const fieldClass = error
    ? `${styles.field} ${styles.invalid} ${engLang}`
    : `${styles.field} ${engLang}`;
  return (
    <div className={Class ? `${styles.input} ${Class}` : styles.input}>
      <div className={fieldClass}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder && placeholder}
          {...register(name)}
        />
        <div
          className={
            onMouseDown ? `${styles.icon} ${styles.pass}` : styles.icon
          }
          onMouseDown={onMouseDown ? mouseDownHandler : () => {}}
          onMouseUp={onMouseUp ? mouseUpHandler : () => {}}
          onMouseLeave={onMouseLeave ? mouseLeaveHandler : () => {}}
        >
          {icon}
        </div>
      </div>
      {error && <span className={styles.feedback}>{error.message}</span>}
    </div>
  );
};
export default FormItem;
