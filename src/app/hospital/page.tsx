"use client";

import { useRouter } from "next/navigation";
import { hospitalRecord } from "./type/hospital";
import MobileLayout from "../mantine/MobileLayout";
import { Paper, Flex, Text, Stack, ActionIcon, Box } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export interface HospitalRecord {
  hsptlNo: string;
  mdexmnDgnssNm: string;
  hospital: string;
  mdexmnRcordDt: string;
}

const Hospital = () => {
  const router = useRouter();

  return (
    <MobileLayout
      showHeader={true}
      headerType="profile"
      title="병원 처방전"
      showBottomNav={true}
      currentRoute="/hospital"
    >
      <Stack p="md" gap="md">
        {sampleRecords.map((record) => (
          <Item key={record.hsptlNo} {...record} />
        ))}
      </Stack>

      <Box pos="fixed" bottom={80} right={16} style={{ zIndex: 10 }}>
        <ActionIcon
          size="xl"
          radius="xl"
          color="blue"
          onClick={() => router.push("/hospital/form")}
        >
          <IconPlus size={24} />
        </ActionIcon>
      </Box>
    </MobileLayout>
  );
};

const Item = (item: HospitalRecord) => {
  return (
    <Paper withBorder p="md" radius="md" bg="white">
      <Flex justify="space-between" align="center" mb="xs">
        <Text fw={600} fz="md">
          {item.mdexmnDgnssNm}
        </Text>
        <Text fz="md" c="dimmed">
          {item.hospital}
        </Text>
      </Flex>
      <Text fz="sm" c="gray.6">
        {item.mdexmnRcordDt}
      </Text>
    </Paper>
  );
};

const sampleRecords: hospitalRecord[] = [
  {
    mdexmnRcordDt: "2024.11.30",
    hsptlNo: "H001",
    hsptlDrctr: "김의사",
    mdexmnMdlrt: "외용약 처방",
    mdexmnDgnssNm: "감기",
    mdexmnMemo: "기침과 콧물 증상으로 내원",
    file: "file1.pdf",
    chldrnNo: "C001",
    drugNm: "타이레놀 시럽",
    hospital: "서울대학교 병원",
  },
  {
    mdexmnRcordDt: "2024.11.29",
    hsptlNo: "H002",
    hsptlDrctr: "박의사",
    mdexmnMdlrt: "주사 치료",
    mdexmnDgnssNm: "장염",
    mdexmnMemo: "복통과 설사 증상",
    file: "file2.pdf",
    chldrnNo: "C001",
    drugNm: "정장제",
    hospital: "서울대학교 병원",
  },
  {
    mdexmnRcordDt: "2024.11.28",
    hsptlNo: "H003",
    hsptlDrctr: "이의사",
    mdexmnMdlrt: "물리치료",
    mdexmnDgnssNm: "염좌",
    mdexmnMemo: "발목 삠",
    file: "file3.pdf",
    chldrnNo: "C001",
    drugNm: "파스",
    hospital: "서울대학교 병원",
  },
];

export default Hospital;
