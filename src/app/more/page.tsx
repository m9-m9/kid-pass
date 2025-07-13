"use client";

import MobileLayout from "@/components/mantine/MobileLayout";
import { Container, Stack, Text, Box, rem, Modal, Button } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import useAuth from "@/hook/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import useNavigation from "@/hook/useNavigation";

const App = () => {
  const { getUserInfo, getToken } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();
  const { goBack } = useNavigation();

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };
    fetchUserInfo();
  }, []);

  const handleWithdraw = async () => {
    try {
      const accessToken = await getToken();
      const response = await fetch("/api/auth/withdraw", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원탈퇴 실패");
      }

      // 로그아웃 처리
      notifications.show({
        title: "성공",
        message: "회원탈퇴가 완료되었습니다",
        color: "green",
      });
      localStorage.removeItem("kidlove");
      router.push("/auth/login");
    } catch (error) {
      console.error("회원탈퇴 에러:", error);
      notifications.show({
        title: "오류",
        message: "회원탈퇴에 실패했습니다",
        color: "red",
      });
    }
    setShowWithdrawModal(false);
  };

  return (
    <MobileLayout
      showHeader={true}
      headerType="back"
      title="더보기"
      currentRoute="/more"
      onBack={goBack}
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
            onClick={() => {
              router.push("/more/profile");
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: rem(12),
              }}
            >
              <Stack gap={rem(2)}>
                <Text fw={500} size={rem(14)}>
                  아이 프로필 관리
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
                내 보관함
              </Text>
              <Box style={{ backgroundColor: "white" }}>
                {/* <MenuItem label="찜한 병원/약국" hasArrow /> */}
                <MenuItem
                  label="아이 레포트"
                  hasArrow
                  onClick={() => {
                    router.push("/more/report");
                  }}
                />
                <MenuItem
                  label="건강뉴스"
                  hasArrow
                  onClick={() => {
                    router.push("/more/news");
                  }}
                />
                <MenuItem
                  label="병원기록"
                  hasArrow
                  onClick={() => {
                    router.push("/more/hospital");
                  }}
                />
              </Box>
            </Box>

            {/* Group 2 */}
            <Box mt={rem(16)}>
              <Text size={rem(12)} fw={500} c="dimmed" px={rem(16)} py={rem(8)}>
                고객센터
              </Text>
              <Box style={{ backgroundColor: "white" }}>
                <MenuItem
                  label="고객 지원"
                  hasArrow
                  onClick={() => {
                    router.push("/more/support");
                  }}
                />
                <MenuItem
                  label="개인정보처리 방침"
                  hasArrow
                  onClick={() => {
                    router.push("/more/privacy");
                  }}
                />
              </Box>
            </Box>

            {/* App Version */}
            <Box mt={rem(16)}>
              <Text size={rem(12)} fw={500} c="dimmed" px={rem(16)} py={rem(8)}>
                앱 정보
              </Text>
              <Box style={{ backgroundColor: "white" }}>
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
                    localStorage.removeItem("auth-storage");
                    if (window.ReactNativeWebView) {
                      window.ReactNativeWebView.postMessage(
                        JSON.stringify({
                          type: "logout",
                        })
                      );
                    }
                  }}
                />
                <MenuItem
                  label="비밀번호 변경"
                  rightElement={null}
                  hasArrow={false}
                  onClick={() => {
                    router.push("/auth/resetPassword");
                  }}
                />
                <MenuItem
                  label="회원탈퇴"
                  rightElement={null}
                  hasArrow={false}
                  onClick={() => setShowWithdrawModal(true)}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Modal
          opened={showWithdrawModal}
          onClose={() => setShowWithdrawModal(false)}
          title="회원탈퇴"
          centered
        >
          <Stack gap="xl">
            <Text size="sm">
              정말 탈퇴하시겠습니까?
              <br />
              탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
            </Text>
            <Button.Group style={{ gap: "12px" }}>
              <Button
                fullWidth
                onClick={() => setShowWithdrawModal(false)}
                c="white"
                size="md"
              >
                취소
              </Button>
              <Button
                c="white"
                bg="red"
                fullWidth
                onClick={handleWithdraw}
                size="md"
              >
                탈퇴하기
              </Button>
            </Button.Group>
          </Stack>
        </Modal>
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
