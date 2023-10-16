import styles from "../../styles/_SecondPage.module.scss";
import { useForm } from "react-hook-form";
import SelectInput from "../UI/SelectInput";
import FormButton from "../UI/FormButton";
import { useState, useContext, useRef } from "react";
import BuildingContext from "../../store/building-context";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { BsBuildingGear, BsArrowLeftCircle } from "react-icons/bs";
import { FaBuildingShield } from "react-icons/fa6";
import { SlUser } from "react-icons/sl";
import { IoPricetagsOutline, IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const SecondPage = () => {
  const [t, i18n] = useTranslation("global");
  const context = useContext(BuildingContext);
  const [tableData, setTableData] = useState([]);
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
    },
    {
      id: "institutionMaintenance",
      type: "text",
      name: "institutionMaintenance",
      placeholder: t("body.institutionMaintenance"),
      icon: <BsBuildingGear />,
    },
    {
      id: "institutionSafty",
      type: "text",
      name: "institutionSafty",
      placeholder: t("body.institutionSafety"),
      icon: <FaBuildingShield />,
    },
    {
      id: "hajjPrice",
      type: "text",
      name: "hajjPrice",
      placeholder: t("body.hajjPrice"),
      icon: <SlUser />,
    },
    {
      id: "yearsPrice",
      type: "text",
      name: "yearsPrice",
      placeholder: t("body.yearPrice"),
      icon: <IoPricetagsOutline />,
    },
    {
      id: "attachedType",
      type: "select",
      name: "attachedType",
      placeholder: t("body.attachmentType"),
      icon: <IoMdArrowDropdownCircle />,
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
  const handleChange = (e) => {
    const filesUploaded = e.target.files[0];
    if (selectedOption) {
      setTableData((prevState) => {
        return [
          ...prevState,
          {
            fileName: filesUploaded.name,
            label: selectedOption.label,
            type: selectedOption.value,
            fileData: filesUploaded,
          },
        ];
      });
    }
    /*const reader = new FileReader();
    reader.readAsDataURL(filesUploaded);
    reader.onload = () => {
      if (selectedOption) {
        setTableData((prevState) => {
          return [
            ...prevState,
            {
              fileName: filesUploaded.name,
              label: selectedOption.label,
              type: selectedOption.value,
              fileData: reader.result,
            },
          ];
        });
      }
    };*/
  };
  const setSelectHandler = (option) => {
    setSelectedOption(option);
  };
  const formSubmitHandler = (data) => {
    /*const images = tableData.filter((item) => {
      return item.type === "image_bilud";
    });
    let imagesArr = [];
    if (images.length > 0) {
      imagesArr = images.map((item) => {
        return item.fileData;
      });
    }
    //console.log(imagesArr);
    const files = tableData.filter((item) => {
      return item.type !== "image_bilud";
    });

    let filesArr = [];
    if (files.length > 0) {
      filesArr = files.map((item) => {
        return item.fileData;
      });
    }*/
    const mediaData =
      tableData.length > 0
        ? tableData.map((item) => {
            return item.fileData;
          })
        : [];

    context.setFormData((prevData) => {
      return {
        ...prevData,
        bilud_component: data.buildingComponents,
        institution_maintenance: data.institutionMaintenance,
        institution_safty: data.institutionSafty,
        price_hajj: data.hajjPrice,
        price_years: data.yearsPrice,
        media: mediaData.slice(),
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
              <input
                type={item.type}
                id={item.id}
                {...register(item.name)}
                placeholder={item.placeholder}
              />
              <div className={styles.icon}>{item.icon}</div>
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
            accept=".jpg,.pdf,.docx,.doc"
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
      <FormButton type="submit" icon={<BsArrowLeftCircle />}>
        {t("body.continue")}
      </FormButton>
    </form>
  );
};

export default SecondPage;
