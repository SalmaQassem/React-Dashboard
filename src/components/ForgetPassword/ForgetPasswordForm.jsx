import styles from "../../styles/_ForgetPasswordForm.module.scss";
import { Form } from "react-router-dom";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import { HiOutlineMail } from "react-icons/hi";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";
const ForgetPasswordForm = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <FormContainer class={styles.forgetPass}>
      <FormHeader text={t("body.forgetPassword")}></FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label={t("body.email")}
          id="email"
          type="email"
          name="email"
          icon={<HiOutlineMail />}
        />
        <AuthButton text={t("body.sendCode")} type="submit" />
      </Form>
    </FormContainer>
  );
};

export default ForgetPasswordForm;
