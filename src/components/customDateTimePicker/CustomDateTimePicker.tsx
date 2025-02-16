"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import styles from "./datetime.module.css";

interface CustomDateTimePickerProps {
  startDate: Date | undefined;
  endDate?: Date | undefined;
  onStartDateSelect: (date: Date | undefined) => void;
  onEndDateSelect?: (date: Date | undefined) => void;
  mode?: "single" | "range";
}

const CustomDateTimePicker = ({
  startDate,
  endDate,
  onStartDateSelect,
  onEndDateSelect,
  mode = "single",
}: CustomDateTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end">("start");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = ["00", "30"];

  const handleDaySelect = (day: Date | undefined) => {
    if (!day) return;

    const newDate = new Date(day);
    const currentDate = activeInput === "start" ? startDate : endDate;

    if (currentDate) {
      newDate.setHours(currentDate.getHours(), currentDate.getMinutes());
    } else {
      newDate.setHours(9, 0);
    }

    if (activeInput === "start") {
      onStartDateSelect(newDate);
    } else if (onEndDateSelect) {
      onEndDateSelect(newDate);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = activeInput === "start" ? startDate : endDate;
    if (!currentDate) return;

    const newDate = new Date(currentDate);
    if (type === "hour") {
      newDate.setHours(parseInt(value));
    } else {
      newDate.setMinutes(parseInt(value));
    }

    if (activeInput === "start") {
      onStartDateSelect(newDate);
    } else if (onEndDateSelect) {
      onEndDateSelect(newDate);
    }
  };

  const formatDate = (date: Date | undefined) => {
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
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          {mode === "range" && <span className={styles.label}>시작</span>}
          <input
            type="text"
            className={styles.input}
            value={formatDate(startDate)}
            onClick={() => {
              setIsOpen(true);
              setActiveInput("start");
            }}
            readOnly
            placeholder="시간을 선택하세요"
          />
        </div>
        {mode === "range" && (
          <div className={styles.inputWrapper}>
            <span className={styles.label}>종료</span>
            <input
              type="text"
              className={styles.input}
              value={formatDate(endDate)}
              onClick={() => {
                setIsOpen(true);
                setActiveInput("end");
              }}
              readOnly
              placeholder="시간을 선택하세요"
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div className={styles.pickerContainer}>
          <DayPicker
            mode="single"
            selected={activeInput === "start" ? startDate : endDate}
            onSelect={handleDaySelect}
            locale={ko}
          />

          <div className={styles.timeContainer}>
            <select
              className={styles.timeSelect}
              value={
                activeInput === "start"
                  ? startDate?.getHours()
                  : endDate?.getHours()
              }
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
              value={
                activeInput === "start"
                  ? startDate?.getMinutes()
                  : endDate?.getMinutes()
              }
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
