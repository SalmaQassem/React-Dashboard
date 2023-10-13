import styles from "../../styles/_ContractForm.module.scss";
import { Form } from "react-router-dom";
import DateInput from "../UI/DateInput";
import FormButton from "../UI/FormButton";
import { SlUser } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";

const inputs = [
  {
    id: "hajjPrice",
    type: "text",
    name: "hajjPrice",
    placeholder: "سعر الحاج",
    icon: <SlUser />,
  },
  {
    id: "startDate",
    type: "date",
    name: "startDate",
    placeholder: "تاريخ البدء",
    icon: <FaRegCalendarAlt />,
  },
  {
    id: "endDate",
    type: "date",
    name: "endDate",
    placeholder: "تاريخ الإنتهاء",
    icon: <FaRegCalendarAlt />,
  },
  {
    id: "contractDate",
    type: "date",
    name: "contractDate",
    placeholder: "تاريخ العقد",
    icon: <FaRegCalendarAlt />,
  },
  {
    id: "notes",
    type: "textArea",
    name: "notes",
    placeholder: "ملاحظات",
  },
];
const ContractForm = () => {
  return (
    <Form method="post" className={styles.form}>
      <div className={styles.inputs}>
        {inputs.map((item) => {
          return item.type === "textArea" ? (
            <textarea
              key={item.id}
              className={styles.textArea}
              placeholder={item.placeholder}
            />
          ) : (
            <div key={item.id} className={styles.input}>
              {item.type === "date" ? (
                <DateInput placeholder={item.placeholder} />
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
        تصدير العقد
      </FormButton>
    </Form>
  );
};
export default ContractForm;
