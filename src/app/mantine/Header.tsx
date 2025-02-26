import React from "react";
import { Flex, Title, ActionIcon, Avatar, Box } from "@mantine/core";

interface HeaderProps {
  type: "back" | "profile";
  title?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ type, title, onBack }) => {
  if (type === "back") {
    return (
      <Flex
        h={60}
        px="md"
        align="center"
        justify="space-between"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      >
        <Flex align="center">
          <ActionIcon onClick={onBack} size="lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </ActionIcon>
          <Title order={3} ml="md">
            {title}
          </Title>
        </Flex>
      </Flex>
    );
  }

  if (type === "profile") {
    return (
      <Flex
        h={60}
        px="md"
        align="center"
        justify="space-between"
        style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
      >
        <Title order={3}>{title}</Title>
        <Avatar color="brand" radius="xl" size="md" />
      </Flex>
    );
  }

  return null;
};

export default Header;
