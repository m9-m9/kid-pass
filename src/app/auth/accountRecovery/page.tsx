"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  Button,
  Text,
  Box,
  Tabs,
  LoadingOverlay,
  AppShell,
  Grid,
  rem,
} from "@mantine/core";
import MobileLayout from "@/components/mantine/MobileLayout";
import { useForm } from "@mantine/form";

interface FormValues {
  userId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  verificationCode: string;
}

const AccountRecoveryPage = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("id");

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const form = useForm<FormValues>({
    initialValues: {
      userId: "",
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      verificationCode: "",
    },
    validate: {
      userId: (value) => (value.length > 0 ? null : "아이디를 입력해주세요"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "올바른 이메일을 입력해주세요",
      password: (value) =>
        value.length >= 6 ? null : "비밀번호는 6자 이상이어야 합니다",
      passwordConfirm: (value, values) =>
        value === values.password ? null : "비밀번호가 일치하지 않습니다",
      name: (value) => (value.length > 0 ? null : "이름을 입력해주세요"),
    },
  });

  const handleBack = () => router.push("/auth/login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 여기에 계정 찾기 API 호출 로직 구현
      // const response = await fetch("/api/auth/recovery", ...);

      // 임시 지연 효과
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 처리
      if (activeTab === "id") {
        // 아이디 찾기 성공 처리
        router.push("/auth/recovery-result");
      } else {
        // 비밀번호 찾기 성공 처리
        router.push("/auth/password-reset");
      }
    } catch (error) {
      alert(
        `${
          activeTab === "id" ? "아이디" : "비밀번호"
        } 찾기 중 오류가 발생했습니다.`
      );
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async () => {
    setLoading(true);

    try {
      // 실제 구현에서는 서버에 요청을 보내 이메일로 인증코드를 전송
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.values.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        alert("인증번호가 이메일로 전송되었습니다.");
      } else {
        alert(data.message || "인증번호 전송에 실패했습니다.");
      }
    } catch (error) {
      alert("인증번호 전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailCode = async () => {
    setLoading(true);

    try {
      // 실제 구현에서는 서버에 인증코드 확인 요청
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.values.email,
          code: form.values.verificationCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailVerified(true);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        alert(data.message || "인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      alert("인증 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout
      showHeader={true}
      headerType="back"
      title="계정찾기"
      showBottomNav={false}
      onBack={handleBack}
    >
      <Box pos="relative" style={{ height: "100%" }}>
        <LoadingOverlay visible={loading} />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(value) => setActiveTab(value || "")}
            radius={0}
            styles={{
              tabLabel: {
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
          >
            <Tabs.List grow mb="md">
              <Tabs.Tab value="id">아이디 찾기</Tabs.Tab>
              <Tabs.Tab value="password">비밀번호 찾기</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="id" p="md">
              <Box mb="md">
                <Text size="md" fw={500} mb={10}>
                  이름
                </Text>
                <TextInput
                  size="md"
                  placeholder="김철수"
                  {...form.getInputProps("name")}
                />
              </Box>

              <Box mb="md">
                <Text size="md" fw={500} mb={10}>
                  이메일 주소
                </Text>
                <TextInput
                  size="md"
                  placeholder="todayschild@mail.com"
                  {...form.getInputProps("email")}
                />
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="password" p="md">
              <Box mb="md">
                <Text size="md" fw={500} mb={10}>
                  아이디
                </Text>
                <TextInput
                  placeholder="todayschild@mail.com"
                  {...form.getInputProps("email")}
                  size="md"
                />
              </Box>

              <Box mb="lg" mt={rem(20)}>
                <Text size="md" fw={500} mb={10}>
                  이메일
                </Text>
                <Grid gutter="xs">
                  <Grid.Col span={8}>
                    <TextInput
                      placeholder="todayschild@mail.com"
                      size="md"
                      disabled={emailSent}
                      {...form.getInputProps("email")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Button
                      fullWidth
                      onClick={sendVerificationEmail}
                      disabled={emailSent && emailVerified}
                      color="blue"
                    >
                      {emailSent ? "재전송" : "인증"}
                    </Button>
                  </Grid.Col>
                </Grid>
              </Box>

              <Box mb="lg">
                <Text size="md" fw={500} mb={10}>
                  인증번호
                </Text>
                <Grid gutter="xs">
                  <Grid.Col span={8}>
                    <TextInput
                      placeholder="인증 번호를 입력해 주세요"
                      size="md"
                      {...form.getInputProps("verificationCode")}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Button
                      fullWidth
                      onClick={verifyEmailCode}
                      color="blue"
                      bg={emailSent && !emailVerified ? "brand.7" : "gray.3"}
                      disabled={!emailSent || emailVerified}
                    >
                      확인
                    </Button>
                  </Grid.Col>
                </Grid>
              </Box>
            </Tabs.Panel>
          </Tabs>

          <Box style={{ flex: 1 }} />

          <AppShell.Footer>
            <Box p="md">
              <Button type="submit" size="md" fullWidth color="blue">
                다음
              </Button>
            </Box>
          </AppShell.Footer>
        </form>
      </Box>
    </MobileLayout>
  );
};

export default AccountRecoveryPage;
