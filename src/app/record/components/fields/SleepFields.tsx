"use client";

import { Box, Stack, Text, SimpleGrid } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

const TYPES = ["낮잠", "밤잠"];

interface SleepFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const SleepFields = ({ form }: SleepFieldsProps) => {
  return (
    <Stack gap="md">
      <Box>
        <Text fw={600} fz="md" mb="xs">
          취침 종류
        </Text>
        <SimpleGrid cols={2} spacing="xs">
          {TYPES.map((type) => (
            <Box
              key={type}
              p="md"
              style={{
                borderRadius: "8px",
                border: "1px solid",
                borderColor:
                  form.values.sleepType === type
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-3)",
                color:
                  form.values.sleepType === type
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-6)",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => form.setFieldValue("sleepType", type)}
            >
              {type}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default SleepFields;
