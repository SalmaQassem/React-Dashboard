import styles from "../../styles/_AuthForm.module.scss";
import logo from "../../assets/images/logo.png";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const submitFormHandler = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
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
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div className={styles.input}>
          <label htmlFor="email">البريد الإلكتروني</label>
          <input type="email" id="email" name="email" />
          <div className={styles.icon}>
            <HiOutlineMail />
          </div>
        </div>
        <div className={styles.input}>
          <label htmlFor="password">كلمة المرور</label>
          <input type="password" id="password" name="password" />
          <div className={`${styles.showPass} ${styles.icon}`}>
            <AiOutlineEyeInvisible />
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
      </form>
    </div>
  );
};

export default AuthForm;
