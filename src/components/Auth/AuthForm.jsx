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
import FormButton from "../UI/FormButton";
const AuthForm = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const data = useActionData();
  const [isShown, setIsShown] = useState(false);
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
      localStorage.setItem("userData", JSON.stringify(data.user));
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
      //console.log(data);
    }
  }, [data]);

  return (
    <FormContainer>
      <FormHeader class={styles.authHead} text="تسجيل الدخول">
        <div className={styles.welcome}>
          <div className={styles.userIcon}>
            <BiUser />
          </div>
          <span>مرحبا بعودتك</span>
        </div>
      </FormHeader>
      <Form method="post" className={styles.form}>
        <FormItem
          label="البريد الإلكتروني"
          id="email"
          type="email"
          name="email"
          icon={<HiOutlineMail />}
        />
        <FormItem
          //class={styles.pass}
          label="كلمة المرور"
          id="password"
          type={isShown ? "text" : "password"}
          name="password"
          icon={isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          onMouseDown={showPassword}
          onMouseUp={showPassword}
          onMouseLeave={hidePassword}
        />
        <div className={styles.forgetPass}>
          <div className={styles.checkbox}>
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">تذكرني</label>
          </div>
          <Link to="ForgetPassword" className={styles.text}>
            نسيت كلمة السر
          </Link>
        </div>
        <FormButton class={styles.loginButton}>تسجيل الدخول</FormButton>
      </Form>
    </FormContainer>
  );
};

export default AuthForm;
