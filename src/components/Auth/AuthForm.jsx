import styles from "../../styles/_AuthForm.module.scss";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../store/user-context";
import { useEffect, useContext } from "react";
import { useState } from "react";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";
const AuthForm = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const data = useActionData();
  const [t, i18n] = useTranslation("global");
  const [isShown, setIsShown] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const showPassword = () => {
    setIsShown((prevState) => {
      return !prevState;
    });
  };
  const hidePassword = () => {
    setIsShown(false);
  };
  useEffect(() => {
    if (data && !data.message) {
      //store token in cookies
      Cookies.set("token", data.accessToken, {
        secure: true,
      });
      //store user data in local storage
      sessionStorage.setItem("userData", JSON.stringify(data.user));
      //store user data in context
      const {
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at,
      } = data.user;
      context.setUserData(
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at
      );
      navigate("/dashboard");
    } else {
      if (data && data.message) {
        alert("failed");
        console.log(data);
      }

      if (data && data.errors) {
        if (data.errors.email) {
          setEmailError(data.errors.email);
        }
        if (data.errors.password) {
          setPasswordError(data.errors.password);
        }
      }
    }
  }, [data]);

  return (
    <FormContainer>
      <FormHeader class={styles.authHead} text={t("body.login")}>
        <div className={styles.welcome}>
          <div className={styles.userIcon}>
            <BiUser />
          </div>
          <span>{t("body.welcome")}</span>
        </div>
      </FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label={t("body.email")}
          id="email"
          type="email"
          name="email"
          icon={<HiOutlineMail />}
        />
        {emailError && <span>{emailError}</span>}
        <FormItem
          label={t("body.password")}
          id="password"
          type={isShown ? "text" : "password"}
          name="password"
          icon={isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          onMouseDown={showPassword}
          onMouseUp={showPassword}
          onMouseLeave={hidePassword}
        />
        {passwordError && <span>{passwordError}</span>}
        <div className={styles.forgetPass}>
          <div className={styles.checkbox}>
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">{t("body.rememberMe")}</label>
          </div>
          <Link to="ForgetPassword" className={styles.text}>
            {t("body.forgetPassword")}
          </Link>
        </div>
        <AuthButton text={t("body.login")} type="submit" />
      </Form>
    </FormContainer>
  );
};

export default AuthForm;
