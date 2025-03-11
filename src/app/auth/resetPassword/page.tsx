"use client";

import { useState } from "react";
import { TextInput, Button, Stack, Text, Box, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/mantine/MobileLayout";

interface ResetPasswordForm {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetPasswordForm>({
    initialValues: {
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "올바른 이메일을 입력해주세요",
      newPassword: (value) =>
        value.length < 6 ? "비밀번호는 6자 이상이어야 합니다" : null,
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "비밀번호가 일치하지 않습니다" : null,
    },
  });

  const handleSendVerification = async () => {
    if (!form.validateField("email").hasError) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.values.email }),
        });

        if (response.ok) {
          setIsEmailSent(true);
          notifications.show({
            title: "인증 코드 발송",
            message: "이메일로 인증 코드가 발송되었습니다",
            color: "green",
          });
        } else {
          throw new Error("인증 코드 발송 실패");
        }
      } catch (error) {
        notifications.show({
          title: "오류",
          message: "인증 코드 발송에 실패했습니다",
          color: "red",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (values: ResetPasswordForm) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          code: values.code,
          newPassword: values.newPassword,
        }),
      });

      if (response.ok) {
        notifications.show({
          title: "성공",
          message: "비밀번호가 변경되었습니다",
          color: "green",
        });
        router.push("/auth/login");
      } else {
        throw new Error("비밀번호 변경 실패");
      }
    } catch (error) {
      notifications.show({
        title: "오류",
        message: "비밀번호 변경에 실패했습니다",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout showHeader title="비밀번호 재설정">
      <Box p="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Box mb="lg">
              <Text size="md" fw={500} mb={10}>
                이메일
              </Text>
              <Grid gutter="xs">
                <Grid.Col span={8}>
                  <TextInput
                    placeholder="todayschild@mail.com"
                    size="md"
                    disabled={isEmailSent}
                    {...form.getInputProps("email")}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button
                    fullWidth
                    onClick={handleSendVerification}
                    disabled={isEmailSent}
                    color="blue"
                  >
                    {isEmailSent ? "재전송" : "인증"}
                  </Button>
                </Grid.Col>
              </Grid>
            </Box>

            {isEmailSent && (
              <>
                <TextInput
                  label="인증코드"
                  size="md"
                  placeholder="이메일로 받은 인증코드를 입력해주세요"
                  {...form.getInputProps("code")}
                />
                <TextInput
                  type="password"
                  label="새 비밀번호"
                  size="md"
                  placeholder="새로운 비밀번호를 입력해주세요"
                  {...form.getInputProps("newPassword")}
                />
                <TextInput
                  type="password"
                  label="새 비밀번호 확인"
                  size="md"
                  placeholder="새로운 비밀번호를 다시 입력해주세요"
                  {...form.getInputProps("confirmPassword")}
                />
              </>
            )}

            {isEmailSent && (
              <Button
                type="submit"
                loading={isLoading}
                size="md"
                fullWidth
                color="blue"
              >
                비밀번호 변경하기
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </MobileLayout>
  );
}
