import styles from "../../styles/_NewUserForm.module.scss";
import { useEffect } from "react";
import RadioButton from "../UI/RadioButton";
import { Form, useActionData } from "react-router-dom";
import FormButton from "../UI/FormButton";
import { useTranslation } from "react-i18next";

const NewUserForm = () => {
  const data = useActionData();
  const [t, i18n] = useTranslation("global");
  const radioItems = [
    {
      id: "0",
      title: t("body.userType"),
      radios: [
        { id: "super_admin", name: "input1", label: t("body.adminRole") },
        { id: "1", name: "input1", label: "مشرف" },
        { id: "writer", name: "input1", label: t("body.writer") },
      ],
    },
  ];
  const inputs = [
    {
      id: "firstName",
      type: "text",
      name: "firstName",
      label: t("body.firstName"),
    },
    {
      id: "lastName",
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
      id: "password",
      type: "password",
      name: "password",
      label: t("body.password"),
    },
    {
      id: "phone",
      type: "number",
      name: "phone",
      label: t("body.phone"),
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      label: t("body.confirmPassword"),
    },
  ];
  useEffect(() => {
    if (data && !data.message) {
      alert(data.success);
    } else {
      console.log("error");
    }
  }, [data]);
  return (
    <div className={styles.addUser}>
      <Form method="post" className={styles.form}>
        <div className={styles.radioButtons}>
          {radioItems.map((item) => {
            return (
              <div key={item.id} className={styles.radioButton}>
                <p className={styles.title}>{item.title}</p>
                <div className={styles.content}>
                  {item.radios.map((radio) => {
                    return (
                      <RadioButton
                        key={radio.id}
                        name={radio.name}
                        icon="false"
                        value={radio.id}
                        label={radio.label}
                        //onChange={inputHandler}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
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
        <FormButton class={styles.submit} type="submit">
          {t("body.activateUser")}
        </FormButton>
      </Form>
    </div>
  );
};

export default NewUserForm;
