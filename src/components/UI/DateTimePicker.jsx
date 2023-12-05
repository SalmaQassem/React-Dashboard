import styles from "../../styles/_Datepicker.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const DateTimePicker = ({
  name,
  placeholder,
  register,
  setValue,
  defaultValue,
}) => {
  const [dateValue, setDate] = useState("");
  const [t, i18n] = useTranslation("global");

  const changeDateHandler = (date) => {
    setDate(date);
    setValue(name, date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={`${styles.datePicker} ${
          i18n.language === "en" ? styles.en : ""
        }`}
        value={
          dateValue === ""
            ? defaultValue
              ? dayjs(defaultValue)
              : null
            : dateValue
        }
        {...register(name)}
        defaultValue={dayjs(defaultValue)}
        onChange={changeDateHandler}
        slotProps={{
          textField: { placeholder: placeholder },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
