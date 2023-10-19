import styles from "../../styles/_SecondPage.module.scss";
import { useForm } from "react-hook-form";
import SelectInput from "../UI/SelectInput";
import FormButton from "../UI/FormButton";
import { useState, useContext, useRef, useEffect } from "react";
import BuildingContext from "../../store/building-context";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import {
  BsBuildingGear,
  BsArrowLeftCircle,
  BsArrowRightCircle,
} from "react-icons/bs";
import { FaBuildingShield } from "react-icons/fa6";
import { SlUser } from "react-icons/sl";
import { IoPricetagsOutline, IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SecondPage = () => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  const [tableData, setTableData] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const hiddenFileInput = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const secondPageInputs = [
    {
      id: "buildingComponents",
      type: "text",
      name: "buildingComponents",
      placeholder: t("body.buildingComponents"),
      icon: <LiaHotelSolid />,
      cases: { required: true },
      error:
        errors.buildingComponents &&
        errors.buildingComponents.type === "required" &&
        t("body.required"),
    },
    {
      id: "institutionMaintenance",
      type: "text",
      name: "institutionMaintenance",
      placeholder: t("body.institutionMaintenance"),
      icon: <BsBuildingGear />,
      cases: { required: true },
      error:
        errors.institutionMaintenance &&
        errors.institutionMaintenance.type === "required" &&
        t("body.required"),
    },
    {
      id: "institutionSafty",
      type: "text",
      name: "institutionSafty",
      placeholder: t("body.institutionSafety"),
      icon: <FaBuildingShield />,
      cases: { required: true },
      error:
        errors.institutionSafty &&
        errors.institutionSafty.type === "required" &&
        t("body.required"),
    },
    {
      id: "hajjPrice",
      type: "text",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
      cases: { required: true },
      error:
        errors.hajjPrice &&
        errors.hajjPrice.type === "required" &&
        t("body.required"),
    },
    {
      id: "yearsPrice",
      type: "text",
      name: "yearsPrice",
      placeholder: t("body.yearPrice"),
      icon: <IoPricetagsOutline />,
      cases: { required: true },
      error:
        errors.yearsPrice &&
        errors.yearsPrice.type === "required" &&
        t("body.required"),
    },
    {
      id: "attachedType",
      type: "select",
      name: "attachedType",
      placeholder: t("body.attachmentType"),
      icon: <IoMdArrowDropdownCircle />,
      cases: { required: true },
      error: errors.attachedType && t("body.required"),
      options: [
        { value: "image_bilud", label: t("body.buildingImages") },
        { value: "السجل التجاري", label: t("body.commercialRegistration") },
        { value: "السجل الضريبي", label: t("body.taxRegistration") },
        { value: "تصريح الحج", label: t("body.hajjPermit") },
      ],
    },
  ];
  const tableHead = [
    { id: "0", text: "م" },
    { id: "1", text: t("body.fileName") },
    { id: "2", text: t("body.attachmentType") },
  ];
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const dataURLtoFile = (dataUrl, fileName) => {
    let arr = dataUrl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };
  const handleChange = (e) => {
    const filesUploaded = e.target.files[0];
    if (selectedOption && filesUploaded) {
      setTableData((prevState) => {
        return [
          ...prevState,
          {
            fileName: filesUploaded.name,
            label: selectedOption.label,
            type: selectedOption.value,
          },
        ];
      });

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const ret = dataURLtoFile(
          reader.result,
          filesUploaded.name + `.${filesUploaded.type.split("/")[1]}`
        );
        setImages((prevImages) => {
          return [...prevImages, ret];
        });
      });
      reader.readAsDataURL(filesUploaded);
    }
  };
  const setSelectHandler = (option) => {
    setSelectedOption(option);
  };
  const formSubmitHandler = (data) => {
    context.setFormData((prevData) => {
      return {
        ...prevData,
        bilud_component: data.buildingComponents,
        institution_maintenance: data.institutionMaintenance,
        institution_safty: data.institutionSafty,
        price_hajj: data.hajjPrice,
        price_years: data.yearsPrice,
        media: images.slice(),
      };
    });
    context.setPage();
  };
  const deleteHandler = (e) => {
    const deleteIndex = e.currentTarget.id;

    setTableData((prevState) => {
      const newArr = prevState.filter((item) => {
        return item !== prevState[deleteIndex];
      });
      return newArr;
    });
  };
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
      <div className={styles.inputs}>
        {secondPageInputs.map((item) => {
          return item.type === "select" ? (
            <SelectInput
              key={item.id}
              selected={selectedOption}
              selectHandler={setSelectHandler}
              options={item.options}
              placeholder={item.placeholder}
              icon={item.icon}
            />
          ) : (
            <div key={item.id} className={styles.input}>
              <div
                className={
                  item.error
                    ? `${styles.inputItem} ${styles.invalid}`
                    : styles.inputItem
                }
              >
                <input
                  type={item.type}
                  id={item.id}
                  className={
                    item.error
                      ? `${styles.inputField} ${styles.invalid}`
                      : styles.inputField
                  }
                  {...register(item.name, item.cases)}
                  placeholder={item.placeholder}
                />
                <div className={styles.icon}>{item.icon}</div>
              </div>
              {item.error && (
                <span className={styles.feedback}>{item.error}</span>
              )}
            </div>
          );
        })}
        <div className={styles.selectFile}>
          <button type="button" onClick={handleClick}>
            {t("body.chooseFile")}
          </button>
          <input
            type="file"
            id="files"
            name="files"
            accept=".jpg,.png,.pdf,.docx,.doc"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          <p>{t("body.acceptedFormats")}: jpg, pdf, docx, doc</p>
        </div>
      </div>
      {tableData.length > 0 && (
        <div className={styles.table}>
          <div className={styles.head}>
            {tableHead.map((item) => {
              return <p key={item.id}>{item.text}</p>;
            })}
          </div>
          <div className={styles.tableBody}>
            {tableData.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  <div className={styles.tableData}>
                    <p className={styles.num}>{index + 1}</p>
                    <p className={styles.name}>{item.fileName}</p>
                    <p className={styles.type}>{item.label}</p>
                  </div>
                  <button
                    type="button"
                    id={index}
                    className={styles.delete}
                    onClick={deleteHandler}
                  >
                    <IoClose />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <FormButton
        type="submit"
        class={i18n.language === "en" && styles.en}
        icon={
          i18n.language === "ar" ? (
            <BsArrowLeftCircle />
          ) : (
            <BsArrowRightCircle />
          )
        }
      >
        {t("body.continue")}
      </FormButton>
    </form>
  );
};

export default SecondPage;
