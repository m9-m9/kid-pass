"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import styles from "./datetime.module.css";

interface CustomDateTimePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const CustomDateTimePicker = ({
  selected,
  onSelect,
}: CustomDateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = ["00", "30"];

  const handleDaySelect = (day: Date | undefined) => {
    if (day) {
      // 기존 시간 정보 유지 또는 기본값 설정
      const newDate = new Date(day);
      if (selected) {
        newDate.setHours(selected.getHours(), selected.getMinutes());
      } else {
        newDate.setHours(9, 0); // 기본값 9:00
      }
      onSelect(newDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    if (selected) {
      const newDate = new Date(selected);
      if (type === "hour") {
        newDate.setHours(parseInt(value));
      } else {
        newDate.setMinutes(parseInt(value));
      }
      onSelect(newDate);
    }
  };

  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("ko", {
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={formatSelectedDate(selected)}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        placeholder="날짜와 시간을 선택하세요"
      />

      {isOpen && (
        <div className={styles.pickerContainer}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            locale={ko}
          />

          <div className={styles.timeContainer}>
            <select
              className={styles.timeSelect}
              value={selected?.getHours()}
              onChange={(e) => handleTimeChange("hour", e.target.value)}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour.toString().padStart(2, "0")}시
                </option>
              ))}
            </select>

            <select
              className={styles.timeSelect}
              value={selected?.getMinutes()}
              onChange={(e) => handleTimeChange("minute", e.target.value)}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}분
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDateTimePicker;
