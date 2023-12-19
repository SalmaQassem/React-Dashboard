import styles from "../../styles/_ForgetPasswordForm.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import FormContainer from "../UI/FormContainer";
import FormWrapper from "../UI/FormWrapper";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import { HiOutlineMail } from "react-icons/hi";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../UI/ChangeLanguage";
import { useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [t, i18n] = useTranslation("global");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required(t("body.required"))
      .email(t("body.emailValidation"))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        t("body.emailValidation")
      ),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });
  const formSubmitHandler = async (formData) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const emailAdd = { email: formData.email };
      try {
        const response = await axios.post(
          "https://zadapp.mqawilk.com/api/password/email",
          emailAdd,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.data;
        setIsSubmitting(false);
        if (data && data.message) {
          navigate("/CheckCode");
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
    <FormContainer>
      <FormWrapper>
        <FormHeader text={t("body.forgetPassword")}></FormHeader>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className={styles.form}
          noValidate
        >
          <div className={styles.inputs}>
            <FormItem
              id="email"
              type="email"
              register={register}
              name="email"
              error={errors.email}
              label={t("body.email")}
              icon={<HiOutlineMail />}
            />
            {isSubmitted && errors.submit && !errors.email && (
              <p>{errors.submit.message}</p>
            )}
          </div>
          <AuthButton
            text={
              isSubmitting ? `${t("body.submitting")}...` : t("body.sendCode")
            }
            type="submit"
          />
        </form>
        <ChangeLanguage />
      </FormWrapper>
    </FormContainer>
  );
};

export default ForgetPasswordForm;
