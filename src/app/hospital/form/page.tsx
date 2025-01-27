"use client";

import CustomDateTimePicker from "@/components/customDateTimePicker/CustomDateTimePicker";
import Header from "@/components/header/Header";
import SearchListPicker from "@/components/searchListPicker/SearchListPicker";
import Button from "@/elements/button/Button";
import Container from "@/elements/container/Container";
import Input from "@/elements/input/Input";
import { Label } from "@/elements/label/Label";
import Spacer from "@/elements/spacer/Spacer";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Item {
  id: string;
  name: string;
  [key: string]: any;
}

const diagnoses = [
  { id: "1", name: "감기" },
  { id: "2", name: "코로나19" },
  { id: "3", name: "장염" },
  { id: "4", name: "인플루엔자" },
  { id: "5", name: "기관지염" },
];

const medicines = [
  { id: "1", name: "타이레놀" },
  { id: "2", name: "써스펜" },
  { id: "3", name: "판콜에이" },
  { id: "4", name: "베타딘" },
  { id: "5", name: "게보린" },
];

const HospitalForm = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<Item[]>([]);
  const [selectedMedicines, setSelectedMedicines] = useState<Item[]>([]);

  return (
    <Container className="container">
      <Header title="진료 기록하기" onBack={() => router.back()} />
      <Spacer height={36} />

      <Label text="진찰 받은 날짜" css="inputForm" />
      <Spacer height={10} />
      <CustomDateTimePicker
        selected={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
      />

      <Spacer height={36} />
      <Label text="진찰받은 병원" css="inputForm" />
      <Spacer height={10} />
      <Input className="inputForm" value={""} />

      <Spacer height={36} />
      <Label text="진료하신 선생님" css="inputForm" />
      <Spacer height={10} />
      <Input className="inputForm" value={""} />

      <Spacer height={36} />
      <Label text="진단받은 병명" css="inputForm" />
      <Spacer height={10} />
      <SearchListPicker
        mode="multi"
        items={diagnoses}
        selectedItems={selectedDiagnoses}
        onSelect={(items) => setSelectedDiagnoses(items as Item[])}
        placeholder="여러 병원을 선택해주세요"
        maxSelect={3} // 최대 3개까지 선택 가능
      />

      <Spacer height={36} />
      <Label text="치료 방법" css="inputForm" />
      <Spacer height={10} />
      <Input className="inputForm" value={""} />

      <Spacer height={36} />
      <Label text="처방받은 약" css="inputForm" />
      <Spacer height={10} />
      <SearchListPicker
        mode="multi"
        items={medicines}
        selectedItems={selectedMedicines}
        onSelect={(items) => setSelectedMedicines(items as Item[])}
        placeholder="여러 병원을 선택해주세요"
        maxSelect={3} // 최대 3개까지 선택 가능
      />
      <Spacer height={36} />
      <Button size="L" label="저장" />
    </Container>
  );
};

export default HospitalForm;
