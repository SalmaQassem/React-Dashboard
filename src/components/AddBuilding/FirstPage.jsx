import styles from "../../styles/_FirstPage.module.scss";
import { useForm, Controller } from "react-hook-form";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const FirstPage = (props) => {
  const context = useContext(BuildingContext);
  const [t, i18n] = useTranslation("global");
  const [input, setInput] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const schema = yup.object(
    {
      buildingName: yup.string().required(t("body.required")),
      /*buildingType: yup
        .mixed()
        .required()
        .oneOf(["hotel", "build"])
        .label(t("body.required")),*/
      /*buildingType: yup.object({
        value: yup
          .string()
          .required(t("body.required"))
          .oneOf(["hotel", "build"]),
      }),*/
      //buildingType: yup.string().required().oneOf(["hotel", "build"]),
      roomNum: yup.number().typeError(t("body.required")).required(),
      streetName: yup.string().required(t("body.required")),
      actualPilgrims: yup.number().typeError(t("body.required")).required(),
      writtenPilgrims: yup.number().typeError(t("body.required")).required(),
      paperNum: yup
        .number()
        .typeError(t("body.required"))
        .required()
        .test(
          "len",
          `${t("body.permitNum")} ${t("body.buildingNameCase")} ${t(
            "body.numsss"
          )}`,
          (val) => val.toString().length >= 3
        ),
      ownerName: yup
        .string()
        .required(t("body.required"))
        .min(
          6,
          `${t("body.ownerName")} ${t("body.buildingNameCase")} ${t(
            "body.chars"
          )}`
        ),
      phone: yup
        .string()
        .required(t("body.required"))
        .min(
          10,
          `${t("body.phone")} ${t("body.buildingNameCase")} ${t("body.nums")}`
        ),
      licenseNum: yup
        .number()
        .typeError(t("body.required"))
        .required()
        .test(
          "len",
          `${t("body.constructionLicense")} ${t("body.buildingNameCase")} ${t(
            "body.numss"
          )}`,
          (val) => val.toString().length >= 15
        ),
      floorsNum: yup.number().typeError(t("body.required")).required(),
      ownerId: yup
        .number()
        .typeError(t("body.required"))
        .required()
        .test(
          "len",
          `${t("body.ownerId")} ${t("body.buildingNameCase")} ${t(
            "body.numss"
          )}`,
          (val) => val.toString().length >= 15
        ),
      renterName: yup
        .string()
        .required(t("body.required"))
        .min(
          6,
          `${t("body.lessorName")} ${t("body.buildingNameCase")} ${t(
            "body.chars"
          )}`
        ),
    },
    { abortEarly: false }
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const firstPageInputs = [
    {
      id: "buildingName",
      type: "text",
      name: "buildingName",
      placeholder: t("body.buildingName"),
      icon: <LiaHotelSolid />,
      value: props.state === "edit" ? props.firstPageData.house_name : null,
      error: errors.buildingName,
      /*error:
        errors.buildingName && errors.buildingName.type === "required"
          ? t("body.required")
          : errors.buildingName &&
            errors.buildingName.type === "min" &&
            `${t("body.buildingName")} ${t("body.buildingNameCase")} ${t(
              "body.chars"
            )}`,*/
    },
    {
      id: "buildingType",
      type: "select",
      name: "buildingType",
      placeholder: t("body.buildingType"),
      icon: <IoMdArrowDropdownCircle />,
      value: props.state === "edit" ? props.firstPageData.type : null,
      error: errors["buildingType"]?.message,
      //error: errors.buildingType,
      /*error: errors.buildingName && t("body.required"),*/
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
      value: props.state === "edit" ? props.firstPageData.total_room : null,
      error: errors.roomNum,
      //error: errors.roomNum && t("body.required"),
    },
    {
      id: "streetName",
      type: "text",
      name: "streetName",
      placeholder: t("body.street"),
      icon: <GoLocation />,
      value: props.state === "edit" ? props.firstPageData.street : null,
      error: errors.streetName,
      //error: errors.streetName && t("body.required"),
    },
    {
      id: "actualPilgrims",
      type: "number",
      name: "actualPilgrims",
      placeholder: t("body.hajjajNum"),
      icon: <FaKaaba />,
      value: props.state === "edit" ? props.firstPageData.hajjaj_count : null,
      error: errors.actualPilgrims,
      //error: errors.actualPilgrims && t("body.required"),
    },
    {
      id: "writtenPilgrims",
      type: "number",
      name: "writtenPilgrims",
      placeholder: t("body.hajjajInPermit"),
      icon: <AiOutlineFile />,
      value: props.state === "edit" ? props.firstPageData.hajjaj_accsept : null,
      error: errors.writtenPilgrims,
      //error: errors.writtenPilgrims && t("body.required"),
    },
    {
      id: "paperNum",
      type: "number",
      name: "paperNum",
      placeholder: t("body.permitNum"),
      icon: <AiOutlineFileProtect />,
      value: props.state === "edit" ? props.firstPageData.number_prrmit : null,
      error: errors.paperNum,
      /*error:
        errors.paperNum && errors.paperNum.type === "required"
          ? t("body.required")
          : errors.paperNum &&
            errors.paperNum.type === "min" &&
            `${t("body.permitNum")} ${t("body.buildingNameCase")} ${t(
              "body.numsss"
            )}`,*/
    },
    {
      id: "ownerName",
      type: "text",
      name: "ownerName",
      placeholder: t("body.ownerName"),
      icon: <FaBuildingUser />,
      value:
        props.state === "edit" ? props.firstPageData.house_owner_name : null,
      error: errors.ownerName,
      /*error:
        errors.ownerName && errors.ownerName.type === "required"
          ? t("body.required")
          : errors.ownerName &&
            errors.ownerName.type === "minLength" &&
            `${t("body.ownerName")} ${t("body.buildingNameCase")} ${t(
              "body.chars"
            )}`,*/
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      placeholder: t("body.phone"),
      icon: <FiPhoneCall />,
      value: props.state === "edit" ? props.firstPageData.phone : null,
      error: errors.phone,
      /*error:
        errors.phone && errors.phone.type === "required"
          ? t("body.required")
          : errors.phone &&
            errors.phone.type === "minLength" &&
            `${t("body.phone")} ${t("body.buildingNameCase")} ${t(
              "body.nums"
            )}`,*/
    },
    {
      id: "licenseNum",
      type: "number",
      name: "licenseNum",
      placeholder: t("body.constructionLicense"),
      icon: <FaFileLines />,
      value:
        props.state === "edit" ? props.firstPageData.build_number_prrmit : null,
      error: errors.licenseNum,
      /*error:
        errors.licenseNum && errors.licenseNum.type === "required"
          ? t("body.required")
          : errors.licenseNum &&
            errors.licenseNum.type === "minLength" &&
            `${t("body.constructionLicense")} ${t("body.buildingNameCase")} ${t(
              "body.numss"
            )}`,*/
    },
    {
      id: "floorsNum",
      type: "number",
      name: "floorsNum",
      placeholder: t("body.buildingFloors"),
      icon: <HiOutlineBuildingOffice2 />,
      value: props.state === "edit" ? props.firstPageData.total_floor : null,
      error: errors.floorsNum,
      //cases: { required: true },
      /*error:
        errors.floorsNum &&
        errors.floorsNum.type === "required" &&
        t("body.required"),*/
    },
    {
      id: "ownerId",
      type: "number",
      name: "ownerId",
      placeholder: t("body.ownerId"),
      icon: <FaRegAddressCard />,
      value: props.state === "edit" ? props.firstPageData.owner_ip : null,
      error: errors.ownerId,
      /*error:
        errors.ownerId && errors.ownerId.type === "required"
          ? t("body.required")
          : errors.ownerId &&
            errors.ownerId.type === "minLength" &&
            `${t("body.ownerId")} ${t("body.buildingNameCase")} ${t(
              "body.numss"
            )}`,*/
    },
    {
      id: "renterName",
      type: "text",
      name: "renterName",
      placeholder: t("body.lessorName"),
      icon: <FaRegUserCircle />,
      value: props.state === "edit" ? props.firstPageData.lessor_name : null,
      error: errors.renterName,
      /*error:
        errors.renterName && errors.renterName.type === "required"
          ? t("body.required")
          : errors.renterName &&
            errors.renterName.type === "minLength" &&
            `${t("body.lessorName")} ${t("body.buildingNameCase")} ${t(
              "body.nums"
            )}`,*/
    },
  ];
  const radioItems = [
    {
      id: "0",
      title: t("body.alarmNetwork"),
      value: props.state === "edit" ? props.firstPageData.alarm_network : null,
      radios: [
        { id: "yes", name: "alarm_network", label: t("body.yes") },
        { id: "no", name: "alarm_network", label: t("body.no") },
      ],
    },
    {
      id: "1",
      title: t("body.fireNetwork"),
      value: props.state === "edit" ? props.firstPageData.fire_network : null,
      radios: [
        { id: "yes", name: "fire_network", label: t("body.yes") },
        { id: "no", name: "fire_network", label: t("body.no") },
      ],
    },
    {
      id: "2",
      title: t("body.firePump"),
      value: props.state === "edit" ? props.firstPageData.fire_pump : null,
      radios: [
        { id: "yes", name: "fire_pump", label: t("body.yes") },
        { id: "no", name: "fire_pump", label: t("body.no") },
      ],
    },
    {
      id: "3",
      title: t("body.generator"),
      value: props.state === "edit" ? props.firstPageData.generator : null,
      radios: [
        { id: "yes", name: "generator", label: t("body.yes") },
        { id: "no", name: "generator", label: t("body.no") },
      ],
    },
  ];

  const setSelectHandler = (option) => {
    //console.log(option);
    setSelectedOption(option);
  };
  const inputHandler = ({ target: { value, name } }) => {
    setInput((prevState) => {
      return [...prevState, { title: name, data: value }];
    });
  };
  const formSubmitHandler = (data) => {
    let alarm = props.state === "edit" ? props.firstPageData.alarm_network : "";
    let fire = props.state === "edit" ? props.firstPageData.fire_network : "";
    let pump = props.state === "edit" ? props.firstPageData.fire_pump : "";
    let generator = props.state === "edit" ? props.firstPageData.generator : "";
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
    context.setPage((prevNum) => {
      return prevNum + 1;
    });
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
      <div className={styles.inputs}>
        {firstPageInputs.map((item) => {
          return item.type === "select" ? (
            <div key={item.id} className={styles.selectItem}>
              <Controller
                name={item.name}
                control={control}
                render={({ onChange, value }) => (
                  <SelectInput
                    isError={item.error ? true : false}
                    //selected={selectedOption}
                    value={item.options.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    options={item.options}
                    //value={item.options.find((c) => c.value === value)}
                    selectHandler={setSelectHandler}
                    //selectHandler={(val) => onChange(val.value)}
                    placeholder={item.placeholder}
                    icon={item.icon}
                  />
                )}
              ></Controller>
              {item.error && (
                <span className={styles.feedback}>{item.error}</span>
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
                  defaultValue={item.value && item.value}
                  className={
                    item.error
                      ? `${styles.inputField} ${styles.invalid}`
                      : styles.inputField
                  }
                  placeholder={item.placeholder}
                  {...register(item.name)}
                />
                <div className={styles.icon}>{item.icon}</div>
              </div>
              {item.error && (
                <span className={styles.feedback}>{item.error?.message}</span>
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
                      checked={item.value === radio.id}
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
