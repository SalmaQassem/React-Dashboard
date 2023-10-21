import styles from "../../styles/_ResetPasswordForm.module.scss";
import { Form } from "react-router-dom";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";

const ResetForm = () => {
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [t, i18n] = useTranslation("global");
  const showPassword = () => {
    setIsShown((prevState) => {
      return !prevState;
    });
  };
  const hidePassword = () => {
    setIsShown(false);
  };
  const showPassword1 = () => {
    setIsShown1((prevState) => {
      return !prevState;
    });
  };
  const hidePassword1 = () => {
    setIsShown1(false);
  };
  return (
    <FormContainer class={styles.resetPass}>
      <FormHeader text={t("body.resetPassword")} />
      <Form method="post" className={styles.form}>
        <FormItem
          label={t("body.newPassword")}
          id="password"
          type={isShown ? "text" : "password"}
          name="password"
          icon={isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          onMouseDown={showPassword}
          onMouseUp={showPassword}
          onMouseLeave={hidePassword}
        />
        <FormItem
          label={t("body.confirmPassword")}
          id="confirmPassword"
          type={isShown ? "text" : "password"}
          name="confirmPassword"
          icon={isShown1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          onMouseDown={showPassword1}
          onMouseUp={showPassword1}
          onMouseLeave={hidePassword1}
        />
        <AuthButton text={t("body.saveChanges")} type="submit" />
      </Form>
    </FormContainer>
  );
};

export default ResetForm;
