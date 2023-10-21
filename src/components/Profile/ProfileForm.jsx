import styles from "../../styles/_ProfileForm.module.scss";
import { Form, useActionData } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { TbCloudUpload } from "react-icons/tb";
import FormButton from "../UI/FormButton";
import { useTranslation } from "react-i18next";
import UserContext from "../../store/user-context";
const ProfileForm = (props) => {
  const context = useContext(UserContext);
  const [t, i18n] = useTranslation("global");
  const data = useActionData();
  const oldData = props.userData;
  const hiddenFileInput = useRef(null);
  const inputs = [
    {
      id: "first_name",
      type: "text",
      name: "firstName",
      label: t("body.firstName"),
    },
    {
      id: "last_name",
      type: "text",
      name: "lastName",
      label: t("body.lastName"),
    },
    {
      id: "email",
      type: "email",
      name: "email",
      label: t("body.email"),
    },
    {
      id: "phone",
      type: "number",
      name: "phone",
      label: t("body.phone"),
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: t("body.changePassword"),
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      label: t("body.retypePassword"),
    },
  ];

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const imageUploaded = e.target.files;
    console.log(imageUploaded);
  };
  useEffect(() => {
    if (data && !data.message) {
      const {
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at,
        image,
      } = data;
      context.setUserData(
        id,
        first_name,
        last_name,
        phone,
        email,
        role,
        created_at,
        updated_at,
        image
      );
      sessionStorage.setItem("userData", JSON.stringify(data));
      //alert("success");
    } else {
      console.log("error");
    }
  }, [data]);

  return (
    <div className={styles.profile}>
      <Form method="post" className={styles.form}>
        <div className={styles.inputs}>
          {inputs.map((item) => {
            return (
              <div key={item.id} className={styles.input}>
                <label htmlFor={item.id} className={styles.label}>
                  {item.label}
                </label>
                <input
                  type={item.type}
                  id={item.id}
                  defaultValue={
                    item.id !== "password" ? oldData[`${item.id}`] : ""
                  }
                  name={item.name}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.image}>
          <p>{t("body.uploadImage")}</p>
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
        <FormButton class={styles.submit} type="submit">
          {t("body.saveChanges")}
        </FormButton>
      </Form>
    </div>
  );
};

export default ProfileForm;
