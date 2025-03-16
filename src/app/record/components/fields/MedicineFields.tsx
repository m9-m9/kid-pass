"use client";

import { Box, Select, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

const MEDICINES = [
  "타이레놀 시럽",
  "아티푸스 시럽",
  "케토라신 시럽",
  "어린이용 부루펜",
  "무코판 시럽",
  "씨프로바이 시럽",
  "메디퓨드 시럽",
  "푸로탈 시럽",
  "액티피드 시럽",
  "베나돌 시럽",
  "테라플루 시럽",
  "페니라민 시럽",
  "클래리틴 시럽",
  "진코민 시럽",
  "데코푸린 시럽",
];

interface MedicineFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const MedicineFields = ({ form }: MedicineFieldsProps) => {
  return (
    <Stack gap="md">
      <Box>
        <Select
          label="어떤 약을 먹었나요?"
          data={MEDICINES}
          value={form.values.medicine}
          onChange={(value) => form.setFieldValue("medicine", value || "")}
          searchable
          placeholder="약을 선택해주세요"
          size="md"
        />
      </Box>
    </Stack>
  );
};

export default MedicineFields;
