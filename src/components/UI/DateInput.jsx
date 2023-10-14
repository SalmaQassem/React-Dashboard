import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DateInput = (props) => {
  const [date, setDate] = useState("");
  return (
    <DatePicker
      selected={date === "" ? null : date}
      name={props.name}
      placeholderText={props.placeholder}
      onChange={(date) => setDate(date)}
    />
  );
};

export default DateInput;
