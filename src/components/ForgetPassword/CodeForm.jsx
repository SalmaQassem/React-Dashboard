import styles from "../../styles/_CodeForm.module.scss";
import { Form } from "react-router-dom";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import FormButton from "../UI/FormButton";
import { MdOutlineVerifiedUser } from "react-icons/md";

const CodeForm = () => {
  return (
    <FormContainer class={styles.code}>
      <FormHeader class={styles.authHead} text="رمز التحقق"></FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label="رمز التحقق"
          id="code"
          type="text"
          name="code"
          icon={<MdOutlineVerifiedUser />}
        />
        <FormButton class={styles.submit}>تحقق</FormButton>
      </Form>
    </FormContainer>
  );
};

export default CodeForm;
