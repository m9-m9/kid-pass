import React from "react";
import { Text, Center, Stack, Title } from "@mantine/core";
import Image from "next/image";
import Spacer from "@/elements/spacer/Spacer";
interface EmptyProps {
  title?: string;
  text?: string;
}

const Empty: React.FC<EmptyProps> = ({
  title = "데이터가 없습니다.",
  text = "오늘 하루 기록을 남겨주세요.",
}) => {
  return (
    <Center h="100%" py="xl">
      <Stack align="center" gap="md">
        <Image src="/images/empty.png" alt="No data" width={120} height={120} />
        <Stack align="center" gap={8}>
          <Title order={3} ta="center" c="dimmed">
            {title}
          </Title>

          <Text
            c="dimmed"
            fz="md"
            ta="center"
            style={{ whiteSpace: "pre-line" }}
          >
            {text}
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
};

export default Empty;
