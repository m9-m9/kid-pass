"use client";
import { Box, Stack, Text, NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

interface GrowthFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const GrowthFields = ({ form }: GrowthFieldsProps) => {
  return (
    <Stack gap="md">
      <Box>
        <NumberInput
          label="몸무게"
          {...form.getInputProps("weight")}
          placeholder="몸무게를 입력하세요"
          rightSection={
            <Text fz="sm" c="dimmed">
              kg
            </Text>
          }
          min={0}
          step={0.1}
          decimalScale={1}
          size="md"
        />
      </Box>

      <Box>
        <NumberInput
          label="키"
          {...form.getInputProps("height")}
          placeholder="키를 입력하세요"
          rightSection={
            <Text fz="sm" c="dimmed">
              cm
            </Text>
          }
          min={0}
          step={0.1}
          decimalScale={1}
          size="md"
        />
      </Box>

      <Box>
        <NumberInput
          label="두위 (머리둘레)"
          {...form.getInputProps("headSize")}
          placeholder="두위를 입력하세요"
          rightSection={
            <Text fz="sm" c="dimmed">
              cm
            </Text>
          }
          min={0}
          step={0.1}
          decimalScale={1}
          size="md"
        />
      </Box>
    </Stack>
  );
};

export default GrowthFields;
