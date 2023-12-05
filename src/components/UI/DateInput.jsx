import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DateInput = ({ register, name, placeholder, setValue, defaultValue }) => {
  const [dateValue, setDate] = useState("");

  const changeDateHandler = (date) => {
    setDate(date);
    setValue(name, date);
  };
  return (
    <DatePicker
      selected={
        dateValue === ""
          ? defaultValue
            ? new Date(defaultValue)
            : null
          : dateValue
      }
      {...register(name)}
      placeholderText={placeholder}
      onChange={changeDateHandler}
    />
  );
};

export default DateInput;
