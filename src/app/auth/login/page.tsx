"use client";

import { Box, Stack, Text, Button, Group, Loader } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import MobileLayout from "@/components/mantine/MobileLayout";
import Image from "next/image";
import { useViewportSize } from "@mantine/hooks";
import { KakaoLoginProvider } from "../kakao";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { notifications } from "@mantine/notifications";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { height } = useViewportSize();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);

  // 카카오 로그인 provider 초기화
  const kakaoProvider = new KakaoLoginProvider(
    process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!
  );

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setIsKakaoLoading(true);
      handleKakaoCallback(code);
      // URL에서 code 파라미터 제거
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [searchParams]);

  const handleKakaoCallback = async (code: string) => {
    try {
      // 인가 코드로 토큰 받기
      const result = await kakaoProvider.handleRedirect(code);
      if (!result) {
        throw new Error("카카오 로그인 실패");
      }

      // 서버에 소셜 로그인 인증 요청
      const response = await fetch("/api/auth/social-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "kakao",
          user: result.user,
        }),
      });

      if (!response.ok) {
        throw new Error("소셜 로그인 실패");
      }

      const data = await response.json();

      // 토큰 저장 및 리다이렉트
      if (data.data.accessToken) {
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        document.cookie = `refreshToken=${
          data.data.refreshToken
        }; path=/; max-age=${7 * 24 * 60 * 60}; secure`;

        notifications.show({
          title: "로그인 성공",
          message: "환영합니다!",
          color: "green",
        });

        router.push("/home");
      } else {
        throw new Error("토큰이 없습니다.");
      }
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      notifications.show({
        title: "로그인 실패",
        message: "로그인에 실패했습니다. 다시 시도해주세요.",
        color: "red",
      });
    } finally {
      setIsKakaoLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      await kakaoProvider.loginWithRedirect();
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      notifications.show({
        title: "로그인 실패",
        message: "로그인에 실패했습니다. 다시 시도해주세요.",
        color: "red",
      });
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <MobileLayout
      showHeader={false}
      headerType="back"
      title="로그인"
      showBottomNav={false}
      onBack={handleBack}
    >
      {isKakaoLoading && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Stack align="center">
            <Loader size="lg" />
            <Text>로그인 중...</Text>
          </Stack>
        </Box>
      )}

      <Box
        p="md"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: height,
        }}
      >
        <Box>
          <Text fz={24} fw={600} ta="center">
            아이가 아픈 이유가 뭘까요?
          </Text>
          <Text
            c="dimmed"
            ta="center"
            mt="sm"
            style={{ whiteSpace: "pre-line" }}
          >
            날씨처럼 하루하루가 다른{"\n"}
            아이의 정확한 증상을 알고싶은{"\n"}
            엄마들에게 도움이 되고싶어요.
          </Text>
        </Box>
        <Stack gap="xl">
          <Stack gap="md" mt={40}>
            <Button
              variant="filled"
              bg="#FEE500"
              leftSection={
                isLoading ? (
                  <Loader size="sm" color="dark" />
                ) : (
                  <Image
                    src="/images/kakao.icon.png"
                    alt="카카오 로그인"
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                  />
                )
              }
              fullWidth
              onClick={handleKakaoLogin}
              disabled={isLoading || isKakaoLoading}
            >
              {isLoading ? "로그인 중..." : "카카오로 계속하기"}
            </Button>

            <Button
              variant="filled"
              bg="#000000"
              leftSection={
                <Image
                  src="/images/apple.icon.png"
                  alt="애플 로그인"
                  width={20}
                  height={20}
                  style={{ objectFit: "contain" }}
                />
              }
              fullWidth
              c="white"
              onClick={() => {
                /* 애플 로그인 처리 */
              }}
            >
              Apple로 계속하기
            </Button>

            <Button
              variant="filled"
              bg="#F2F2F2"
              leftSection={
                <Image
                  src="/images/google.icon.png"
                  alt="구글 로그인"
                  width={20}
                  height={20}
                  style={{ objectFit: "contain" }}
                />
              }
              fullWidth
              onClick={() => {
                /* 구글 로그인 처리 */
              }}
            >
              Google로 계속하기
            </Button>
          </Stack>

          <Group justify="center" gap={4}>
            <Button
              variant="filled"
              bg="white"
              c="black"
              size="sm"
              onClick={() => router.push("/auth/emailLogin")}
            >
              이메일로 계속하기
            </Button>
          </Group>
        </Stack>
      </Box>
    </MobileLayout>
  );
};

export default LoginPage;
