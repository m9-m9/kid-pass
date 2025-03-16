"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TextInput, Stack, Box, Button, AppShell, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import MobileLayout from "@/components/mantine/MobileLayout";

interface Item {
  id: string;
  name: string;
  [key: string]: any;
}

const diagnoses = ["감기", "코로나19", "장염", "인플루엔자", "기관지염"];

const medicines = ["타이레놀", "써스펜", "판콜에이", "베타딘", "게보린"];

const HospitalForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const form = useForm({
    initialValues: {
      date: undefined as Date | undefined,
      hospital: "",
      doctor: "",
      treatmentMethod: "",
      diagnoses: "",
      medicines: "",
    },
    validate: {
      date: (value) => (value ? null : "날짜를 선택해주세요"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // 저장 로직 구현
    console.log(values);
    // 예: API 호출, 상태 업데이트 등
    router.back();
  };

  return (
    <MobileLayout
      showHeader={true}
      headerType="back"
      title={`병원 진료 ${id ? "수정" : "등록"}`}
      onBack={() => router.back()}
      showBottomNav={false}
    >
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} p="md">
        <Stack gap="xl">
          <Box>
            <DateTimePicker
              label="진찰 받은 날짜"
              placeholder="날짜 및 시간 선택"
              value={form.values.date}
              onChange={(date) => form.setFieldValue("date", date || undefined)}
              size="md"
              clearable={false}
              valueFormat="YYYY-MM-DD HH:mm"
              leftSection={<IconCalendar size={16} />}
              error={form.errors.date}
              styles={{
                input: {
                  lineHeight: 2.1,
                },
              }}
              lang="ko"
            />
          </Box>

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
              value={form.values.medicines}
              searchable
              onChange={(value) => form.setFieldValue("medicines", value || "")}
            />
          </Box>
        </Stack>
      </Box>

      <AppShell.Footer>
        <Box p="md">
          <Button
            onClick={() => form.onSubmit(handleSubmit)()}
            fullWidth
            size="md"
            type="submit"
            variant="filled"
            color="blue"
          >
            {id ? "수정하기" : "등록하기"}
          </Button>
        </Box>
      </AppShell.Footer>
    </MobileLayout>
  );
};

export default HospitalForm;
