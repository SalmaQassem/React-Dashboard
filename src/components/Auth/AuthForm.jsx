import styles from "../../styles/_AuthForm.module.scss";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../store/user-context";
import { useContext } from "react";
import { useState } from "react";
import FormContainer from "../UI/FormContainer";
import FormWrapper from "../UI/FormWrapper";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../UI/ChangeLanguage";

const AuthForm = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [isShown, setIsShown] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("body.required"))
      .email(t("body.emailValidation"))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        t("body.emailValidation")
      ),
    password: yup.string().required(t("body.required")),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });

  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      label: t("body.email"),
      error: errors.email,
      icon: <HiOutlineMail />,
    },
    {
      id: "password",
      type: isShown ? "text" : "password",
      name: "password",
      label: t("body.password"),
      error: errors.password,
      icon: isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />,
    },
  ];

  const showPassword = () => {
    setIsShown((prevState) => {
      return !prevState;
    });
  };
  const hidePassword = () => {
    setIsShown(false);
  };
  const formSubmitHandler = async (formData) => {
    const enteredData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post(
        "https://zadapp.mqawilk.com/api/login",
        enteredData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      if (data && data.accessToken) {
        //store token in cookies
        Cookies.set("token", data.accessToken, {
          secure: true,
        });
        //store user data in Cookies
        Cookies.set("userData", JSON.stringify(data.user), {
          secure: true,
        });
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
          password,
          image,
        } = data.user;
        context.setUserData(
          id,
          first_name,
          last_name,
          phone,
          email,
          role,
          created_at,
          updated_at,
          password,
          image
        );
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message && !error.response.data.errors) {
          setError("submit", {
            type: "server",
            message: error.response.data.message,
          });
        }
      }
    }
  };
  return (
    <FormContainer>
      <FormWrapper>
        <FormHeader text={t("body.login")}>
          <div className={styles.welcome}>
            <div className={styles.userIcon}>
              <BiUser />
            </div>
            <span>{t("body.welcome")}</span>
          </div>
        </FormHeader>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className={styles.form}
          noValidate
        >
          <div className={styles.inputs}>
            <div className={styles.inputItems}>
              {inputs.map((item) => {
                return (
                  <FormItem
                    id={item.id}
                    key={item.id}
                    type={item.type}
                    register={register}
                    name={item.name}
                    label={item.label}
                    icon={item.icon}
                    onMouseDown={
                      item.id === "password" ? showPassword : () => {}
                    }
                    onMouseUp={item.id === "password" ? showPassword : () => {}}
                    onMouseLeave={
                      item.id === "password" ? hidePassword : () => {}
                    }
                    error={item.error}
                  />
                );
              })}
            </div>
            {isSubmitted &&
              errors.submit &&
              !errors.email &&
              !errors.password && <p>{errors.submit.message}</p>}
          </div>
          <div className={styles.forgetPass}>
            <Link to="ForgetPassword" className={styles.text}>
              {t("body.forgetPassword")}
            </Link>
          </div>
          <AuthButton text={t("body.login")} type="submit" />
        </form>
        <ChangeLanguage />
      </FormWrapper>
    </FormContainer>
  );
};

export default AuthForm;
