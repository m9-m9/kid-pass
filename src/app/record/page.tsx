"use client";

import { useEffect, useState } from "react";
import { Grid, Box, Text, Button, Image, Stack, Card } from "@mantine/core";
import { useRouter } from "next/navigation";
import useAuth from "@/hook/useAuth";
import { modals } from "@mantine/modals";
import { DateType } from "@/hook/useDatePicker";
import Schedule, { DaySchedule } from "@/components/schedule/Schedule";
import { formatRecordData } from "./utils";
import { RECORDS, SLIDES } from "./constants";
import MobileLayout from "@/app/mantine/MobileLayout";
import WeeklyCalendar from "@/components/datePicker/DateCarousel"; // Keeping this assuming it's a custom component
import Carousel from "@/components/carousel/Carousel"; // Keeping this assuming it's a custom component
import Empty from "@/components/empty/Empty"; // Keeping this assuming it's a custom component
import { RiAddLine } from "@remixicon/react";

const RecordPage = () => {
  const { getToken } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState<DateType>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);

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

  const openRecordModal = () => {
    modals.open({
      title: "오늘의 아이 기록하기",
      centered: false,
      fullScreen: false,
      withCloseButton: true,
      trapFocus: true,
      closeOnEscape: true,
      styles: {
        root: {
          alignItems: "flex-end",
        },
        content: {
          height: "60%",
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
      children: (
        <Box p="md">
          <Grid>
            {RECORDS.map((record) => (
              <Grid.Col span={4} key={record.path}>
                <Card
                  p="md"
                  radius="md"
                  withBorder
                  onClick={() => {
                    modals.closeAll();
                    router.push(record.path);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Stack align="center" gap="xs">
                    <Image
                      src={record.src}
                      alt={record.title}
                      width={32}
                      height={32}
                    />
                    <Text size="sm" ta="center">
                      {record.title}
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      ),
    });
  };

  const handleDateChange = (newDate: DateType) => {
    setDate(newDate);
  };

  useEffect(() => {
    fetchRecords();
  }, [date]);

  return (
    <MobileLayout
      showHeader={true}
      headerType="profile"
      title="아이기록"
      showBottomNav={true}
      currentRoute="/record"
    >
      <Box bg="white" pb={60}>
        <Box
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
          }}
        >
          <WeeklyCalendar onDateChange={handleDateChange} />
        </Box>

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

        <Box>
          {scheduleData.length > 0 ? (
            <Schedule schedules={scheduleData} />
          ) : (
            <Empty text="아직 기록된 데이터가 없습니다." />
          )}
        </Box>

        <Button
          radius="xl"
          size="lg"
          color="brand"
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 56,
            height: 56,
            padding: 0,
          }}
          onClick={openRecordModal}
        >
          <RiAddLine size={24} />
        </Button>
      </Box>
    </MobileLayout>
  );
};

export default RecordPage;
