"use client";

import { DateType } from "@/hook/useDatePicker";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import WeeklyCalendar from "@/components/datePicker/DateCarousel";
import Container from "@/elements/container/Container";
import Carousel from "@/components/carousel/Carousel";
import Schedule, { DaySchedule } from "@/components/schedule/Schedule";
import { useModalStore } from "@/store/useModalStore";
import Grid from "@/elements/grid/Grid";
import styles from "./record.module.css";
import Image from "next/image";
import FloatingBtn from "@/components/floatingBtn/FloatingBtn";
import Link from "next/link";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";

const SLIDES = [
  "수면",
  "수유",
  "배변",
  "체온",
  "몸무게/키",
  "머리둘레",
  "감정",
  "특이증상",
  "약",
  "기타",
];

const RECORDS = [
  {
    title: "수유",
    src: "/images/feeding.png",
    path: "/record/feeding",
  },
  {
    title: "배설",
    src: "/images/diaper.png",
    path: "/record/feeding",
  },
  {
    title: "수면",
    src: "/images/sleep.png",
    path: "/record/feeding",
  },
  {
    title: "체온",
    src: "/images/temperature.png",
    path: "/record/heat",
  },
  {
    title: "몸무게/키/머리둘레",
    src: "/images/scale.png",
    path: "/record/hgWgh",
  },
  {
    title: "감정",
    src: "/images/heart.png",
    path: "/record/feeding",
  },
  {
    title: "특이증상",
    src: "/images/info.png",
    path: "/record/symptm",
  },
  {
    title: "약",
    src: "/images/medicine.png",
    path: "/record/feeding",
  },
  {
    title: "기타",
    src: "/images/etc.png",
    path: "/record/feeding",
  },
];

const App: React.FC = () => {
  const [date, setDate] = useState<DateType>({
    year: 2024,
    month: 11,
    date: 2,
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { openModal, closeModal, setComp } = useModalStore();

  const items = RECORDS.map((v) => (
    <Link href={v.path} onClick={() => closeModal()}>
      <div className={styles.card}>
        <Image src={v.src} alt="Record picture" width={32} height={32} />
        <span className={styles.cardText}>{v.title}</span>
      </div>
    </Link>
  ));

  useEffect(() => {
    setComp(
      <>
        <div className={styles.titleContainer}>
          <span className={styles.modalTitle}>오늘의 아이 기록하기</span>
        </div>
        <Grid items={items} column={3} />
      </>
    );
  }, []);

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
      <FloatingBtn onClick={() => openModal()} />

      <BottomNavigation />
    </Container>
  );
};

export default App;
