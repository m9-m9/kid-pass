"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/elements/container/Container";
import Header from "@/components/header/Header";
import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import TextAreaForm from "@/components/textArea/TextArea";
import Button from "@/elements/button/Button";
import Spacer from "@/elements/spacer/Spacer";
import useAuth from "@/hook/useAuth";
import { TYPE_MAP } from "../constants";

// 타입별 필드 컴포넌트들
import FeedingFields from "./fields/FeedingFields";
import MedicineFields from "./fields/MedicineFields";
import SleepFields from "./fields/SleepFields";
import SymptomFields from "./fields/SymptomFields";
import GrowthFields from "./fields/GrowthFields";
import TemperatureFields from "./fields/TemperatureFields";
import EtcFields from "./fields/EtcFields";
import EmotionFields from "./fields/EmotionFields";
import DiaperFields from "./fields/DiaperFields";
import { Label } from "@/elements/label/Label";

interface RecordFormProps {
  type: string;
}

const RecordForm = ({ type }: RecordFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { getToken } = useAuth();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [memo, setMemo] = useState("");
  const [formData, setFormData] = useState<any>({});

  const isRangeMode = type === "SLEEP" || type === "FEEDING";

  useEffect(() => {
    if (id) {
      fetchRecord(id);
    }
  }, [id]);

  const fetchRecord = async (recordId: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/record/${recordId}?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        setStartDate(new Date(data.startTime));
        setEndDate(new Date(data.endTime));
        setMemo(data.memo || "");
        setFormData(data);
      }
    } catch (error) {
      console.error("기록 조회 에러:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await getToken();
      const currentKid = localStorage.getItem("currentKid");

      if (!token || !currentKid || !startDate) {
        return;
      }

      const response = await fetch(id ? `/api/record/${id}` : "/api/record", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          childId: currentKid,
          type,
          startTime: startDate,
          endTime: endDate,
          ...formData,
          memo,
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 저장 에러:", error);
    }
  };

  const renderFields = () => {
    switch (type) {
      case "FEEDING":
        return <FeedingFields data={formData} onChange={setFormData} />;
      case "MEDICINE":
        return <MedicineFields data={formData} onChange={setFormData} />;
      case "SLEEP":
        return <SleepFields data={formData} onChange={setFormData} />;
      case "SYMPTOM":
        return <SymptomFields data={formData} onChange={setFormData} />;
      case "GROWTH":
        return <GrowthFields data={formData} onChange={setFormData} />;
      case "TEMPERATURE":
        return <TemperatureFields data={formData} onChange={setFormData} />;
      case "ETC":
        return <EtcFields data={formData} onChange={setFormData} />;
      case "EMOTION":
        return <EmotionFields data={formData} onChange={setFormData} />;
      case "DIAPER":
        return <DiaperFields data={formData} onChange={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <Container className="container">
      <Header
        title={`${TYPE_MAP[type as keyof typeof TYPE_MAP] || "기록"} ${
          id ? "수정" : "등록"
        }`}
        onBack={() => router.back()}
      />
      <Spacer height={30} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Label css="inputForm" text="기록 시간" />
        <Spacer height={10} />
        <CustomDateTimePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateSelect={(date) => setStartDate(date)}
          onEndDateSelect={isRangeMode ? (date) => setEndDate(date) : undefined}
          mode={isRangeMode ? "range" : "single"}
        />
        <Spacer height={30} />

        {renderFields()}

        <Spacer height={30} />
        <TextAreaForm
          labelText="메모"
          labelCss="inputForm"
          value={memo}
          onChange={setMemo}
          placeholder="메모를 입력해주세요"
          maxLength={200}
          errorMessage={memo.length > 200 ? "200자를 초과할 수 없습니다" : ""}
        />

        <Spacer height={30} />
        <Button label={id ? "수정하기" : "등록하기"} size="L" />
      </form>
    </Container>
  );
};

export default RecordForm;
