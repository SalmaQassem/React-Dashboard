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
import {
  BsBuildings,
  BsArrowLeftCircle,
  BsArrowRightCircle,
} from "react-icons/bs";
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
import { useTranslation } from "react-i18next";

const FirstPage = () => {
  const context = useContext(BuildingContext);
  const [t, i18n] = useTranslation("global");
  const [input, setInput] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const firstPageInputs = [
    {
      id: "buildingName",
      type: "text",
      name: "buildingName",
      placeholder: t("body.buildingName"),
      icon: <LiaHotelSolid />,
      cases: { required: true, minLength: 6 },
      error:
        errors.buildingName && errors.buildingName.type === "required"
          ? t("body.required")
          : errors.buildingName &&
            errors.buildingName.type === "minLength" &&
            `${t("buildingName")} ${t("body.buildingNameCase")} ${t(
              "body.chars"
            )}`,
    },
    {
      id: "buildingType",
      type: "select",
      name: "buildingType",
      placeholder: t("body.buildingType"),
      icon: <IoMdArrowDropdownCircle />,
      error: errors.buildingName && t("body.required"),
      options: [
        { value: "hotel", label: t("body.hotel"), icon: <BsBuildings /> },
        { value: "build", label: t("body.building"), icon: <RiHotelLine /> },
      ],
    },
    {
      id: "roomNum",
      type: "number",
      name: "roomNum",
      placeholder: t("body.roomsNum"),
      icon: <PiDoorOpenLight />,
      cases: { required: true },
      error:
        errors.roomNum &&
        errors.roomNum.type === "required" &&
        t("body.required"),
    },
    {
      id: "streetName",
      type: "text",
      name: "streetName",
      placeholder: t("body.street"),
      icon: <GoLocation />,
      cases: { required: true },
      error:
        errors.streetName &&
        errors.streetName.type === "required" &&
        t("body.required"),
    },
    {
      id: "actualPilgrims",
      type: "number",
      name: "actualPilgrims",
      placeholder: t("body.hajjajNum"),
      icon: <FaKaaba />,
      cases: { required: true },
      error:
        errors.actualPilgrims &&
        errors.actualPilgrims.type === "required" &&
        t("body.required"),
    },
    {
      id: "writtenPilgrims",
      type: "number",
      name: "writtenPilgrims",
      placeholder: t("body.hajjajInPermit"),
      icon: <AiOutlineFile />,
      cases: { required: true },
      error:
        errors.writtenPilgrims &&
        errors.writtenPilgrims.type === "required" &&
        t("body.required"),
    },
    {
      id: "paperNum",
      type: "number",
      name: "paperNum",
      placeholder: t("body.permitNum"),
      icon: <AiOutlineFileProtect />,
      cases: { required: true, minLength: 10 },
      error:
        errors.paperNum && errors.paperNum.type === "required"
          ? t("body.required")
          : errors.paperNum &&
            errors.paperNum.type === "minLength" &&
            `${t("body.permitNum")} ${t("body.buildingNameCase")} ${t(
              "body.nums"
            )}`,
    },
    {
      id: "ownerName",
      type: "text",
      name: "ownerName",
      placeholder: t("body.ownerName"),
      icon: <FaBuildingUser />,
      cases: { required: true, minLength: 6 },
      error:
        errors.ownerName && errors.ownerName.type === "required"
          ? t("body.required")
          : errors.ownerName &&
            errors.ownerName.type === "minLength" &&
            `${t("ownerName")} ${t("body.buildingNameCase")} ${t(
              "body.chars"
            )}`,
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      placeholder: t("body.phone"),
      icon: <FiPhoneCall />,
      cases: { required: true, minLength: 10 },
      error:
        errors.phone && errors.phone.type === "required"
          ? t("body.required")
          : errors.phone &&
            errors.phone.type === "minLength" &&
            `${t("body.phone")} ${t("body.buildingNameCase")} ${t(
              "body.chars"
            )}`,
    },
    {
      id: "licenseNum",
      type: "number",
      name: "licenseNum",
      placeholder: t("body.constructionLicense"),
      icon: <FaFileLines />,
      cases: { required: true, minLength: 15 },
      error:
        errors.licenseNum && errors.licenseNum.type === "required"
          ? t("body.required")
          : errors.licenseNum &&
            errors.licenseNum.type === "minLength" &&
            `${t("body.constructionLicense")} ${t("body.buildingNameCase")} ${t(
              "body.numss"
            )}`,
    },
    {
      id: "floorsNum",
      type: "number",
      name: "floorsNum",
      placeholder: t("body.buildingFloors"),
      icon: <HiOutlineBuildingOffice2 />,
      cases: { required: true },
      error:
        errors.floorsNum &&
        errors.floorsNum.type === "required" &&
        t("body.required"),
    },
    {
      id: "ownerId",
      type: "number",
      name: "ownerId",
      placeholder: t("body.ownerId"),
      icon: <FaRegAddressCard />,
      cases: { required: true, minLength: 15 },
      error:
        errors.ownerId && errors.ownerId.type === "required"
          ? t("body.required")
          : errors.ownerId &&
            errors.ownerId.type === "minLength" &&
            `${t("body.ownerId")} ${t("body.buildingNameCase")} ${t(
              "body.numss"
            )}`,
    },
    {
      id: "renterName",
      type: "text",
      name: "renterName",
      placeholder: t("body.lessorName"),
      icon: <FaRegUserCircle />,
      cases: { required: true, minLength: 6 },
      error:
        errors.renterName && errors.renterName.type === "required"
          ? t("body.required")
          : errors.renterName &&
            errors.renterName.type === "minLength" &&
            `${t("body.lessorName")} ${t("body.buildingNameCase")} ${t(
              "body.nums"
            )}`,
    },
  ];
  const radioItems = [
    {
      id: "0",
      title: t("body.alarmNetwork"),
      radios: [
        { id: "yes", name: "alarm_network", label: t("body.yes") },
        { id: "no", name: "alarm_network", label: t("body.no") },
      ],
    },
    {
      id: "1",
      title: t("body.fireNetwork"),
      radios: [
        { id: "yes", name: "fire_network", label: t("body.yes") },
        { id: "no", name: "fire_network", label: t("body.no") },
      ],
    },
    {
      id: "2",
      title: t("body.firePump"),
      radios: [
        { id: "yes", name: "fire_pump", label: t("body.yes") },
        { id: "no", name: "fire_pump", label: t("body.no") },
      ],
    },
    {
      id: "3",
      title: t("body.generator"),
      radios: [
        { id: "yes", name: "generator", label: t("body.yes") },
        { id: "no", name: "generator", label: t("body.no") },
      ],
    },
  ];

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
    console.log(context);
    context.setPage();
  };
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
      <div className={styles.inputs}>
        {firstPageInputs.map((item) => {
          return item.type === "select" ? (
            <div key={item.id}>
              <SelectInput
                selected={selectedOption}
                name={item.name}
                //register={{ ...register(item.name) }}
                selectHandler={setSelectHandler}
                options={item.options}
                placeholder={item.placeholder}
                icon={item.icon}
              />
              {/*<span className={styles.feedback}>{item.error}</span>*/}
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
                  placeholder={item.placeholder}
                  {...register(item.name, item.cases)}
                />
                <div className={styles.icon}>{item.icon}</div>
              </div>
              {item.error && (
                <span className={styles.feedback}>{item.error}</span>
              )}
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

export default FirstPage;
