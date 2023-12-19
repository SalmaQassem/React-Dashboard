import styles from "../../styles/_ResetPasswordForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import FormContainer from "../UI/FormContainer";
import FormWrapper from "../UI/FormWrapper";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../UI/ChangeLanguage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Modal from "../UI/Modal";
import { FaCheck } from "react-icons/fa";

const ResetForm = () => {
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [t, i18n] = useTranslation("global");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    password: yup.string().required(t("body.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("body.passwordMatch"))
      .required(t("body.required")),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });
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
  const inputs = [
    {
      id: "password",
      type: isShown ? "text" : "password",
      name: "password",
      label: t("body.newPassword"),
      error: errors.password,
      icon: isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />,
      onMouseDown: showPassword,
      onMouseUp: showPassword,
      onMouseLeave: hidePassword,
    },
    {
      id: "confirmPassword",
      type: isShown1 ? "text" : "password",
      name: "confirmPassword",
      label: t("body.confirmPassword"),
      error: errors.confirmPassword,
      icon: isShown1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />,
      onMouseDown: showPassword1,
      onMouseUp: showPassword1,
      onMouseLeave: hidePassword1,
    },
  ];
  const formSubmitHandler = async (formData) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const otp = Cookies.get("otp");
      const enteredData = {
        code: otp,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };
      try {
        const response = await axios.post(
          "https://zadapp.mqawilk.com/api/password/reset",
          enteredData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.data;
        setIsSubmitting(false);
        if (data && data.message) {
          Cookies.remove("otp");
          setIsModalOpened(true);
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      } catch (error) {
        setIsSubmitting(false);
        if (error.response) {
          if (error.response.data.message && error.response.data.errors) {
            setError("submit", {
              type: "server",
              message: error.response.data.message,
            });
          }
        }
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpened && (
          <Modal
            head={t("body.success")}
            message={t("body.passwordResetSuccess")}
            icon={<FaCheck />}
            state="edit"
            setOpened={setIsModalOpened}
          />
        )}
      </AnimatePresence>
      <FormContainer>
        <FormWrapper>
          <FormHeader text={t("body.resetPassword")} />
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className={styles.form}
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
                      onMouseDown={item.onMouseDown}
                      onMouseUp={item.onMouseUp}
                      onMouseLeave={item.onMouseLeave}
                      error={item.error}
                    />
                  );
                })}
              </div>
              {isSubmitted &&
                errors.submit &&
                !errors.password &&
                !errors.confirmPassword && <p>{errors.submit.message}</p>}
            </div>
            <AuthButton
              text={
                isSubmitting
                  ? `${t("body.submitting")}...`
                  : t("body.saveChanges")
              }
              type="submit"
            />
          </form>
          <ChangeLanguage />
        </FormWrapper>
      </FormContainer>
    </>
  );
};

export default ResetForm;
