"use client";

import { Select, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

const CATEGORIES = ["신생아 반사행동", "성장 행동", "기타"];

interface EtcFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const EtcFields = ({ form }: EtcFieldsProps) => {
  return (
    <Stack gap="md">
      <Select
        label="카테고리"
        placeholder="카테고리를 선택해주세요"
        data={CATEGORIES}
        value={form.values.category}
        onChange={(value) => form.setFieldValue("category", value || "")}
        searchable
        size="md"
      />
    </Stack>
  );
};

export default EtcFields;
