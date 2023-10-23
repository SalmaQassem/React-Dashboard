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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SecondPage = (props) => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  const [tableData, setTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  /*const setSelected = (value) => {
    setSelectedOption(value);
  };*/
  const hiddenFileInput = useRef();
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
    /*attachedType: yup
      .object()
      .shape({
        label: yup.string().required(t("body.required")),
        value: yup.string().required(t("body.required")),
      })
      .required(t("body.required")),*/
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //const { ref, ...rest } = register("files");
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
  const handleChange = (e) => {
    //console.log(selectedOption);
    //console.log(e.target.files[0]);
    const filesUploaded = e.target.files[0];
    if (selectedOption && filesUploaded) {
      console.log("enter");
      setTableData((prevState) => {
        return [
          ...prevState,
          {
            fileName: filesUploaded.name,
            label: selectedOption,
            type: selectedOption,
            file: filesUploaded,
          },
        ];
      });
      /*const reader = new FileReader();
      reader.addEventListener("load", () => {
        const ret = dataURLtoFile(
          e.target.result,
          filesUploaded.name + `.${filesUploaded.type.split("/")[1]}`
        );
        setImages((prevImages) => {
          return [...prevImages, ret];
        });
      });
      reader.readAsDataURL(filesUploaded);*/
    }
  };
  const setSelectHandler = (option) => {
    //console.log(option);
    setSelectedOption(option);
  };
  const formSubmitHandler = (data) => {
    //console.log(context);
    //console.log(data.attachedType.value);
    const files = tableData.map((item) => {
      return item.file;
    });
    console.log(files);
    /*let uploadedFiles = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        const image = e.target.result;
        uploadedFiles.append(image);
        //console.log(uploadedFiles);
      });
    });*/
    //console.log(files);
    //console.log(data);
    context.setFormData((prevData) => {
      return {
        ...prevData,
        bilud_component: data.buildingComponents,
        institution_maintenance: data.institutionMaintenance,
        institution_safty: data.institutionSafty,
        price_hajj: data.hajjPrice,
        price_years: data.yearsPrice,
        media: files.slice(),
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
    console.log(selectedOption);
  }, [selectedOption]);
  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className={styles.form}
      /*encType="multipart/form-data"*/
    >
      <div className={styles.inputs}>
        {secondPageInputs.map((item) => {
          return item.type === "select" ? (
            <div key={item.id} className={styles.selectItem}>
              <SelectInput
                key={item.id}
                name={item.name}
                isError={item.error}
                control={control}
                options={item.options}
                placeholder={item.placeholder}
                icon={item.icon}
                selectedItem={selectedOption}
                setSelect={setSelectHandler}
                //onChange={setSelectHandler}
              />
              {/*item.error?.message ||
                (item.error?.label.message && (
                  <span className={styles.feedback}>
                    {item.error?.message || item.error?.label.message}
                  </span>
                ))*/}
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
        <div>
          <div className={styles.selectFile}>
            <button
              type="button"
              className={styles.filesButton}
              onClick={handleClick}
            >
              {t("body.chooseFile")}
            </button>
            <input
              type="file"
              id="files"
              ref={hiddenFileInput}
              //{...rest}
              accept=".jpg,.png,.pdf,.docx,.doc"
              style={{ display: "none" }}
            />
            <p>{t("body.acceptedFormats")}: jpg, pdf, docx, doc</p>
          </div>
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
{
  /*<div>
              <label className={styles.filesButton} htmlFor="files">
                {t("body.chooseFile")}
                <input
                  //{...register("files", { onChange: { handleChange } })}
                  onChange={handleChange}
                  type="file"
                  id="files"
                  hidden
                />
              </label>
      </div>*/
}
{
  /*errors.files && (
            <span className={styles.feedback}>{errors.files?.message}</span>
          )*/
}
