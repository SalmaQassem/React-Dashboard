import styles from "../../styles/_ContractForm.module.scss";
import { Form, useActionData, useNavigate } from "react-router-dom";
import DateInput from "../UI/DateInput";
import FormButton from "../UI/FormButton";
import { SlUser } from "react-icons/sl";
import { FaRegCalendarAlt, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const ContractForm = (props) => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const data = useActionData();

  useEffect(() => {
    if (data && data.success && !isModalOpened.state) {
      setIsModalOpened(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } else {
      console.log("failed");
    }
  }, [data]);
  const inputs = [
    {
      id: "hajjPrice",
      type: "price",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
      value: props.state === "edit" ? props.inputsData.price_hajj : null,
    },
    {
      id: "startDate",
      type: "date",
      name: "startDate",
      placeholder: t("body.startDate"),
      icon: <FaRegCalendarAlt />,
      value: props.state === "edit" ? props.inputsData.start_date : null,
    },
    {
      id: "endDate",
      type: "date",
      name: "endDate",
      placeholder: t("body.endDate"),
      icon: <FaRegCalendarAlt />,
      value: props.state === "edit" ? props.inputsData.end_date : null,
    },
    {
      id: "contractDate",
      type: "date",
      name: "contractDate",
      placeholder: t("body.contractDate"),
      icon: <FaRegCalendarAlt />,
      value: props.state === "edit" ? props.inputsData.document_start : null,
    },
    {
      id: "notes",
      type: "textArea",
      name: "notes",
      placeholder: t("body.notes"),
      value: props.state === "edit" ? props.inputsData.notes : null,
    },
  ];

  return (
    <>
      <AnimatePresence>
        {isModalOpened && (
          <Modal
            head={t("body.success")}
            message={props.message}
            icon={<FaCheck />}
            state={props.state}
            setOpened={setIsModalOpened}
          />
        )}
      </AnimatePresence>

      <Form method="post" className={styles.form}>
        <div className={styles.inputs}>
          {inputs.map((item) => {
            return item.type === "textArea" ? (
              <textarea
                key={item.id}
                name={item.name}
                className={styles.textArea}
                defaultValue={item.value}
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
                    defaultValue={item.value}
                  />
                ) : (
                  <input
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    defaultValue={item.value}
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
    </>
  );
};

export default ContractForm;
