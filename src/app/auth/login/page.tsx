"use client";

import InputForm from "@/components/form/InputForm";
import Header from "@/components/header/Header";
import LoadingFullScreen from "@/components/loading/LoadingFullScreen";
import Button from "@/elements/button/Button";
import Container from "@/elements/container/Container";
import Spacer from "@/elements/spacer/Spacer";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css";

const LoginPage = () => {
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        document.cookie = `refreshToken=${
          data.data.refreshToken
        }; path=/; max-age=${7 * 24 * 60 * 60}; secure`;
        router.push("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="container" full>
      <LoadingFullScreen isVisible={loading} />
      <Header title="로그인" onBack={() => {}} />
      <Spacer height={50} />
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <InputForm
          labelText="아이디"
          placeholder="아이디를 입력해주세요"
          labelCss="inputForm"
          value={userId}
          onChange={setUserId}
        />
        <Spacer height={32} />
        <InputForm
          labelText="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          labelCss="inputForm"
          value={password}
          onChange={setPassword}
          type="password"
        />

        <div
          style={{
            display: "flex",
            border: "none",
            background: "#fff",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <p
            className={styles.signupButton}
            onClick={() => router.push("/auth/signup")}
          >
            회원가입하기
          </p>
        </div>

        <div style={{ flex: 1 }} />
        <Button type="submit" label="로그인" />
      </form>
    </Container>
  );
};

export default LoginPage;
