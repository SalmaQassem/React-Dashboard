import styles from "../../styles/_CodeForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import FormContainer from "../UI/FormContainer";
import FormWrapper from "../UI/FormWrapper";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import { MdOutlineVerifiedUser } from "react-icons/md";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../UI/ChangeLanguage";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CodeForm = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const schema = yup.object().shape({
    code: yup.string().required(t("body.required")),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm({ resolver: yupResolver(schema) });

  const formSubmitHandler = async (formData) => {
    const checkCode = { code: formData.code };
    try {
      const response = await axios.post(
        "https://zadapp.mqawilk.com/api/password/code/check",
        checkCode,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      if (data && data.message) {
        Cookies.set("otp", data.code, {
          secure: true,
        });
        navigate("/ResetPassword");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message && error.response.data.errors) {
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
        <FormHeader
          class={styles.authHead}
          text={t("body.verificationCode")}
        ></FormHeader>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className={styles.form}
        >
          <div className={styles.inputs}>
            <FormItem
              id="code"
              type="text"
              register={register}
              name="code"
              error={errors.code}
              label={t("body.verificationCode")}
              icon={<MdOutlineVerifiedUser />}
            />
            {isSubmitted && errors.submit && !errors.code && (
              <p>{errors.submit.message}</p>
            )}
          </div>
          <AuthButton text={t("body.verify")} type="submit" />
        </form>
        <ChangeLanguage />
      </FormWrapper>
    </FormContainer>
  );
};

export default CodeForm;
