import styles from "../styles/_UserPermits.module.scss";
import StyledHeader from "../components/UI/MainHeader";
import { FaUserShield } from "react-icons/fa";
import UserPermitsForm from "../components/UserPermits/UserPermitsForm";
//import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../components/UI/FormButton";
import { Form } from "react-router-dom";

const UserPermits = () => {
  const [t, i18n] = useTranslation("global");
  //const [input, setInput] = useState("");
  const adminPermits = [
    { id: "0", name: t("body.deleteUser") },
    { id: "1", name: t("body.addUser") },
    { id: "2", name: t("body.editAccount") },
  ];
  const clientPermits = [
    { id: "0", name: t("body.editContent") },
    { id: "1", name: t("body.editAccountReq") },
    { id: "2", name: t("body.deleteContent") },
  ];

  /*const radioInputHandler = ({ target: { value } }) => {
    setInput(value);
  };*/

  const onFirstFormSubmit = () => {};
  const onSecondFormSubmit = () => {};
  return (
    <div className={styles.userPermits}>
      <StyledHeader
        text={t("body.permissions")}
        icon={<FaUserShield />}
        class={styles.header}
      ></StyledHeader>
      <Form className={styles.forms}>
        <div className={styles.form}>
          <UserPermitsForm
            type={t("body.adminRole")}
            permits={adminPermits}
            //inputHandler={radioInputHandler}
          />
          <FormButton
            type="button"
            class={
              i18n.language === "en"
                ? `${styles.submit} ${styles.en}`
                : styles.submit
            }
            onClick={onFirstFormSubmit}
          >
            {t("body.saveChanges")}
          </FormButton>
        </div>
        <div className={styles.form}>
          <UserPermitsForm
            type={t("body.user")}
            permits={clientPermits}
            //inputHandler={radioInputHandler}
          />
          <FormButton
            type="button"
            class={
              i18n.language === "en"
                ? `${styles.submit} ${styles.en}`
                : styles.submit
            }
            onClick={onSecondFormSubmit}
          >
            {t("body.saveChanges")}
          </FormButton>
        </div>
      </Form>
    </div>
  );
};

export default UserPermits;
