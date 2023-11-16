import styles from "../../styles/_FirstPage.module.scss";
import { useForm } from "react-hook-form";
import SelectInput from "../UI/SelectInput";
import RadioButton from "../UI/RadioButton";
import FormButton from "../UI/FormButton";
import { useContext, useEffect } from "react";
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
  const [alarm, setAlarm] = useState(null);
  const [fireNetwork, setFireNetwork] = useState(null);
  const [firePump, setFirePump] = useState(null);
  const [generator, setGenerator] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const schema = yup.object(
    {
      buildingName: yup.string().required(t("body.required")),
      buildingType: yup
        .object()
        .shape({
          label: yup.string().required(t("body.required")),
          value: yup.string().required(t("body.required")),
        })
        .required(t("body.required")),
      roomNum: yup
        .number()
        .typeError(t("body.required"))
        .required(t("body.required")),
      streetName: yup.string().required(t("body.required")),
      actualPilgrims: yup
        .number()
        .typeError(t("body.required"))
        .required(t("body.required")),
      writtenPilgrims: yup
        .number()
        .typeError(t("body.required"))
        .required(t("body.required")),
      paperNum: yup
        .number()
        .typeError(t("body.required"))
        .required(t("body.required"))
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
        .required(t("body.required"))
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
        .required(t("body.required"))
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
      alarm_network: yup.string().required(t("body.required")),
      fire_network: yup.string().required(t("body.required")),
      fire_pump: yup.string().required(t("body.required")),
      generator: yup.string().required(t("body.required")),
    },
    { abortEarly: false }
  );
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
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
    },
    {
      id: "buildingType",
      type: "select",
      name: "buildingType",
      placeholder: t("body.buildingType"),
      icon: <IoMdArrowDropdownCircle />,
      //value: props.state === "edit" ? props.firstPageData.type : null,
      error: errors.buildingType,
      options: [
        {
          value: "hotel",
          label: t("body.hotel"),
          icon: <BsBuildings />,
        },
        {
          value: "build",
          label: t("body.building"),
          icon: <RiHotelLine />,
        },
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
    },
    {
      id: "streetName",
      type: "text",
      name: "streetName",
      placeholder: t("body.street"),
      icon: <GoLocation />,
      value: props.state === "edit" ? props.firstPageData.street : null,
      error: errors.streetName,
    },
    {
      id: "actualPilgrims",
      type: "number",
      name: "actualPilgrims",
      placeholder: t("body.hajjajNum"),
      icon: <FaKaaba />,
      value: props.state === "edit" ? props.firstPageData.hajjaj_count : null,
      error: errors.actualPilgrims,
    },
    {
      id: "writtenPilgrims",
      type: "number",
      name: "writtenPilgrims",
      placeholder: t("body.hajjajInPermit"),
      icon: <AiOutlineFile />,
      value: props.state === "edit" ? props.firstPageData.hajjaj_accsept : null,
      error: errors.writtenPilgrims,
    },
    {
      id: "paperNum",
      type: "number",
      name: "paperNum",
      placeholder: t("body.permitNum"),
      icon: <AiOutlineFileProtect />,
      value: props.state === "edit" ? props.firstPageData.number_prrmit : null,
      error: errors.paperNum,
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
    },
    {
      id: "phone",
      type: "text",
      name: "phone",
      placeholder: t("body.phone"),
      icon: <FiPhoneCall />,
      value: props.state === "edit" ? props.firstPageData.phone : null,
      error: errors.phone,
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
    },
    {
      id: "floorsNum",
      type: "number",
      name: "floorsNum",
      placeholder: t("body.buildingFloors"),
      icon: <HiOutlineBuildingOffice2 />,
      value: props.state === "edit" ? props.firstPageData.total_floor : null,
      error: errors.floorsNum,
    },
    {
      id: "ownerId",
      type: "number",
      name: "ownerId",
      placeholder: t("body.ownerId"),
      icon: <FaRegAddressCard />,
      value: props.state === "edit" ? props.firstPageData.owner_ip : null,
      error: errors.ownerId,
    },
    {
      id: "renterName",
      type: "text",
      name: "renterName",
      placeholder: t("body.lessorName"),
      icon: <FaRegUserCircle />,
      value: props.state === "edit" ? props.firstPageData.lessor_name : null,
      error: errors.renterName,
    },
  ];
  const radioItems = [
    {
      id: "0",
      title: t("body.alarmNetwork"),
      value: props.state === "edit" ? props.firstPageData.alarm_network : null,
      error: errors.alarm_network,
      radios: [
        { id: "yes", name: "alarm_network", label: t("body.yes") },
        { id: "no", name: "alarm_network", label: t("body.no") },
      ],
    },
    {
      id: "1",
      title: t("body.fireNetwork"),
      value: props.state === "edit" ? props.firstPageData.fire_network : null,
      error: errors.fire_network,
      radios: [
        { id: "yes", name: "fire_network", label: t("body.yes") },
        { id: "no", name: "fire_network", label: t("body.no") },
      ],
    },
    {
      id: "2",
      title: t("body.firePump"),
      value: props.state === "edit" ? props.firstPageData.fire_pump : null,
      error: errors.fire_pump,
      radios: [
        { id: "yes", name: "fire_pump", label: t("body.yes") },
        { id: "no", name: "fire_pump", label: t("body.no") },
      ],
    },
    {
      id: "3",
      title: t("body.generator"),
      value: props.state === "edit" ? props.firstPageData.generator : null,
      error: errors.generator,
      radios: [
        { id: "yes", name: "generator", label: t("body.yes") },
        { id: "no", name: "generator", label: t("body.no") },
      ],
    },
  ];
  const selectValue = watch("buildingType");
  const Alarm = watch("alarm_network");
  const FireNetwork = watch("fire_network");
  const FirePump = watch("fire_pump");
  const Generator = watch("generator");

  const formSubmitHandler = (data) => {
    /*let alarmValue =
      props.state === "edit" ? props.firstPageData.alarm_network : alarm;
    let fireValue =
      props.state === "edit" ? props.firstPageData.fire_network : fireNetwork;
    let pumpValue =
      props.state === "edit" ? props.firstPageData.fire_pump : firePump;
    let generatorValue =
      props.state === "edit" ? props.firstPageData.generator : generator;*/
    context.setFormData((prevData) => {
      return {
        ...prevData,
        house_name: data.buildingName,
        type: selectedOption.value,
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
        fire_network: fireNetwork,
        fire_pump: firePump,
        generator: generator,
      };
    });
    context.setPage((prevNum) => {
      return prevNum + 1;
    });
  };
  useEffect(() => {
    setSelectedOption(selectValue);
  }, [selectValue]);
  useEffect(() => {
    if (Alarm) {
      setAlarm(Alarm);
    }
  }, [Alarm]);

  useEffect(() => {
    if (FireNetwork) {
      setFireNetwork(FireNetwork);
    }
  }, [FireNetwork]);

  useEffect(() => {
    if (FirePump) {
      setFirePump(FirePump);
    }
  }, [FirePump]);

  useEffect(() => {
    if (Generator) {
      setGenerator(Generator);
    }
  }, [Generator]);

  useEffect(() => {
    if (props.state === "edit") {
      let selected = {};
      if (props.firstPageData.type === "hotel") {
        selected = {
          value: "hotel",
          label: t("body.hotel"),
          icon: <BsBuildings />,
        };
      } else {
        selected = {
          value: "build",
          label: t("body.building"),
          icon: <RiHotelLine />,
        };
      }
      setValue("buildingType", selected);
      //setSelectedOption(selected);
    }
  }, []);
  
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={styles.form}>
      <div className={styles.inputs}>
        {firstPageInputs.map((item) => {
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
                      radioName={radio.name}
                      register={register}
                      icon="true"
                      value={radio.id}
                      label={radio.label}
                      checked={item.value === radio.id}
                    />
                  );
                })}
              </div>
              {item.error && (
                <span className={styles.feedback}>{item.error.message}</span>
              )}
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
