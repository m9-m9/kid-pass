"use client";

import MobileLayout from "@/components/mantine/MobileLayout";
import { Container, Stack, Text, Box, rem } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import useAuth from "@/hook/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const { getUserInfo } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    fetchUserInfo();
  }, []);

  return (
    <MobileLayout
      showHeader={true}
      headerType="back"
      title="더보기"
      currentRoute="/more"
    >
      <Container
        p={0}
        h="100%"
        bg="gray.1"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box style={{ flex: 1 }}>
          {/* Profile Section */}
          <Box
            p={rem(16)}
            pt={0}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Box
              style={{ display: "flex", alignItems: "center", gap: rem(12) }}
            >
              <Box
                style={{
                  width: rem(40),
                  height: rem(40),
                  borderRadius: "50%",
                }}
              >
                <img
                  src="/profile.png"
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Stack gap={rem(2)}>
                <Text fw={500} size={rem(14)}>
                  {userInfo?.name}
                </Text>
                <Text size={rem(12)} c="#6c757d">
                  {userInfo?.email}
                </Text>
              </Stack>
            </Box>
            <IconChevronRight size={16} color="#9e9e9e" />
          </Box>

          {/* Menu Section */}
          <Box mt={rem(16)}>
            {/* Group 1 */}
            <Box>
              <Text size={rem(12)} fw={500} c="dimmed" px={rem(16)} py={rem(8)}>
                내 도구함
              </Text>
              <Box style={{ backgroundColor: "white" }}>
                <MenuItem label="웹툴 템플릿" hasArrow />
                <MenuItem label="건강뉴스 즐겨찾기" hasArrow />
              </Box>
            </Box>

            {/* Group 2 */}
            <Box mt={rem(16)}>
              <Text size={rem(12)} fw={500} c="dimmed" px={rem(16)} py={rem(8)}>
                고객센터
              </Text>
              <Box style={{ backgroundColor: "white" }}>
                <MenuItem label="공지사항" hasArrow />
                <MenuItem label="자주 묻는 질문" hasArrow />
                <MenuItem label="1:1 문의" hasArrow />
                <MenuItem label="이용약관" hasArrow />
              </Box>
            </Box>

            {/* App Version */}
            <Box mt={rem(16)} style={{ backgroundColor: "white" }}>
              <MenuItem
                label="앱 버전"
                rightElement={
                  <Text size={rem(14)} c="#6c757d">
                    v 1.0.0
                  </Text>
                }
                hasArrow={false}
              />
              <MenuItem
                label="로그아웃"
                rightElement={null}
                hasArrow={false}
                onClick={() => {
                  localStorage.removeItem("kidlove");
                  router.push("/auth/login");
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </MobileLayout>
  );
};

// Helper component for menu items
const MenuItem = ({
  label,
  rightElement,
  hasArrow = false,
  onClick,
}: {
  label: string;
  rightElement?: React.ReactNode;
  hasArrow: boolean;
  onClick?: () => void;
}) => (
  <Box
    py={rem(16)}
    px={rem(16)}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      borderBottom: "1px solid #f1f3f5",
    }}
    onClick={onClick}
  >
    <Text size={rem(14)}>{label}</Text>
    {hasArrow ? <IconChevronRight size={16} color="#9e9e9e" /> : rightElement}
  </Box>
);

export default App;
