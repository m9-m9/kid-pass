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
        <Text fw={600} fz="md" mb="xs">
          몸무게
        </Text>
        <NumberInput
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
        <Text fw={600} fz="md" mb="xs">
          키
        </Text>
        <NumberInput
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
        <Text fw={600} fz="md" mb="xs">
          두위 (머리둘레)
        </Text>
        <NumberInput
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
