import styles from "../../styles/_CodeForm.module.scss";
import { Form } from "react-router-dom";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import { MdOutlineVerifiedUser } from "react-icons/md";
import AuthButton from "../UI/AuthButton";
import { useTranslation } from "react-i18next";

const CodeForm = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <FormContainer class={styles.code}>
      <FormHeader
        class={styles.authHead}
        text={t("body.verificationCode")}
      ></FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label={t("body.verificationCode")}
          id="code"
          type="text"
          name="code"
          icon={<MdOutlineVerifiedUser />}
        />
        <AuthButton text={t("body.verify")} type="submit" />
      </Form>
    </FormContainer>
  );
};

export default CodeForm;
