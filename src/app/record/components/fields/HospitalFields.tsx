"use client";

import { Box, Stack, TextInput, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../RecordForm";

const diagnoses = ["감기", "코로나19", "장염", "인플루엔자", "기관지염"];

const medicines = ["타이레놀", "써스펜", "판콜에이", "베타딘", "게보린"];

interface HospitalFieldsProps {
  form: UseFormReturnType<FormValues>;
}

const HospitalFields = ({ form }: HospitalFieldsProps) => {
  return (
    <Stack gap="md">
      <Box>
        <TextInput
          label="진찰받은 병원"
          {...form.getInputProps("hospital")}
          placeholder="병원 이름을 입력해주세요"
          size="md"
        />
      </Box>

      <Box>
        <TextInput
          label="선생님 성함"
          {...form.getInputProps("doctor")}
          placeholder="선생님 성함을 입력해주세요"
          size="md"
        />
      </Box>

      <Box>
        <Select
          label="진단받은 병명"
          placeholder="병명을 선택해주세요"
          size="md"
          data={diagnoses}
          value={form.values.diagnoses}
          searchable
          onChange={(value) => form.setFieldValue("diagnoses", value || "")}
        />
      </Box>

      <Box>
        <TextInput
          label="치료 방법"
          {...form.getInputProps("treatmentMethod")}
          placeholder="치료 방법을 입력해주세요"
          size="md"
        />
      </Box>

      <Box>
        <Select
          label="처방받은 약"
          placeholder="약을 선택해주세요"
          size="md"
          data={medicines}
          value={form.values.medicine}
          searchable
          onChange={(value) => form.setFieldValue("medicine", value || "")}
        />
      </Box>
    </Stack>
  );
};

export default HospitalFields;
