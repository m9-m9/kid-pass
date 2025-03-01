"use client";

import { useEffect } from "react";
import { Box, Text, SimpleGrid, NumberInput, Flex } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

export enum MealType {
  MHRSM = "모유",
  FOMULA = "분유",
  BABYFD = "이유식",
  MIXED = "혼합",
}

const MEALTYPES = [
  MealType.MHRSM,
  MealType.FOMULA,
  MealType.BABYFD,
  MealType.MIXED,
];

const SLIDES = ["30ml", "90ml", "120ml", "150ml"];

interface FeedingFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const FeedingFields = ({ form }: FeedingFieldsProps) => {
  const selectedMealType = form.values.mealType || "";

  useEffect(() => {
    // 컴포넌트 마운트 시 기본값 설정
    if (!form.values.unit) {
      form.setFieldValue("unit", "ml");
    }
  }, []);

  const handleSlideSelect = (index: number) => {
    if (index === 0) form.setFieldValue("amount", 30);
    else if (index === 1) form.setFieldValue("amount", 90);
    else if (index === 2) form.setFieldValue("amount", 120);
    else if (index === 3) form.setFieldValue("amount", 150);
    // index 4는 "모름"이므로 값을 설정하지 않음
  };

  // 현재 선택된 슬라이드 인덱스 계산
  const getSelectedSlideIndex = () => {
    const amount = form.values.amount;
    if (amount === 30) return 0;
    if (amount === 90) return 1;
    if (amount === 120) return 2;
    if (amount === 150) return 3;
    return -1; // 해당하는 값이 없음
  };

  return (
    <Box>
      <Box mb="md">
        <Text fw={600} fz="md" mb="xs">
          수유 종류
        </Text>
        <SimpleGrid cols={2} spacing="xs">
          {MEALTYPES.map((type) => (
            <Box
              key={type}
              p="md"
              style={{
                borderRadius: "8px",
                border: "1px solid",
                borderColor:
                  selectedMealType === type
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-3)",
                color:
                  selectedMealType === type
                    ? "var(--mantine-color-blue-6)"
                    : "var(--mantine-color-gray-6)",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: selectedMealType === type ? 600 : 400,
                lineHeight: 1.6,
              }}
              onClick={() => form.setFieldValue("mealType", type)}
            >
              {type}
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box mb="md">
        <NumberInput
          label="수유량"
          placeholder="60"
          value={form.values.amount}
          size="md"
          onChange={(value) => form.setFieldValue("amount", value)}
          rightSection={
            <Text fz="sm" c="dimmed">
              ml
            </Text>
          }
          min={0}
          step={10}
        />
      </Box>

      <Flex>
        {SLIDES.map((slide, index) => (
          <Box
            key={index}
            onClick={() => handleSlideSelect(index)}
            w={120}
            p="sm"
            mr={4}
            style={{
              border: "1px solid",
              borderColor:
                getSelectedSlideIndex() === index
                  ? "var(--mantine-color-blue-6)"
                  : "var(--mantine-color-gray-3)",
              color:
                getSelectedSlideIndex() === index
                  ? "var(--mantine-color-blue-6)"
                  : "var(--mantine-color-gray-6)",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              borderRadius: "8px",
            }}
          >
            {slide}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default FeedingFields;
