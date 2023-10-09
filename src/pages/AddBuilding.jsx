import styles from "../styles/_AddBuilding.module.scss";
import { useState } from "react";
import MainHeader from "../components/UI/MainHeader";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiHotelLine } from "react-icons/ri";
import { BsBuildings } from "react-icons/bs";
import { PiDoorOpenLight } from "react-icons/pi";
import { GoLocation } from "react-icons/go";
import {
  FaKaaba,
  FaBuildingUser,
  FaFileLines,
  FaRegAddressCard,
} from "react-icons/fa6";
import { AiOutlineFile, AiOutlineFileProtect } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";
import { Form } from "react-router-dom";
import SelectInput from "../components/UI/SelectInput";
import RadioButton from "../components/UI/RadioButton";
import FormButton from "../components/UI/FormButton";
import StyledContainer from "../components/UI/StyledContainer";

const inputs = [
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
const AddBuilding = () => {
  const [input, setInput] = useState("");
  const inputHandler = ({ target: { value } }) => {
    setInput(value);
  };
  return (
    <StyledContainer>
      <MainHeader text="إضافة منشأة" icon={<LiaHotelSolid />} />
      <Form className={styles.form}>
        <div className={styles.inputs}>
          {inputs.map((item) => {
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
        <FormButton>أكمل تسجيل المنشأة</FormButton>
      </Form>
    </StyledContainer>
  );
};

export default AddBuilding;
