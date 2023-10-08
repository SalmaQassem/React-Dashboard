import styles from "../../styles/_AuthForm.module.scss";
import logo from "../../assets/images/logo.png";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../store/user-context";
import { useEffect, useContext } from "react";

const AuthForm = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const data = useActionData();
  
  useEffect(() => {
    if (data && !data.message) {
      //const content = data.json();
      const content = data;
      if (data.status === 401) {
        alert(content.message);
      }
      //store token in cookies
      Cookies.set("token", content.accessToken, {
        secure: true,
        httpOnly: true,
      });
      //store user data in local storage
      localStorage.setItem("userData", JSON.stringify(content.user), {
        secure: true,
        httpOnly: true,
      });
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
      } = content.user;
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
            <input type="password" id="password" name="password" />
            <div className={`${styles.showPass} ${styles.icon}`}>
              <AiOutlineEyeInvisible />
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
