"use client";

import { Box, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";
import SearchListPicker, {
  SearchItem,
} from "@/components/searchListPicker/SearchListPicker";

const MEDICINES = [
  { id: "1", name: "타이레놀 시럽" },
  { id: "2", name: "아티푸스 시럽" },
  { id: "3", name: "케토라신 시럽" },
  { id: "4", name: "어린이용 부루펜" },
  { id: "5", name: "무코판 시럽" },
  { id: "6", name: "씨프로바이 시럽" },
  { id: "7", name: "메디퓨드 시럽" },
  { id: "8", name: "푸로탈 시럽" },
  { id: "9", name: "액티피드 시럽" },
  { id: "10", name: "베나돌 시럽" },
  { id: "11", name: "테라플루 시럽" },
  { id: "12", name: "페니라민 시럽" },
  { id: "13", name: "클래리틴 시럽" },
  { id: "14", name: "진코민 시럽" },
  { id: "15", name: "데코푸린 시럽" },
];

interface MedicineFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const MedicineFields = ({ form }: MedicineFieldsProps) => {
  // 선택된 약품 찾기
  const selectedMedicine = form.values.medicine
    ? MEDICINES.find((item) => item.name === form.values.medicine)
    : undefined;

  return (
    <Stack gap="md">
      <Box>
        <Text fw={600} fz="md" mb="xs">
          어떤 약을 먹었나요?
        </Text>
        <SearchListPicker
          items={MEDICINES}
          mode="single"
          onSelect={(selected: SearchItem | SearchItem[]) => {
            const items = Array.isArray(selected) ? selected : [selected];
            form.setFieldValue("medicine", items[0]?.name || "");
          }}
          selectedItems={selectedMedicine}
        />
      </Box>
    </Stack>
  );
};

export default MedicineFields;
