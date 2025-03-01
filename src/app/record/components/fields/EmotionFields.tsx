"use client";

import { Box, Stack, Text, SimpleGrid, Center } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";
import Image from "next/image";

const EMOTIONS = [
  "행복해요",
  "활발해요",
  "평온해요",
  "나른해요",
  "불편해요",
  "슬퍼요",
];

const SPECIALS = [
  "없음",
  "놀이를 했어요",
  "외출했어요",
  "예방접종 했어요",
  "손님이 왔어요",
  "친구륾 만났어요",
];

interface EmotionFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const EmotionFields = ({ form }: EmotionFieldsProps) => {
  return (
    <Stack gap="md">
      <Box>
        <Text fw={600} fz="md" mb="xs">
          아이의 기분은 어떤가요?
        </Text>
        <SimpleGrid cols={3} spacing="xs">
          {EMOTIONS.map((emotion, index) => (
            <Box
              key={index}
              p="sm"
              style={{
                borderRadius: "8px",
                border: "1px solid",
                borderColor:
                  form.values.emotion === emotion
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-3)",
                color:
                  form.values.emotion === emotion
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-6)",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => form.setFieldValue("emotion", emotion)}
            >
              <Center>
                <Image
                  src={`/images/emotion${index + 1}.png`}
                  alt={emotion}
                  width={64}
                  height={64}
                />
              </Center>
              <Text mt="xs">{emotion}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box>
        <Text fw={600} fz="md" mb="xs">
          특별한 일이 있나요?
        </Text>
        <SimpleGrid cols={2} spacing="xs">
          {SPECIALS.map((special) => (
            <Box
              key={special}
              p="md"
              style={{
                borderRadius: "8px",
                border: "1px solid",
                borderColor:
                  form.values.special === special
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-3)",
                color:
                  form.values.special === special
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-6)",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => form.setFieldValue("special", special)}
            >
              {special}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default EmotionFields;
