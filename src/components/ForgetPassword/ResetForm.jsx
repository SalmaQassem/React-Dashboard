import styles from "../../styles/_ResetPasswordForm.module.scss";
import { Form } from "react-router-dom";
import FormContainer from "../UI/FormContainer";
import FormHeader from "../UI/FormHeader";
import FormItem from "../UI/FormItem";
import FormButton from "../UI/FormButton";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ResetForm = () => {
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
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
      <FormHeader text="إعادة تعيين كلمة المرور"></FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label="كلمة المرور الجديدة"
          id="password"
          type={isShown ? "text" : "password"}
          name="password"
          icon={isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          onMouseDown={showPassword}
          onMouseUp={showPassword}
          onMouseLeave={hidePassword}
        />
        <FormItem
          label="تأكيد كلمة المرور"
          id="confirmPassword"
          type={isShown ? "text" : "password"}
          name="confirmPassword"
          icon={isShown1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          onMouseDown={showPassword1}
          onMouseUp={showPassword1}
          onMouseLeave={hidePassword1}
        />
        <FormButton class={styles.submit}>حفظ التغييرات</FormButton>
      </Form>
    </FormContainer>
  );
};

export default ResetForm;
