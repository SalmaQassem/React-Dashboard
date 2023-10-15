import styles from "../../styles/_ContractForm.module.scss";
import { Form } from "react-router-dom";
import DateInput from "../UI/DateInput";
import FormButton from "../UI/FormButton";
import { SlUser } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContractForm = () => {
  const [t, i18n] = useTranslation("global");
  const inputs = [
    {
      id: "hajjPrice",
      type: "text",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
    },
    {
      id: "startDate",
      type: "date",
      name: "startDate",
      placeholder: t("body.startDate"),
      icon: <FaRegCalendarAlt />,
    },
    {
      id: "endDate",
      type: "date",
      name: "endDate",
      placeholder: t("body.endDate"),
      icon: <FaRegCalendarAlt />,
    },
    {
      id: "contractDate",
      type: "date",
      name: "contractDate",
      placeholder: t("body.contractDate"),
      icon: <FaRegCalendarAlt />,
    },
    {
      id: "notes",
      type: "textArea",
      name: "notes",
      placeholder: t("body.notes"),
    },
  ];
  return (
    <Form method="post" className={styles.form}>
      <div className={styles.inputs}>
        {inputs.map((item) => {
          return item.type === "textArea" ? (
            <textarea
              key={item.id}
              name={item.name}
              className={styles.textArea}
              placeholder={item.placeholder}
            />
          ) : (
            <div key={item.id} className={styles.input}>
              {item.type === "date" ? (
                <DateInput placeholder={item.placeholder} name={item.name} />
              ) : (
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  placeholder={item.placeholder}
                />
              )}
              <div className={styles.icon}>{item.icon}</div>
            </div>
          );
        })}
      </div>
      <FormButton type="submit" class={styles.button}>
        {t("body.generateContract")}
      </FormButton>
    </Form>
  );
};
export default ContractForm;
