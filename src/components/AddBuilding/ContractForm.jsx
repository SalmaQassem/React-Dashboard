import styles from "../../styles/_ContractForm.module.scss";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "../UI/DateTimePicker";
import FormButton from "../UI/FormButton";
import { SlUser } from "react-icons/sl";
import { FaRegCalendarAlt, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { FiAlertTriangle } from "react-icons/fi";

const ContractForm = (props) => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const schema = yup.object({
    hajjPrice: yup
      .number()
      .typeError(t("body.required"))
      .required(t("body.required")),
    startDate: yup.string().required(t("body.required")),
    endDate: yup.string().required(t("body.required")),
    contractDate: yup.string().required(t("body.required")),
    notes: yup.string().required(t("body.required")),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: props.state === "edit" ? props.inputsData.start_date : null,
      endDate: props.state === "edit" ? props.inputsData.end_date : null,
      contractDate:
        props.state === "edit" ? props.inputsData.document_start : null,
    },
  });
  const inputs = [
    {
      id: 0,
      type: "price",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
      value: props.state === "edit" ? props.inputsData.price_hajj : null,
      error: errors.hajjPrice,
    },
    {
      id: 1,
      type: "date",
      name: "startDate",
      placeholder: t("body.startDate"),
      icon: <FaRegCalendarAlt />,
      error: errors.startDate,
    },
    {
      id: 2,
      type: "date",
      name: "endDate",
      placeholder: t("body.endDate"),
      icon: <FaRegCalendarAlt />,
      error: errors.endDate,
    },
    {
      id: 3,
      type: "date",
      name: "contractDate",
      placeholder: t("body.contractDate"),
      icon: <FaRegCalendarAlt />,
      error: errors.contractDate,
    },
    {
      id: 4,
      type: "textArea",
      name: "notes",
      placeholder: t("body.notes"),
      value: props.state === "edit" ? props.inputsData.notes : null,
      error: errors.notes,
    },
  ];
  const formSubmitHandler = async (formData) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const offset = new Date().getTimezoneOffset();

      const startDate = new Date(
        Date.parse(formData.startDate) - offset * 60 * 1000
      )
        .toISOString()
        .replace("T", " ")
        .split(".")[0];

      const endDate = new Date(
        Date.parse(formData.endDate) - offset * 60 * 1000
      )
        .toISOString()
        .replace("T", " ")
        .split(".")[0];
      const documentStart = new Date(
        Date.parse(formData.contractDate) - offset * 60 * 1000
      )
        .toISOString()
        .replace("T", " ")
        .split(".")[0];

      const enteredData = {
        user_id:
          props.state === "edit" ? props.inputsData.user_id : props.user_id,
        house_id:
          props.state === "edit" ? props.inputsData.houseId : props.house_id,
        price_hajj: formData.hajjPrice,
        start_date: startDate,
        end_date: endDate,
        document_start: documentStart,
        notes: formData.notes,
      };
      const userToken = getAuthToken();
      try {
        const response = await axios.post(
          props.url,
          JSON.stringify(enteredData),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const res = await response.data;
        setIsSubmitting(false);
        if (res.success) {
          setIsModalOpened(true);
          if (props.state === "edit") {
            setTimeout(() => {
              navigate("/dashboard/Contracts");
            }, 500);
          } else {
            setTimeout(() => {
              navigate(`/dashboard/Houses/${props.house_id}`);
            }, 500);
          }
        }
      } catch (error) {
        setIsSubmitting(false);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
  };

  const itemClass =
    i18n.language === "en"
      ? `${styles.inputItem} ${styles.en}`
      : styles.inputItem;

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
      {isError && (
        <AnimatePresence>
          <Modal
            head={t("body.error")}
            message={t("body.contractError")}
            icon={<FiAlertTriangle />}
            state="error"
          />
        </AnimatePresence>
      )}
      <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
        <div className={styles.inputs}>
          {inputs.map((item) => {
            return (
              <div className={styles.input} key={item.id}>
                {item.type === "textArea" ? (
                  <textarea
                    name={item.name}
                    className={
                      item.error
                        ? `${styles.textArea} ${styles.invalid}`
                        : styles.textArea
                    }
                    defaultValue={item.value}
                    {...register(item.name)}
                    placeholder={item.placeholder}
                  />
                ) : (
                  <div
                    className={
                      item.error ? `${itemClass} ${styles.invalid}` : itemClass
                    }
                  >
                    {item.type === "date" ? (
                      <Controller
                        name={item.name}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <DateTimePicker
                            placeholder={item.placeholder}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    ) : (
                      <>
                        <input
                          type={item.type}
                          id={item.id}
                          className={
                            item.error
                              ? `${styles.inputField} ${styles.invalid}`
                              : styles.inputField
                          }
                          name={item.name}
                          defaultValue={item.value}
                          {...register(item.name)}
                          placeholder={item.placeholder}
                        />
                        <div className={styles.icon}>{item.icon}</div>
                      </>
                    )}
                  </div>
                )}
                {item.error && (
                  <span className={styles.feedback}>{item.error?.message}</span>
                )}
              </div>
            );
          })}
        </div>
        <FormButton type="submit" class={styles.button}>
          {isSubmitting
            ? `${t("body.submitting")}...`
            : t("body.generateContract")}
        </FormButton>
      </form>
    </>
  );
};

export default ContractForm;
