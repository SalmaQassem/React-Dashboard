import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DateInput = (props) => {
  const [dateValue, setDate] = useState("");

  return (
    <DatePicker
      selected={
        dateValue === ""
          ? props.defaultValue
            ? new Date(props.defaultValue)
            : null
          : dateValue
      }
      name={props.name}
      placeholderText={props.placeholder}
      onChange={(date) => {
        props.onChange ? props.onChange(date) : setDate(date);
      }}
    />
  );
};

export default DateInput;
