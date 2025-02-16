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
import useAuth from "@/hook/useAuth";
import Empty from "@/components/empty/Empty";
import { formatRecordData } from "./utils";
import { RECORDS, SLIDES } from "./constants";

const RecordPage = () => {
  const { getToken } = useAuth();
  const [date, setDate] = useState<DateType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);
  const { openModal, closeModal, setComp } = useModalStore();

  const fetchRecords = async () => {
    try {
      const token = await getToken();
      const currentKid = localStorage.getItem("currentKid");

      if (!token || !currentKid) {
        return;
      }

      const response = await fetch(
        `/api/record?childId=${currentKid}&startDate=${date.year}-${date.month}-${date.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const { data } = await response.json();
        const formattedData = formatRecordData(data);
        setScheduleData(formattedData);
      }
    } catch (error) {
      console.error("기록 조회 에러:", error);
    }
  };

  const handleSelect = (index: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }
      return [...prev, index];
    });
  };

  const renderRecordItems = () =>
    RECORDS.map((record) => (
      <Link key={record.path} href={record.path} onClick={() => closeModal()}>
        <div className={styles.card}>
          <Image src={record.src} alt={record.title} width={32} height={32} />
          <span className={styles.cardText}>{record.title}</span>
        </div>
      </Link>
    ));

  const handleDateChange = (newDate: DateType) => {
    setDate(newDate);
  };

  useEffect(() => {
    fetchRecords();
  }, [date]);

  useEffect(() => {
    setComp(
      <>
        <div className={styles.titleContainer}>
          <span className={styles.modalTitle}>오늘의 아이 기록하기</span>
        </div>
        <Grid items={renderRecordItems()} column={3} />
      </>
    );
  }, []);

  return (
    <Container className="mapContainer">
      <div style={{ backgroundColor: "white" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
          }}
        >
          <WeeklyCalendar onDateChange={handleDateChange} />
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
          {scheduleData.length > 0 ? (
            <Schedule schedules={scheduleData} />
          ) : (
            <Empty text="아직 기록된 데이터가 없습니다." />
          )}
        </div>
        <FloatingBtn onClick={() => openModal()} />
        <BottomNavigation />
      </div>
    </Container>
  );
};

export default RecordPage;
