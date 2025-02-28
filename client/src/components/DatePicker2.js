import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const DatePicker2 = (props) => {
  const [selectDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selectDate}
        onChange={(date) => {
          setSelectedDate(date);
          const tempExpense = props.expense;
          tempExpense.date = date.toDateString();
          props.setExpense(tempExpense);
        }}
        className="p-3 w-3/4 rounded-md outline-none bg-gray-700 px-4 placeholder-white mt-4 text-white"
        placeholderText="Date"
        showYearDropdown
      />
    </div>
  );
};

export default DatePicker2;
