"use client";

import { Box, Stack, Text, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

interface TemperatureFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const TemperatureFields = ({ form }: TemperatureFieldsProps) => {
  return (
    <Stack gap="md">
      <NumberInput
        label="체온"
        placeholder="체온을 입력하세요"
        value={form.values.temperature}
        onChange={(value) => form.setFieldValue("temperature", value)}
        rightSection={
          <Text fz="sm" c="dimmed">
            ℃
          </Text>
        }
        min={35}
        max={42}
        step={0.1}
        size="md"
      />
    </Stack>
  );
};

export default TemperatureFields;
