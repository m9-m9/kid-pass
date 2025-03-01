"use client";

import { Box, Stack, Text, SimpleGrid } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";
import SearchListPicker, {
  SearchItem,
} from "@/components/searchListPicker/SearchListPicker";

const SYMPTOMS = [
  { id: "1", name: "수유 거부" },
  { id: "2", name: "설사" },
  { id: "3", name: "발진" },
  { id: "4", name: "발열" },
  { id: "5", name: "콧물" },
  { id: "6", name: "기침" },
  { id: "7", name: "구토" },
  { id: "8", name: "보챔" },
  { id: "9", name: "식욕 부진" },
  { id: "10", name: "잦은 울음" },
  { id: "11", name: "수면 장애" },
  { id: "12", name: "코막힘" },
  { id: "13", name: "가래" },
  { id: "14", name: "젖병 거부" },
  { id: "15", name: "이유식 거부" },
  { id: "16", name: "묽은 변" },
  { id: "17", name: "땀이 많음" },
  { id: "18", name: "눈곱" },
  { id: "19", name: "열성 경련" },
  { id: "20", name: "중이염" },
];

const SEVERITY = ["약함", "보통", "심함"];

interface SymptomFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const SymptomFields = ({ form }: SymptomFieldsProps) => {
  // 선택된 증상 찾기
  const selectedSymptom = form.values.symptom
    ? SYMPTOMS.find((item) => item.name === form.values.symptom)
    : undefined;

  return (
    <Stack gap="md">
      <Box>
        <Text fw={600} fz="md" mb="xs">
          특이증상
        </Text>
        <SearchListPicker
          items={SYMPTOMS}
          mode="single"
          onSelect={(selected: SearchItem | SearchItem[]) => {
            const items = Array.isArray(selected) ? selected : [selected];
            form.setFieldValue("symptom", items[0]?.name || "");
          }}
          selectedItems={selectedSymptom}
        />
      </Box>

      <Box>
        <Text fw={600} fz="md" mb="xs">
          증상 정도
        </Text>
        <SimpleGrid cols={3} spacing="xs">
          {SEVERITY.map((severity) => (
            <Box
              key={severity}
              p="md"
              style={{
                borderRadius: "8px",
                border: "1px solid",
                borderColor:
                  form.values.severity === severity
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-3)",
                color:
                  form.values.severity === severity
                    ? "var(--mantine-color-blue-5)"
                    : "var(--mantine-color-gray-6)",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => form.setFieldValue("severity", severity)}
            >
              {severity}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default SymptomFields;
