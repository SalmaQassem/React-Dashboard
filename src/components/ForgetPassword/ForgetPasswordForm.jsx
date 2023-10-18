import styles from "../../styles/_ForgetPasswordForm.module.scss";
import { Form } from "react-router-dom";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import FormButton from "../UI/FormButton";
import { HiOutlineMail } from "react-icons/hi";

const ForgetPasswordForm = () => {
  return (
    <FormContainer class={styles.forgetPass}>
      <FormHeader text="استرجاع كلمة المرور"></FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label="البريد الإلكتروني"
          id="email"
          type="email"
          name="email"
          icon={<HiOutlineMail />}
        />
        <FormButton class={styles.submit}>أرسل رمز التحقق</FormButton>
      </Form>
    </FormContainer>
  );
};

export default ForgetPasswordForm;
