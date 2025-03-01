"use client";

import { Box, Stack, Text, SimpleGrid, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

const SYMPTOMS = [
  "수유 거부",
  "설사",
  "발진",
  "발열",
  "콧물",
  "기침",
  "구토",
  "보챔",
  "식욕 부진",
  "잦은 울음",
  "수면 장애",
  "코막힘",
  "가래",
  "젖병 거부",
  "이유식 거부",
  "묽은 변",
  "땀이 많음",
  "눈곱",
  "열성 경련",
  "중이염",
];

const SEVERITY = ["약함", "보통", "심함"];

interface SymptomFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const SymptomFields = ({ form }: SymptomFieldsProps) => {
  return (
    <Stack gap="md">
      <Select
        label="특이증상"
        placeholder="특이증상을 선택해주세요"
        data={SYMPTOMS}
        value={form.values.symptom}
        onChange={(value) => form.setFieldValue("symptom", value || "")}
        searchable
        size="md"
      />

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
