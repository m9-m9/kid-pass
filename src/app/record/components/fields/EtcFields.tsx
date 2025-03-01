"use client";

import { Box, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";
import SearchListPicker, {
  SearchItem,
} from "@/components/searchListPicker/SearchListPicker";

const CATEGORIES = [
  { id: "1", name: "신생아 반사행동" },
  { id: "2", name: "성장 행동" },
  { id: "3", name: "기타" },
];

interface EtcFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const EtcFields = ({ form }: EtcFieldsProps) => {
  // 선택된 카테고리 찾기
  const selectedCategory = form.values.category
    ? CATEGORIES.find((item) => item.name === form.values.category)
    : undefined;

  return (
    <Stack gap="md">
      <Box>
        <Text fw={600} fz="md" mb="xs">
          카테고리
        </Text>
        <SearchListPicker
          items={CATEGORIES}
          mode="single"
          onSelect={(selected: SearchItem | SearchItem[]) => {
            const items = Array.isArray(selected) ? selected : [selected];
            form.setFieldValue("category", items[0]?.name || "");
          }}
          selectedItems={selectedCategory}
        />
      </Box>
    </Stack>
  );
};

export default EtcFields;
