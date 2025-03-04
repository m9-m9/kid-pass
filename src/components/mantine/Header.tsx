import React from "react";
import {
  Flex,
  Title,
  ActionIcon,
  Avatar,
  Box,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import WeeklyDatePicker from "@/components/datePicker/WeekCarousel";
import useCurrentDateStore from "@/store/useCurrentDateStore";
import dayjs from "dayjs";

interface HeaderProps {
  type: "back" | "profile";
  title?: string;
  onBack?: () => void;
  useWeekCarousel?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  type,
  title,
  onBack,
  useWeekCarousel,
}) => {
  const { currentDate, setCurrentDate } = useCurrentDateStore();

  if (type === "back") {
    return (
      <Flex
        h={60}
        px="md"
        align="center"
        justify="space-between"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      >
        <ActionIcon onClick={onBack} size="lg" bg="transparent">
          <IconChevronLeft stroke={2} />
        </ActionIcon>
        <Title
          order={4}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) translateY(10%)",
          }}
        >
          {title}
        </Title>
        <Box w={44}></Box>
      </Flex>
    );
  }

  if (type === "profile") {
    return (
      <Box>
        <Flex h={60} px="md" align="center" justify="space-between">
          <Flex align="flex-end">
            <Title w={100} order={3}>
              {currentDate.format("M월 D일")}
            </Title>
            <UnstyledButton
              ml="xs"
              px="xs"
              py={1}
              bg="brand.1"
              c="brand.7"
              fw={600}
              style={{
                borderRadius: "4px",
              }}
              onClick={() => setCurrentDate(dayjs())}
            >
              오늘
            </UnstyledButton>
          </Flex>
          <Avatar color="brand" radius="xl" size="md" />
        </Flex>

        {useWeekCarousel && (
          <WeeklyDatePicker
            currentDate={currentDate}
            onSelect={setCurrentDate}
          />
        )}
      </Box>
    );
  }

  return null;
};

export default Header;
