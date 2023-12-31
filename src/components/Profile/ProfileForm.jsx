import styles from "../../styles/_ProfileForm.module.scss";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import FormButton from "../UI/FormButton";
import { useTranslation } from "react-i18next";
import UserContext from "../../store/user-context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAuthToken } from "../../util/auth";
import { AnimatePresence } from "framer-motion";
import Modal from "../UI/Modal";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FiAlertTriangle } from "react-icons/fi";

const ProfileForm = (props) => {
  const oldData = props.userData;
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    `https://zadapp.mqawilk.com/public/images/${oldData.image}`
  );
  const [isModalOpened, setIsModalOpened] = useState(false);
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
    phone: yup
      .string()
      .required(t("body.required"))
      .min(
        7,
        `${t("body.phone")} ${t("body.buildingNameCase")} ${t("body.nums")}`
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("body.passwordMatch")),
    image: yup.mixed().test("type", t("body.imageType"), (value) => {
      if (
        !uploadedImage ||
        (value.length > 0 &&
          (value[0].type === "image/jpeg" ||
            value[0].type === "image/jpg" ||
            value[0].type === "image/png"))
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
  const watchedImage = watch("image");

  const inputs = [
    {
      id: "first_name",
      type: "text",
      name: "firstName",
      label: t("body.firstName"),
      error: errors.firstName,
    },
    {
      id: "last_name",
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
      type: "text",
      name: "phone",
      label: t("body.phone"),
      error: errors.phone,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      label: t("body.changePassword"),
      error: errors.password,
    },
    {
      id: "confirmPassword",
      type: "password",
      name: "confirmPassword",
      label: t("body.retypePassword"),
      error: errors.confirmPassword,
    },
  ];

  const formSubmitHandler = async (data) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const formData = new FormData();
      const pass = data.password === "" ? oldData.password : data.password;
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", pass);
      formData.append("image", uploadedImage);

      const userToken = getAuthToken();
      try {
        const response = await axios.post(
          "https://zadapp.mqawilk.com/api/profile/update",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const data = await response.data;
        setIsSubmitting(false);
        if (data && data.success) {
          setIsModalOpened((prevState) => {
            return { ...prevState, state: true };
          });
          console.log(data.user);
          const {
            id,
            first_name,
            last_name,
            phone,
            email,
            role,
            created_at,
            updated_at,
            password,
            image,
          } = data.user;
          context.setUserData(
            id,
            first_name,
            last_name,
            phone,
            email,
            role,
            created_at,
            updated_at,
            password,
            image
          );
          Cookies.set("userData", JSON.stringify(data.user));
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        setIsSubmitting(false);
        setIsSubmitting(false);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (watchedImage) {
      if (watchedImage.length > 0) {
        if (
          watchedImage[0].type === "image/jpeg" ||
          watchedImage[0].type === "image/jpg" ||
          watchedImage[0].type === "image/png"
        ) {
          var reader = new FileReader();
          reader.onload = function () {
            const url = reader.result;
            setImageError(false);
            setImageSrc(url);
            setUploadedImage(watchedImage[0]);
          };
          reader.readAsDataURL(watchedImage[0]);
        } else {
          setImageError(true);
        }
      }
    }
  }, [watchedImage]);

  return (
    <>
      <AnimatePresence>
        {isModalOpened && (
          <Modal
            head={t("body.success")}
            message={t("body.editUserSuccess")}
            buttonText={t("body.close")}
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
            message={t("body.editProfileError")}
            icon={<FiAlertTriangle />}
            state="error"
          />
        </AnimatePresence>
      )}
      <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
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
                  className={styles.inputItem}
                  {...register(item.name)}
                  defaultValue={
                    item.id !== "password" ? oldData[`${item.id}`] : ""
                  }
                />
                {item.error && (
                  <span className={styles.feedback}>{item.error?.message}</span>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.image}>
          <p>{t("body.profileImage")}</p>
          <div className={styles.selectFile}>
            <div className={styles.uploadImg}>
              <img src={imageSrc} alt="profile-img" loading="lazy" />
              <label htmlFor="image" className={styles.imageLabel}>
                <p>{t("body.edit")}</p>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  {...register("image")}
                />
              </label>
            </div>
          </div>
          {(imageError || errors.image) &&
            (imageError ? (
              <span className={styles.feedback}>{t("body.imageType")}</span>
            ) : (
              <span className={styles.feedback}>{errors.image.message}</span>
            ))}
        </div>
        <FormButton class={styles.submit} type="submit">
          {isSubmitting ? `${t("body.submitting")}...` : t("body.saveChanges")}
        </FormButton>
      </form>
    </>
  );
};

export default ProfileForm;
