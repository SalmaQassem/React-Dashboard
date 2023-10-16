import styles from "../../styles/_ContractForm.module.scss";
import { Form } from "react-router-dom";
import DateInput from "../UI/DateInput";
import FormButton from "../UI/FormButton";
import { SlUser } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContractForm = (props) => {
  const [t, i18n] = useTranslation("global");
  const inputs = [
    {
      id: "hajjPrice",
      type: "price",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
      value: props.inputsData && props.inputsData.price_hajj,
    },
    {
      id: "startDate",
      type: "date",
      name: "startDate",
      placeholder: t("body.startDate"),
      icon: <FaRegCalendarAlt />,
      value: props.inputsData && props.inputsData.start_date,
    },
    {
      id: "endDate",
      type: "date",
      name: "endDate",
      placeholder: t("body.endDate"),
      icon: <FaRegCalendarAlt />,
      value: props.inputsData && props.inputsData.end_date,
    },
    {
      id: "contractDate",
      type: "date",
      name: "contractDate",
      placeholder: t("body.contractDate"),
      icon: <FaRegCalendarAlt />,
      value: props.inputsData && props.inputsData.document_start,
    },
    {
      id: "notes",
      type: "textArea",
      name: "notes",
      placeholder: t("body.notes"),
      value: props.inputsData && props.inputsData.notes,
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
              defaultValue={item.value && item.value}
              placeholder={item.placeholder}
            />
          ) : (
            <div
              key={item.id}
              className={
                i18n.language === "en"
                  ? `${styles.input} ${styles.en}`
                  : styles.input
              }
            >
              {item.type === "date" ? (
                <DateInput
                  placeholder={item.placeholder}
                  name={item.name}
                  defaultValue={item.value && item.value}
                />
              ) : (
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  defaultValue={item.value && item.value}
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
