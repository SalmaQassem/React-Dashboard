import styles from "../../styles/_NewUserForm.module.scss";
import { useState, useRef } from "react";
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

const NewUserForm = (props) => {
  const [t, i18n] = useTranslation("global");
  const [input, setInput] = useState({});
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState({
    state: false,
    first: 0,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const radioItems = [
    {
      id: "0",
      title: t("body.userType"),
      radios: [
        { id: "super_admin", name: "input1", label: t("body.adminRole") },
        { id: "supervisor", name: "input1", label: t("body.supervisor") },
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
  const inputHandler = ({ target: { value, name } }) => {
    setInput({ title: name, data: value });
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  /*const dataURLtoFile = (dataUrl, fileName) => {
    let arr = dataUrl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };*/
  /*async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }*/
  const handleChange = async (e) => {
    setImage(e.target.files[0]);
  };
  const formSubmitHandler = async (data) => {
    const userToken = getAuthToken();
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role", input.data);
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
      //console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
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
                <input type={item.type} id={item.id} {...register(item.name)} />
                {item.error && item.error}
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
          {t("body.activateUser")}
        </FormButton>
      </form>
    </>
  );
};

export default NewUserForm;
