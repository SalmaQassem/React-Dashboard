import styles from "../../styles/_FirstPage.module.scss";
import { useForm } from "react-hook-form";
import SelectInput from "../UI/SelectInput";
import RadioButton from "../UI/RadioButton";
import FormButton from "../UI/FormButton";
import { useContext } from "react";
import BuildingContext from "../../store/building-context";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RiHotelLine } from "react-icons/ri";
import { PiDoorOpenLight } from "react-icons/pi";
import { GoLocation } from "react-icons/go";
import { BsBuildings, BsArrowLeftCircle } from "react-icons/bs";
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
import { useState } from "react";
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
      { value: "hotel", label: "فندق", icon: <BsBuildings /> },
      { value: "build", label: "عمارة", icon: <RiHotelLine /> },
    ],
  },
  {
    id: "roomNum",
    type: "text",
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
    type: "text",
    name: "actualPilgrims",
    placeholder: "عدد الحجاج الفعلي",
    icon: <FaKaaba />,
  },
  {
    id: "writtenPilgrims",
    type: "text",
    name: "writtenPilgrims",
    placeholder: "عدد الحجاج في التصريح",
    icon: <AiOutlineFile />,
  },
  {
    id: "paperNum",
    type: "text",
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
    type: "text",
    name: "phone",
    placeholder: "رقم الجوال",
    icon: <FiPhoneCall />,
  },
  {
    id: "licenseNum",
    type: "text",
    name: "licenseNum",
    placeholder: "رقم رخصة البناء",
    icon: <FaFileLines />,
  },
  {
    id: "floorsNum",
    type: "text",
    name: "floorsNum",
    placeholder: "عدد أدوار المبنى",
    icon: <HiOutlineBuildingOffice2 />,
  },
  {
    id: "ownerId",
    type: "text",
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
      { id: "yes", name: "alarm_network", label: "نعم" },
      { id: "no", name: "alarm_network", label: "لا" },
    ],
  },
  {
    id: "1",
    title: "يوجد شبكة إطفاء",
    radios: [
      { id: "yes", name: "fire_network", label: "نعم" },
      { id: "no", name: "fire_network", label: "لا" },
    ],
  },
  {
    id: "2",
    title: "يوجد مضخة حريق",
    radios: [
      { id: "yes", name: "fire_pump", label: "نعم" },
      { id: "no", name: "fire_pump", label: "لا" },
    ],
  },
  {
    id: "3",
    title: "يوجد مولد كهربائي",
    radios: [
      { id: "yes", name: "generator", label: "نعم" },
      { id: "no", name: "generator", label: "لا" },
    ],
  },
];
const FirstPage = () => {
  const context = useContext(BuildingContext);
  const [input, setInput] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setSelectHandler = (option) => {
    setSelectedOption(option);
  };
  const inputHandler = ({ target: { value, name } }) => {
    setInput((prevState) => {
      return [...prevState, { title: name, data: value }];
    });
  };
  const formSubmitHandler = (data) => {
    let alarm = "";
    let fire = "";
    let pump = "";
    let generator = "";
    const select = selectedOption ? selectedOption.value : "";
    let filter = input.filter((item) => {
      return item.title === "alarm_network";
    });
    if (filter.length > 0) {
      alarm = filter[0].data;
    }

    filter = input.filter((item) => {
      return item.title === "fire_network";
    });
    if (filter.length > 0) {
      fire = filter[0].data;
    }

    filter = input.filter((item) => {
      return item.title === "fire_pump";
    });
    if (filter.length > 0) {
      pump = filter[0].data;
    }

    filter = input.filter((item) => {
      return item.title === "generator";
    });
    if (filter.length > 0) {
      generator = filter[0].data;
    }

    context.setFormData((prevData) => {
      return {
        ...prevData,
        house_name: data.buildingName,
        type: select,
        total_room: data.roomNum,
        street: data.streetName,
        hajjaj_count: data.actualPilgrims,
        hajjaj_accsept: data.writtenPilgrims,
        number_prrmit: data.paperNum,
        house_owner_name: data.ownerName,
        phone: data.phone,
        build_number_prrmit: data.licenseNum,
        total_floor: data.floorsNum,
        owner_ip: data.ownerId,
        lessor_name: data.renterName,
        alarm_network: alarm,
        fire_network: fire,
        fire_pump: pump,
        generator: generator,
      };
    });
    context.setPage();
  };
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
      <div className={styles.inputs}>
        {firstPageInputs.map((item) => {
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
                      icon="true"
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
      <FormButton type="submit" icon={<BsArrowLeftCircle />}>
        أكمل تسجيل المنشأة
      </FormButton>
    </form>
  );
};

export default FirstPage;
