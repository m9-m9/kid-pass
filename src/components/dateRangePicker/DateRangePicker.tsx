import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styles from "./DateRangePicker.module.css";

interface DateRangePickerProps {
  onChange?: (dates: any) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange?.(dates);
  };

  return (
    <div className={styles.wrapper}>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        placeholderText="날짜를 선택해주세요"
        isClearable
        monthsShown={1}
        fixedHeight
      />
    </div>
  );
};

export default DateRangePicker;
