import styles from "../../styles/_UserPermitsForm.module.scss";
import RadioButton from "../UI/RadioButton";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const UserPermitsForm = (props) => {
  const [t, i18n] = useTranslation("global");
  const [userPermits, setUserPermits] = useState([]);
  const selectPermitHandler = (e) => {
    setUserPermits((prevState) => {
      if (prevState.includes(e.target.textContent)) {
        return [...prevState];
      }
      return [...prevState, e.target.textContent];
    });
  };
  const removeItem = (e) => {
    const newItems = userPermits.filter((item) => {
      return item !== e.currentTarget.dataset.text;
    });
    setUserPermits(newItems);
  };
  return (
    <>
      <div className={styles.radioButtons}>
        <RadioButton
          name="input"
          icon="true"
          label={props.type}
          onChange={props.inputHandler}
        />
      </div>
      <div className={styles.permits}>
        {props.permits.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.permit}
              onClick={selectPermitHandler}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.permitsList}>
        {userPermits.length > 0 &&
          userPermits.map((item) => {
            return (
              <div key={item} className={styles.item}>
                <div
                  className={styles.icon}
                  data-text={item}
                  onClick={removeItem}
                >
                  <IoClose />
                </div>
                <span className={styles.text}>{item}</span>
              </div>
            );
          })}
      </div>
      <div className={styles.input}>
        <label htmlFor="email" className={styles.label}>
          {t("body.email")}
        </label>
        <input type="email" id="email" name="email" />
      </div>
    </>
  );
};

export default UserPermitsForm;
