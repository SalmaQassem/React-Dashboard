import styles from "../../styles/_DatePicker.module.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const DateTimePicker = ({ value, placeholder, onChange }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className={`${styles.datePicker} ${
          i18n.language === "en" ? styles.en : ""
        }`}
        value={value === null ? null : dayjs(value)}
        onChange={onChange}
        slotProps={{
          textField: { placeholder: placeholder },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
