import styles from "../styles/_AddBuilding.module.scss";
import { useState, useRef, useContext } from "react";
import MainHeader from "../components/UI/MainHeader";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiHotelLine } from "react-icons/ri";
import { BsBuildings, BsBuildingGear, BsArrowLeftCircle } from "react-icons/bs";
import { PiDoorOpenLight } from "react-icons/pi";
import { GoLocation } from "react-icons/go";
import {
  FaKaaba,
  FaBuildingUser,
  FaFileLines,
  FaRegAddressCard,
  FaBuildingShield,
} from "react-icons/fa6";
import { AiOutlineFile, AiOutlineFileProtect } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { SlUser } from "react-icons/sl";
import { IoPricetagsOutline, IoClose } from "react-icons/io5";
import { Form } from "react-router-dom";
import SelectInput from "../components/UI/SelectInput";
import RadioButton from "../components/UI/RadioButton";
import FormButton from "../components/UI/FormButton";
import StyledContainer from "../components/UI/StyledContainer";
import BuildingContext from "../store/building-context";
import background from "../assets/images/Vector.png";
import background1 from "../assets/images/Vector1.png";
import Map from "../components/UI/Map";

const firstPageInputs = [
  {
    id: "buildingName",
    type: "text",
    name: "buildingName",
    placeholder: "إسم المنشأة",
    icon: <LiaHotelSolid />,
  },
  {
    id: "buildingType",
    type: "select",
    name: "buildingType",
    placeholder: "نوع المنشأة",
    icon: <IoMdArrowDropdownCircle />,
    options: [
      { value: "فندق", label: "فندق", icon: <BsBuildings /> },
      { value: "عمارة", label: "عمارة", icon: <RiHotelLine /> },
    ],
  },
  {
    id: "roomNum",
    type: "number",
    name: "roomNum",
    placeholder: "عدد الغرف",
    icon: <PiDoorOpenLight />,
  },
  {
    id: "streetName",
    type: "text",
    name: "streetName",
    placeholder: "الشارع أو الحي",
    icon: <GoLocation />,
  },
  {
    id: "actualPilgrims",
    type: "number",
    name: "actualPilgrims",
    placeholder: "عدد الحجاج الفعلي",
    icon: <FaKaaba />,
  },
  {
    id: "writtenPilgrims",
    type: "number",
    name: "writtenPilgrims",
    placeholder: "عدد الحجاج في التصريح",
    icon: <AiOutlineFile />,
  },
  {
    id: "paperNum",
    type: "number",
    name: "paperNum",
    placeholder: "رقم التصريح",
    icon: <AiOutlineFileProtect />,
  },
  {
    id: "ownerName",
    type: "text",
    name: "ownerName",
    placeholder: "اسم المالك",
    icon: <FaBuildingUser />,
  },
  {
    id: "phone",
    type: "number",
    name: "phone",
    placeholder: "رقم الجوال",
    icon: <FiPhoneCall />,
  },
  {
    id: "licenseNum",
    type: "number",
    name: "licenseNum",
    placeholder: "رقم رخصة البناء",
    icon: <FaFileLines />,
  },
  {
    id: "floorsNum",
    type: "number",
    name: "floorsNum",
    placeholder: "عدد أدوار المبنى",
    icon: <HiOutlineBuildingOffice2 />,
  },
  {
    id: "ownerId",
    type: "number",
    name: "ownerId",
    placeholder: "رقم هوية المالك أو السجل التجاري",
    icon: <FaRegAddressCard />,
  },
  {
    id: "renterName",
    type: "text",
    name: "renterName",
    placeholder: "اسم المؤجر",
    icon: <FaRegUserCircle />,
  },
];
const radioItems = [
  {
    id: "0",
    title: "يوجد شبكة إنذار",
    radios: [
      { id: "0", name: "input1", label: "نعم" },
      { id: "1", name: "input1", label: "لا" },
    ],
  },
  {
    id: "1",
    title: "يوجد شبكة إطفاء",
    radios: [
      { id: "0", name: "input2", label: "نعم" },
      { id: "1", name: "input2", label: "لا" },
    ],
  },
  {
    id: "2",
    title: "يوجد مضخة حريق",
    radios: [
      { id: "0", name: "input3", label: "نعم" },
      { id: "1", name: "input3", label: "لا" },
    ],
  },
  {
    id: "3",
    title: "يوجد مولد كهربائي",
    radios: [
      { id: "0", name: "input4", label: "نعم" },
      { id: "1", name: "input4", label: "لا" },
    ],
  },
];
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
      { value: "صور المبنى", label: "صور المبنى" },
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
const AddBuilding = () => {
  const context = useContext(BuildingContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");
  const [tableData, setTableData] = useState([]);

  const inputHandler = ({ target: { value } }) => {
    setInput(value);
  };
  const handlePageData = () => {
    setPageNumber((prevState) => {
      return prevState + 1;
    });
  };
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const filesUploaded = e.target.files;
    if (context.attached_type !== "") {
      setTableData((prevState) => {
        return [
          ...prevState,
          { fileName: filesUploaded[0].name, type: context.attached_type },
        ];
      });
    }
    //handleFile(fileUploaded);
  };
  return (
    <div className={styles.page}>
      {/*pageNumber === 2 && (
        <>
          <img className={styles.headVector} src={background} alt="" />
          <img className={styles.bottomVector} src={background1} alt="" />
        </>
      )*/}
      <StyledContainer>
        <div className={styles.body}>
          <MainHeader text="إضافة منشأة" icon={<LiaHotelSolid />} />
          <Form className={styles.form}>
            {pageNumber === 0 && (
              <>
                <div className={styles.inputs}>
                  {firstPageInputs.map((item) => {
                    return item.type === "select" ? (
                      <SelectInput
                        key={item.id}
                        options={item.options}
                        placeholder={item.placeholder}
                        icon={item.icon}
                      />
                    ) : (
                      <div key={item.id} className={styles.input}>
                        <input
                          type={item.type}
                          id={item.id}
                          name={item.name}
                          placeholder={item.placeholder}
                        />
                        <div className={styles.icon}>{item.icon}</div>
                      </div>
                    );
                  })}
                </div>
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
                <FormButton
                  onClick={handlePageData}
                  icon={<BsArrowLeftCircle />}
                >
                  أكمل تسجيل المنشأة
                </FormButton>
              </>
            )}
            {pageNumber === 1 && (
              <>
                <div className={styles.inputs}>
                  {secondPageInputs.map((item) => {
                    return item.type === "select" ? (
                      <SelectInput
                        key={item.id}
                        options={item.options}
                        placeholder={item.placeholder}
                        icon={item.icon}
                      />
                    ) : (
                      <div key={item.id} className={styles.input}>
                        <input
                          type={item.type}
                          id={item.id}
                          name={item.name}
                          placeholder={item.placeholder}
                        />
                        <div className={styles.icon}>{item.icon}</div>
                      </div>
                    );
                  })}
                  <div className={styles.selectFile}>
                    <>
                      <button onClick={handleClick}>اختر الملف</button>
                      <input
                        type="file"
                        id="files"
                        name="files"
                        accept="image/jpg, .pdf,.docx,.doc"
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                      />
                    </>
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
                              <p className={styles.type}>{item.type}</p>
                            </div>
                            <button className={styles.delete}>
                              <IoClose />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <FormButton
                  onClick={handlePageData}
                  icon={<BsArrowLeftCircle />}
                >
                  أكمل تسجيل المنشأة
                </FormButton>
              </>
            )}
            {pageNumber === 2 && (
              <div className={styles.map}>
                <p>تحديد المنشأة على الخريطة</p>
                <div className={styles.mapItem}>
                  <Map />
                </div>
                <FormButton class={styles.save} icon={<LiaHotelSolid />}>
                  حفظ تسجيل المنشأة
                </FormButton>
              </div>
            )}
          </Form>
        </div>
      </StyledContainer>
    </div>
  );
};

export default AddBuilding;
