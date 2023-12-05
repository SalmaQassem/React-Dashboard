import styles from "../../styles/_NewUserForm.module.scss";
import { useState, useEffect } from "react";
import RadioButton from "../UI/RadioButton";
import FormButton from "../UI/FormButton";
import { TbCloudUpload } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import Modal from "../UI/Modal";
import { AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const NewUserForm = (props) => {
  const [t, i18n] = useTranslation("global");
  const [radioInput, setRadioInput] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState({
    state: false,
    first: 0,
  });
  const schema = yup.object().shape({
    firstName: yup.string().required(t("body.required")),
    lastName: yup.string().required(t("body.required")),
    email: yup
      .string()
      .required(t("body.required"))
      .email(t("body.emailValidation"))
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        t("body.emailValidation")
      ),

    password: yup.string().required(t("body.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("body.passwordMatch"))
      .required(t("body.required")),
    phone: yup
      .string()
      .required(t("body.required"))
      .min(
        7,
        `${t("body.phone")} ${t("body.buildingNameCase")} ${t("body.nums")}`
      ),
    input1: yup.string().required(t("body.required")),

    userImage: yup
      .mixed()
      .test("file", t("body.required"), (value) => {
        if (value.length > 0) {
          return true;
        }
        return false;
      })
      .test("type", t("body.imageType"), (value) => {
        if (
          value.length > 0 &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/jpg" ||
            value[0].type === "image/png")
        ) {
          return true;
        }
        return false;
      }),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const watchedValue = watch("input1");
  const watchedImage = watch("userImage");

  const radioItems = [
    {
      id: "0",
      title: t("body.userType"),
      error: errors.input1,
      radios: [
        { id: "super_admin", name: "input1", label: t("body.adminRole") },
        { id: "admin", name: "input1", label: t("body.supervisor") },
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
      error: errors.firstName,
    },
    {
      id: "lastName",
      type: "text",
      name: "lastName",
      label: t("body.lastName"),
      error: errors.lastName,
    },
    {
      id: "email",
      type: "email",
      name: "email",
      label: t("body.email"),
      error: errors.email,
    },
    {
      id: "phone",
      type: "string",
      name: "phone",
      label: t("body.phone"),
      error: errors.phone,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: t("body.password"),
      error: errors.password,
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      label: t("body.confirmPassword"),
      error: errors.confirmPassword,
    },
  ];
  const formSubmitHandler = async (data) => {
    const userToken = getAuthToken();
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role", radioInput);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://zadapp.mqawilk.com/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const data = await response.data;
      if (data.success) {
        setIsModalOpened((prevState) => {
          return { ...prevState, state: true };
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (watchedValue) {
      setRadioInput(watchedValue);
    }
  }, [watchedValue]);
  useEffect(() => {
    if (watchedImage) {
      if (watchedImage.length > 0) {
        setImage(watchedImage[0]);
      }
    }
  }, [watchedImage]);
  return (
    <>
      <AnimatePresence>
        {isModalOpened.state && (
          /*isModalOpened.first === 0 &&*/ <Modal
            head={t("body.success")}
            message={t("body.newUserSuccess")}
            buttonText={t("body.close")}
            icon={<FaCheck />}
            state={props.state}
            setOpened={setIsModalOpened}
          />
        )}
      </AnimatePresence>
      <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
        <div className={styles.radioButtons}>
          {radioItems.map((item) => {
            return (
              <div key={item.id} className={styles.radioButton}>
                <p className={styles.title}>{item.title}</p>
                <div className={styles.content} id={item.radios[0].name}>
                  {item.radios.map((radio) => {
                    return (
                      <RadioButton
                        key={radio.id}
                        radioName={radio.name}
                        register={register}
                        icon="false"
                        value={radio.id}
                        label={radio.label}
                        checked={item.value === radio.id}
                      />
                    );
                  })}
                </div>
                {item.error && (
                  <span className={styles.feedback}>{item.error.message}</span>
                )}
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
                <input
                  type={item.type}
                  id={item.id}
                  className={
                    item.error
                      ? `${styles.inputItem} ${styles.invalid}`
                      : styles.inputItem
                  }
                  {...register(item.name)}
                />
                {item.error && (
                  <span className={styles.feedback}>{item.error?.message}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.image}>
          <p>{t("body.uploadImage")}</p>
          <div className={styles.selectFile}>
            <div className={styles.uploadImg}>
              <TbCloudUpload />
              <label htmlFor="userImage" className={styles.imageLabel}>
                <input
                  type="file"
                  id="userImage"
                  accept="image/*"
                  {...register("userImage")}
                />
              </label>
            </div>
          </div>
          {errors.userImage && (
            <span className={styles.feedback}>{errors.userImage.message}</span>
          )}
        </div>
        <FormButton class={styles.submit} type="submit">
          {t("body.activateUser")}
        </FormButton>
      </form>
    </>
  );
};

export default NewUserForm;
