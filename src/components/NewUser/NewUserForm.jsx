import styles from "../../styles/_NewUserForm.module.scss";
import { useState } from "react";
import RadioButton from "../UI/RadioButton";
import { Form } from "react-router-dom";
import FormButton from "../UI/FormButton";

const radioItems = [
  {
    id: "0",
    title: "نوع المستخدم",
    radios: [
      { id: "0", name: "input1", label: "أدمن" },
      { id: "1", name: "input1", label: "مشرف" },
      { id: "2", name: "input1", label: "مدخل بيانات" },
    ],
  },
];
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
    id: "password",
    type: "password",
    name: "password",
    label: "إدخال كلمة السر",
  },
  {
    id: "phone",
    type: "number",
    name: "phone",
    label: "الجوال",
  },
  {
    id: "confirmPassword",
    type: "password",
    name: "confirmPassword",
    label: "تأكيد كلمة السر",
  },
];
const NewUserForm = () => {
  const [input, setInput] = useState("");
  const inputHandler = ({ target: { value } }) => {
    setInput(value);
  };
  const handleSubmit = () => {};
  return (
    <div className={styles.addUser}>
      <Form className={styles.form}>
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
                        onChange={inputHandler}
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
        <FormButton class={styles.submit} onClick={handleSubmit}>
          تفعيل المستخدم
        </FormButton>
      </Form>
    </div>
  );
};

export default NewUserForm;
