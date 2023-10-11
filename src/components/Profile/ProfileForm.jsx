import styles from "../../styles/_ProfileForm.module.scss";
import { Form } from "react-router-dom";
import { useRef } from "react";
import { TbCloudUpload } from "react-icons/tb";
import FormButton from "../UI/FormButton";
const inputs = [
  {
    id: "firstName",
    type: "text",
    name: "firstName",
    label: "الإسم الأول",
  },
  {
    id: "lastName",
    type: "text",
    name: "lastName",
    label: "اسم العائلة",
  },
  {
    id: "email",
    type: "email",
    name: "email",
    label: "البريد الإلكتروني",
  },
  {
    id: "phone",
    type: "number",
    name: "phone",
    label: "الجوال",
  },
  {
    id: "password",
    type: "password",
    name: "password",
    label: "تغيير كلمة السر",
  },
  {
    id: "confirmPassword",
    type: "password",
    name: "confirmPassword",
    label: "أعد كلمة السر",
  },
];

const ProfileForm = () => {
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const imageUploaded = e.target.files;
    //console.log(imageUploaded);
  };
  return (
    <div className={styles.profile}>
      <Form className={styles.form}>
        <div className={styles.inputs}>
          {inputs.map((item) => {
            return (
              <div key={item.id} className={styles.input}>
                <label htmlFor={item.id} className={styles.label}>
                  {item.label}
                </label>
                <input type={item.type} id={item.id} name={item.name} />
              </div>
            );
          })}
        </div>
        <div className={styles.image}>
          <p>رجاء رفع شعار المنشأة أو الصورة الشخصية</p>
          <div className={styles.selectFile}>
            <div className={styles.uploadImg} onClick={handleClick}>
              <TbCloudUpload />
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <FormButton class={styles.submit}>حفظ التغييرات</FormButton>
      </Form>
    </div>
  );
};

export default ProfileForm;
