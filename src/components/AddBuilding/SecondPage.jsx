import styles from "../../styles/_SecondPage.module.scss";
import { useForm } from "react-hook-form";
import SelectInput from "../UI/SelectInput";
import FormButton from "../UI/FormButton";
import { useState, useContext, useEffect } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SecondPage = (props) => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  const [fileError, setFileError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const schema = yup.object({
    buildingComponents: yup.string().required(t("body.required")),
    institutionMaintenance: yup.string().required(t("body.required")),
    institutionSafty: yup.string().required(t("body.required")),
    hajjPrice: yup
      .number()
      .typeError(t("body.required"))
      .required(t("body.required")),
    yearsPrice: yup
      .number()
      .typeError(t("body.required"))
      .required(t("body.required")),
    filesInput:
      props.state !== "edit" &&
      yup
        .mixed()
        .test("file", t("body.required"), (value) => {
          if (value.length > 0) {
            return true;
          }
          return false;
        })
        .test("type", t("body.filesType"), (value) => {
          if (
            value.length > 0 &&
            (value[0].type === "application/pdf" ||
              value[0].type === "application/docx" ||
              value[0].type === "application/doc" ||
              value[0].type === "image/jpg" ||
              value[0].type === "image/jpeg" ||
              value[0].type === "image/png")
          ) {
            return true;
          }
          return false;
        }),
    attachedType:
      props.state !== "edit" &&
      yup
        .object()
        .shape({
          label: yup.string().required(t("body.required")),
          value: yup.string().required(t("body.required")),
        })
        .required(t("body.required")),
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const secondPageInputs = [
    {
      id: "buildingComponents",
      type: "text",
      name: "buildingComponents",
      placeholder: t("body.buildingComponents"),
      icon: <LiaHotelSolid />,
      value:
        props.state === "edit" ? props.secondPageData.bilud_component : null,
      error: errors.buildingComponents,
    },
    {
      id: "institutionMaintenance",
      type: "text",
      name: "institutionMaintenance",
      placeholder: t("body.institutionMaintenance"),
      icon: <BsBuildingGear />,
      value:
        props.state === "edit"
          ? props.secondPageData.institution_maintenance
          : null,
      error: errors.institutionMaintenance,
    },
    {
      id: "institutionSafty",
      type: "text",
      name: "institutionSafty",
      placeholder: t("body.institutionSafety"),
      icon: <FaBuildingShield />,
      value:
        props.state === "edit" ? props.secondPageData.institution_safty : null,
      error: errors.institutionSafty,
    },
    {
      id: "hajjPrice",
      type: "number",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
      value: props.state === "edit" ? props.secondPageData.price_hajj : null,
      error: errors.hajjPrice,
    },
    {
      id: "yearsPrice",
      type: "text",
      name: "yearsPrice",
      placeholder: t("body.yearPrice"),
      icon: <IoPricetagsOutline />,
      value: props.state === "edit" ? props.secondPageData.price_years : null,
      error: errors.yearsPrice,
    },
    {
      id: "attachedType",
      type: "select",
      name: "attachedType",
      placeholder: t("body.attachmentType"),
      icon: <IoMdArrowDropdownCircle />,
      error: errors.attachedType,
      options: [
        { value: "image_bilud", label: t("body.buildingImages") },
        {
          value: "commercial_registration",
          label: t("body.commercialRegistration"),
        },
        { value: "tax_registration", label: t("body.taxRegistration") },
        { value: "hajj_permit", label: t("body.hajjPermit") },
      ],
    },
  ];
  const tableHead = [
    { id: "0", text: t("body.tableIndex") },
    { id: "1", text: t("body.fileName") },
    { id: "2", text: t("body.attachmentType") },
    { id: "3", text: "" },
  ];
  const selectValue = watch("attachedType");
  const watchedFiles = watch("filesInput");

  const formSubmitHandler = (data) => {
    const files = tableData.map((item) => {
      return item.file;
    });
    context.setFormData((prevData) => {
      return {
        ...prevData,
        bilud_component: data.buildingComponents,
        institution_maintenance: data.institutionMaintenance,
        institution_safty: data.institutionSafty,
        price_hajj: data.hajjPrice,
        price_years: data.yearsPrice,
        media:
          props.state === "edit"
            ? props.secondPageData.media.slice()
            : files.slice(),
      };
    });
    context.setPage((prevNum) => {
      return prevNum + 1;
    });
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
  useEffect(() => {
    if (selectValue) {
      setSelectedOption(selectValue);
    }
  }, [selectValue]);

  useEffect(() => {
    if (watchedFiles) {
      const { length, ...files } = watchedFiles;
      if (length > 0) {
        setSelectedImages(files);
      }
    }
  }, [watchedFiles]);

  useEffect(() => {
    if (selectedOption && Object.keys(selectedImages).length > 0) {
      for (let key in Object.keys(selectedImages)) {
        if (
          selectedImages[key].type === "application/pdf" ||
          selectedImages[key].type === "application/docx" ||
          selectedImages[key].type === "application/doc" ||
          selectedImages[key].type === "image/jpg" ||
          selectedImages[key].type === "image/jpeg" ||
          selectedImages[key].type === "image/png"
        ) {
          setFileError(false);
          setTableData((prevState) => {
            return [
              ...prevState,
              {
                fileName: selectedImages[key].name,
                label: selectedOption.label,
                type: selectedOption.value,
                file: selectedImages[key],
              },
            ];
          });
          setSelectedImages([]);
        } else {
          setFileError(true);
          break;
        }
      }
    }
  }, [selectedImages, selectedOption]);

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
      <div className={styles.inputs}>
        {secondPageInputs.map((item) => {
          return item.type === "select" ? (
            <div key={item.id} className={styles.selectItem}>
              <SelectInput
                selectName={item.name}
                options={item.options}
                placeholder={item.placeholder}
                icon={item.icon}
                control={control}
                isError={item.error}
              />
              {item.error !== undefined && (
                <span className={styles.feedback}>
                  {item.error?.message || item.error?.label.message}
                </span>
              )}
            </div>
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
                  defaultValue={item.value && item.value}
                  {...register(item.name)}
                  placeholder={item.placeholder}
                />
                <div className={styles.icon}>{item.icon}</div>
              </div>
              {item.error && (
                <span className={styles.feedback}>{item.error?.message}</span>
              )}
            </div>
          );
        })}
        <>
          <div className={styles.selectFile}>
            <label htmlFor="files" className={styles.filesButton}>
              {t("body.chooseFile")}
              <input
                type="file"
                multiple
                id="files"
                {...register("filesInput")}
                accept=".jpg,.png,.pdf,.docx,.doc"
              />
            </label>
            <p>{t("body.acceptedFormats")}: jpg, pdf, docx, doc</p>
          </div>
          {fileError && !errors.filesInput && (
            <span className={styles.feedback}>{t("body.filesType")}</span>
          )}
          {errors.filesInput && (
            <span className={styles.feedback}>{errors.filesInput.message}</span>
          )}
        </>
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
                  <p className={styles.num}>{index + 1}</p>
                  <p className={styles.name}>{item.fileName}</p>
                  <p className={styles.type}>{item.label}</p>
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
