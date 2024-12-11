"use client";
import DateCarousel from "@/components/datePicker/DateCarousel";
import { DateType } from "@/hook/useDatePicker";
import { useState } from "react";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import WeeklyCalendarSlider from "@/components/datePicker/DateCarousel";
import WeeklyCalendar from "@/components/datePicker/DateCarousel";
import Container from "@/elements/container/Container";
import Carousel from "@/components/carousel/Carousel";
import { EmblaOptionsType } from "embla-carousel";
import Schedule, { DaySchedule } from "@/components/schedule/Schedule";
import { useModalStore } from "@/store/useModalStore";

const SLIDES = ["수면", "수유", "배변", "체온", "몸무게/키", "머리둘레", "감정", "특이증상", "약", "기타"];

const App: React.FC = () => {
  const [date, setDate] = useState<DateType>({ year: 2024, month: 11, date: 2 });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { openModal, closeModal } = useModalStore();

  const handleSelect = (index: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }
      return [...prev, index];
    });
  };

  const scheduleData: DaySchedule[] = [
    {
      date: "9월 15일",
      dayOfWeek: "일요일",
      items: [
        {
          time: "09:47",
          ampm: "AM",
          content: "수유",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "수면",
          duration: "1시간 10분",
        },
        {
          time: "09:47",
          ampm: "AM",
          content: "체온",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "몸무게/키",
          duration: "1시간 10분",
        },
        {
          time: "09:47",
          ampm: "AM",
          content: "머리둘레",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "약",
          duration: "1시간 10분",
        },
        {
          time: "09:47",
          ampm: "AM",
          content: "특이증상",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "감정",
          duration: "1시간 10분",
        },
      ],
    },
    {
      date: "9월 14일",
      dayOfWeek: "토요일",
      items: [
        {
          time: "09:47",
          ampm: "AM",
          content: "수유",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "수면",
          duration: "1시간 10분",
        },
        {
          time: "09:47",
          ampm: "AM",
          content: "체온",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "몸무게/키",
          duration: "1시간 10분",
        },
        {
          time: "09:47",
          ampm: "AM",
          content: "머리둘레",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "약",
          duration: "1시간 10분",
        },
        {
          time: "09:47",
          ampm: "AM",
          content: "특이증상",
          duration: "15분",
          amount: "90ml",
        },
        {
          time: "10:25",
          ampm: "AM",
          content: "감정",
          duration: "1시간 10분",
        },
      ],
    },
  ];

  return (
    <Container className="mapContainer">
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <WeeklyCalendar />
      </div>
      <Carousel
        slides={SLIDES}
        options={{
          useButton: false,
          useIndex: false,
          dragFree: true,
          selectedItems: selectedItems,
          onSelect: handleSelect,
        }}
      />

      <div style={{ marginBottom: 60 }}>
        <Schedule schedules={scheduleData} />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
          paddingTop: "60px",
          paddingBottom: "20px",
        }}
      >
        <div
          style={{
            padding: 8,
            background: "#729BED",
            fontSize: 18,
            color: "white",
            width: "80%",
            textAlign: "center",
            borderRadius: 8,
          }}
          onClick={() => openModal()}
        >
          기록하기
        </div>
      </div>
    </Container>
  );
};

export default App;
