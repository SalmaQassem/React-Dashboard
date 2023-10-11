import { Form } from "react-router-dom";
import styles from "../styles/_Contract.module.scss";
import StyledContainer from "../components/UI/StyledContainer";
import logo from "../assets/images/logo.png";
import image from "../assets/images/Frame.png";
import { SlUser } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import FormButton from "../components/UI/FormButton";
import DateInput from "../components/UI/DateInput";
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

const Contract = () => {
  return (
    <StyledContainer>
      <div className={styles.contract}>
        <div className={styles.head}>
          <h1>نموذج تعاقد</h1>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.image}>
            <img src={image} alt="frame" />
          </div>
          <Form className={styles.form}>
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
                      <DateInput placeholder={item.placeholder}/>
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
            <FormButton class={styles.button}>تصدير العقد</FormButton>
          </Form>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Contract;
