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
const secondPageInputs = [
  {
    id: "buildingComponents",
    type: "text",
    name: "buildingComponents",
    placeholder: "مكونات المبنى",
    icon: <LiaHotelSolid />,
  },
  {
    id: "institutionMaintenance",
    type: "text",
    name: "institutionMaintenance",
    placeholder: "المؤسسة القائمة بالصيانة",
    icon: <BsBuildingGear />,
  },
  {
    id: "institutionSafty",
    type: "text",
    name: "institutionSafty",
    placeholder: "المؤسسة القائمة بوسائل السلامة",
    icon: <FaBuildingShield />,
  },
  {
    id: "hajjPrice",
    type: "text",
    name: "hajjPrice",
    placeholder: "سعر الحاج",
    icon: <SlUser />,
  },
  {
    id: "yearsPrice",
    type: "text",
    name: "yearsPrice",
    placeholder: "سعر العام",
    icon: <IoPricetagsOutline />,
  },
  {
    id: "attachedType",
    type: "select",
    name: "attachedType",
    placeholder: "نوع المرفق",
    icon: <IoMdArrowDropdownCircle />,
    options: [
      { value: "image_bilud", label: "صور المبنى" },
      { value: "السجل التجاري", label: "السجل التجاري" },
      { value: "السجل الضريبي", label: "السجل الضريبي" },
      { value: "تصريح الحج", label: "تصريح الحج" },
    ],
  },
];
const tableHead = [
  { id: "0", text: "م" },
  { id: "1", text: "عنوان الملف" },
  { id: "2", text: "نوع المرفق" },
];
const SecondPage = () => {
  const context = useContext(BuildingContext);
  const [tableData, setTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const hiddenFileInput = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const filesUploaded = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      let fileItem = reader.result;
      const name = e.target.files[0].name;
      const fileSize = e.target.files[0].size;
      const type = e.target.files[0].type;
      if (selectedOption) {
        setTableData((prevState) => {
          return [
            ...prevState,
            {
              fileName: filesUploaded[0].name,
              label: selectedOption.label,
              type: selectedOption.value,
              fileData: {
                file_name: name,
                size: fileSize,
                mime_type: type,
                file: fileItem,
              },
            },
          ];
        });
      }
    };
  };
  const setSelectHandler = (option) => {
    setSelectedOption(option);
  };
  const formSubmitHandler = (data) => {
    const images = tableData.filter((item) => {
      return item.type === "image_bilud";
    });
    let imagesArr = [];
    if (images.length > 0) {
      imagesArr = images.map((item) => {
        return item.fileData;
      });
    }

    const files = tableData.filter((item) => {
      return item.type !== "image_bilud";
    });
    let filesArr = [];
    if (files.length > 0) {
      filesArr = files.map((item) => {
        return item.fileData;
      });
    }
    context.setFormData((prevData) => {
      return {
        ...prevData,
        bilud_component: data.buildingComponents,
        institution_maintenance: data.institutionMaintenance,
        institution_safty: data.institutionSafty,
        price_hajj: data.hajjPrice,
        price_years: data.yearsPrice,
        media: imagesArr.length > 0 ? imagesArr.slice() : [],
        attached_file: filesArr.length > 0 ? filesArr.slice() : [],
      };
    });
    context.setPage();
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
            اختر الملف
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
          <p>الملفات المسموحة: jpg, pdf, docx, doc</p>
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
                  <button type="button" className={styles.delete}>
                    <IoClose />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <FormButton type="submit" icon={<BsArrowLeftCircle />}>
        أكمل تسجيل المنشأة
      </FormButton>
    </form>
  );
};

export default SecondPage;
