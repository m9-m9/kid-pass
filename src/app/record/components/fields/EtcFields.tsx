"use client";

import { Box, SimpleGrid, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";
import CheckButton from "@/components/mantine/CheckButton";

const CATEGORIES = ["신생아 반사행동", "성장 행동"];

const BEHAVIORS = [
  "모로반사",
  "파악반사",
  "바빈스키 반사",
  "흡철반사",
  "긴장목 반사",
];

const GROWTH_BEHAVIORS = [
  "터미타임",
  "턱 들기",
  "가슴 들기",
  "물건 만지기",
  "기대 앉기",
  "물건 잡기",
  "앉기",
  "기어가기",
  "계단 오르기",
  "서기",
  "걷기",
];

interface EtcFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const EtcFields = ({ form }: EtcFieldsProps) => {
  return (
    <Stack gap="md">
      <Box>
        <Text fw={600} fz="md" mb="xs">
          카테고리
        </Text>
        <SimpleGrid cols={2} spacing="xs">
          {CATEGORIES.map((category) => (
            <CheckButton
              key={`category-${category}`}
              value={category}
              form={form}
              formKey={`category`}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} fz="md" mb="xs">
          행동 종류
        </Text>
        <SimpleGrid cols={2} spacing="xs">
          {!form.values.category && (
            <Text c="dimmed">카테고리를 선택해주세요.</Text>
          )}
          {form.values.category === "신생아 반사행동" &&
            BEHAVIORS.map((behavior) => (
              <CheckButton
                key={`behavior-${behavior}`}
                value={behavior}
                form={form}
                formKey={`behavior`}
              />
            ))}
          {form.values.category === "성장 행동" &&
            GROWTH_BEHAVIORS.map((behavior) => (
              <CheckButton
                key={`behavior-${behavior}`}
                value={behavior}
                form={form}
                formKey={`behavior`}
              />
            ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default EtcFields;
