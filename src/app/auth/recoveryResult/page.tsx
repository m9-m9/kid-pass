"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Text, Button, Stack, AppShell, Image } from "@mantine/core";
import MobileLayout from "@/components/mantine/MobileLayout";

const RecoveryResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "id";
  const success = searchParams.get("success") === "true";
  const userId = searchParams.get("userId");
  const email = searchParams.get("email");

  const handleBack = () => router.push("/auth/accountRecovery");

  return (
    <MobileLayout
      showHeader={true}
      headerType="back"
      title={type === "id" ? "아이디 찾기" : "비밀번호 찾기"}
      showBottomNav={false}
      onBack={handleBack}
    >
      <Box pos="relative" px="md" style={{ height: "100%" }}>
        <Stack
          gap={32}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            maxWidth: "320px",
            margin: "0 auto",
          }}
        >
          <Image
            src={success ? "/images/cloud_check 2.png" : "/images/error.png"}
            alt="status icon"
            style={{ marginBottom: "8px", width: "160px", height: "160px" }}
          />

          {success ? (
            type === "id" ? (
              <Stack gap={24}>
                <Text size="24px" fw={600} c="dark.9">
                  아이디 찾기가 완료되었습니다
                </Text>
                <Box>
                  <Text size="16px" c="gray.6" mb={16}>
                    회원님의 아이디는
                  </Text>
                  <Text
                    size="24px"
                    fw={600}
                    c="brand.7"
                    p="md"
                    bg="gray.0"
                    style={{ borderRadius: "8px" }}
                  >
                    {userId}
                  </Text>
                </Box>
              </Stack>
            ) : (
              <Stack gap={24}>
                <Text size="24px" fw={600} c="dark.9">
                  임시 비밀번호가 발급되었습니다
                </Text>
                <Text size="16px" c="gray.6" lh={1.6}>
                  {email}으로
                  <br />
                  임시 비밀번호가 전송되었습니다.
                </Text>
              </Stack>
            )
          ) : (
            <Stack gap={24}>
              <Text size="24px" fw={600} c="dark.9">
                {type === "id" ? "아이디" : "비밀번호"}
                <br />
                찾기에 실패했습니다
              </Text>
              <Text size="16px" c="gray.6">
                입력하신 정보를 다시 확인해주세요.
              </Text>
            </Stack>
          )}
        </Stack>

        <AppShell.Footer>
          <Box p="md">
            <Button
              fullWidth
              size="md"
              color="blue"
              onClick={() => router.push("/auth/login")}
              style={{
                height: "48px",
                fontSize: "16px",
              }}
            >
              로그인하기
            </Button>
          </Box>
        </AppShell.Footer>
      </Box>
    </MobileLayout>
  );
};

export default RecoveryResultPage;
