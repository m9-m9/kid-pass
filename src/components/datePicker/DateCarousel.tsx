import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./DateCarousel.module.css";
import Button from "@/elements/button/Button";
import { Label } from "@/elements/label/Label";
import ProfileHeader from "../header/ProfileHeader";

interface DayInfo {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
}

interface WeekProps {
  weekStart: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const DAY_NAMES: readonly string[] = ["일", "월", "화", "수", "목", "금", "토"];

const DayCell: React.FC<{
  dayInfo: DayInfo;
  onSelect: () => void;
}> = ({ dayInfo, onSelect }) => {
  const { date, isToday, isSelected } = dayInfo;

  return (
    <div
      className={`${styles.dayCell} 
        ${isToday ? styles.today : ""} 
        ${isSelected ? styles.selectedDay : ""}`}
      onClick={onSelect}
    >
      <div
        className={`${styles.dayNumber} ${isSelected ? styles.selected : ""}`}
      >
        {date.getDate()}
      </div>
    </div>
  );
};

const WeekView: React.FC<WeekProps> = ({
  weekStart,
  selectedDate,
  onDateSelect,
}) => {
  const getDayInfo = (currentDate: Date): DayInfo => {
    const today = new Date();

    return {
      date: currentDate,
      isToday: isSameDay(currentDate, today),
      isSelected: isSameDay(currentDate, selectedDate),
    };
  };

  const days: DayInfo[] = Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(weekStart);
    currentDate.setDate(weekStart.getDate() + i);
    return getDayInfo(currentDate);
  });

  return (
    <div className={styles.weekContainer}>
      {days.map((dayInfo) => (
        <DayCell
          key={dayInfo.date.toISOString()}
          dayInfo={dayInfo}
          onSelect={() => onDateSelect(dayInfo.date)}
        />
      ))}
    </div>
  );
};

const WeeklyCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weeks, setWeeks] = useState<Date[]>([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(10); // 기본값은 중간 주
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });

  const getWeekStart = (date: Date): Date => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    newDate.setDate(newDate.getDate() - day);
    return newDate;
  };

  const generateWeeks = useCallback(() => {
    const today = new Date();
    const generatedWeeks: Date[] = Array.from({ length: 21 }, (_, i) => {
      const weekDate = new Date(today);
      weekDate.setDate(today.getDate() + (i - 10) * 7);
      return getWeekStart(weekDate);
    });

    setWeeks(generatedWeeks);
  }, []);

  useEffect(() => {
    generateWeeks();
  }, [generateWeeks]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(10);

      // 슬라이드 변경 이벤트 리스너 추가
      emblaApi.on("select", () => {
        const index = emblaApi.selectedScrollSnap();
        setCurrentWeekIndex(index);
      });
    }
  }, [emblaApi]);

  const handleTodayClick = () => {
    setSelectedDate(new Date());
    emblaApi?.scrollTo(10);
    setCurrentWeekIndex(10);
  };

  const getCurrentMonth = (): string => {
    if (weeks.length === 0) return "";

    // 현재 보이는 주의 시작일
    const currentWeekStart = weeks[currentWeekIndex];
    // 주의 중간 날짜를 사용 (더 정확한 월 표시를 위해)
    const middleOfWeek = new Date(currentWeekStart);
    middleOfWeek.setDate(currentWeekStart.getDate() + 3);

    return `${middleOfWeek.getFullYear()}년 ${middleOfWeek.getMonth() + 1}월`;
  };

  return (
    <div>
      <div style={{ padding: "16px 16px 0 16px" }}>
        <ProfileHeader />
      </div>

      {/* 날짜 슬라이더 */}
      <div className={styles.carouselContainer} ref={emblaRef}>
        <div className={styles.weekContainer}>
          {weeks.map((weekStart) => (
            <WeekView
              key={weekStart.toISOString()}
              weekStart={weekStart}
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export default WeeklyCalendar;
