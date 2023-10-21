import styles from "../../styles/_NewUserForm.module.scss";
import { useEffect, useState, useRef } from "react";
import RadioButton from "../UI/RadioButton";
import { Form, useActionData } from "react-router-dom";
import FormButton from "../UI/FormButton";
import { TbCloudUpload } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useForm } from "@inertiajs/inertia-react";

const NewUserForm = () => {
  const data = useActionData();
  //const { images } = usePage().props;
  const { setData } = useForm({
    image: null,
  });
  //console.log(data);
  //const [showModal, setShowModal] = useState(false);
  const [firstNameErorr, setFirstNameError] = useState(null);
  const [t, i18n] = useTranslation("global");
  const hiddenFileInput = useRef(null);
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
      error: firstNameErorr && <span>{firstNameErorr}</span>,
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
  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }
  const handleChange = async (e) => {
    let image = "";
    const imageUploaded = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      image = e.target.result;
      sessionStorage.setItem("image", image);
      //console.log(image);
    });
    reader.readAsDataURL(imageUploaded);
    //console.log(imageUploaded);
    /*await getBase64(imageUploaded)
      .then((res) => sessionStorage.setItem("image", res))
      .catch((err) => console.log(err));*/
    /*const image = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      sessionStorage.setItem("image", reader.result);
    });

    if (image) {
      reader.readAsDataURL(image);
    }*/
  };
  useEffect(() => {
    if (data && !data.message) {
      //setShowModal(true);
      console.log(data);
    } else {
      if (data && data.errors) {
        console.log(data.errors);
        /*if (data.errors.first_name) {
          if (i18n.language === "ar") {
            setFirstNameError(data.errors.first_name.ar);
          } else {
            setFirstNameError(data.errors.first_name.en);
          }
        }*/
      }
    }
  }, [data]);
  return (
    <Form method="post" className={styles.form} enctype="multipart/form-data">
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
                      //onChange={inputHandler}
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
    </Form>
  );
};

export default NewUserForm;
