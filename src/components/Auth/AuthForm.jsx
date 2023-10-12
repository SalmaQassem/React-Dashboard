import styles from "../../styles/_AuthForm.module.scss";
import logo from "../../assets/images/logo.png";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../store/user-context";
import { useEffect, useContext } from "react";
import { useState } from "react";

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
    <div className={styles.login}>
      <div className={styles.head}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h1 className={styles.title}>تسجيل الدخول</h1>
        <div className={styles.welcome}>
          <div className={styles.userIcon}>
            <BiUser />
          </div>
          <span>مرحبا بعودتك</span>
        </div>
      </div>
      <Form method="post" className={styles.form}>
        <div className={styles.input}>
          <div className={styles.field}>
            <label htmlFor="email">البريد الإلكتروني</label>
            <input type="email" id="email" name="email" />
            <div className={styles.icon}>
              <HiOutlineMail />
            </div>
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.field}>
            <label htmlFor="password">كلمة المرور</label>
            <input
              type={isShown ? "text" : "password"}
              id="password"
              name="password"
            />
            <div
              className={`${styles.showPass} ${styles.icon}`}
              onClick={showPassword}
            >
              {isShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
        </div>
        <div className={styles.forgetPass}>
          <div className={styles.checkbox}>
            <input type="checkbox" id="checkbox" name="checkbox" />
            <label htmlFor="checkbox">تذكرني</label>
          </div>
          <div className={styles.text}>نسيت كلمة السر</div>
        </div>
        <button type="submit">تسجيل الدخول</button>
      </Form>
    </div>
  );
};

export default AuthForm;
