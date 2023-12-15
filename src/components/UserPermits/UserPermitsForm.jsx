import styles from "../../styles/_UserPermitsForm.module.scss";
import RadioButton from "../UI/RadioButton";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UserPermitsForm = (props) => {
  const [t, i18n] = useTranslation("global");
  const [userPermits, setUserPermits] = useState([]);
  const schema = yup.object().shape({});
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const selectPermitHandler = (e) => {
    setUserPermits((prevState) => {
      if (prevState.includes(e.target.id)) {
        return [...prevState];
      }
      return [...prevState, e.target.id];
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
          radioName={"input"}
          register={register}
          icon="true"
          label={props.type}
        />
      </div>
      <div className={styles.permits}>
        {props.permits.map((item, index) => {
          return (
            <div
              key={item.id}
              id={index}
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
                <span className={styles.text}>{props.permits[item].name}</span>
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
