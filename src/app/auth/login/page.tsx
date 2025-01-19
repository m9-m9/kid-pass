"use client";

import InputForm from "@/components/form/InputForm";
import Header from "@/components/header/Header";
import LoadingFullScreen from "@/components/loading/LoadingFullScreen";
import Button from "@/elements/button/Button";
import Container from "@/elements/container/Container";
import Spacer from "@/elements/spacer/Spacer";
import useFetch from "@/hook/useFetch";
import useUsrStore from "@/store/useUsrStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./login.module.css";
import instance from "@/utils/axios";

const App: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setAccessToken, setRefreshToken } = useUsrStore();

  const [mberId, setMberId] = useState("");
  const [mberPw, setMberPw] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await instance.post("authenticate/login", { mberId, mberPw });
      if (res.status === 200) {
        const { data } = res.data;
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; secure`;
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="container" full>
      <LoadingFullScreen />
      <Header title="이메일 로그인" onBack={() => {}} />
      <Spacer height={50} />
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <InputForm
          labelText="이메일 아이디"
          placeholder="todayschild@mail.com"
          labelCss="inputForm"
          value={mberId}
          onChange={setMberId}
        />
        <Spacer height={32} />
        <InputForm
          labelText="비밀번호"
          placeholder="문자와 숫자를 포함한 8~20자"
          labelCss="inputForm"
          value={mberPw}
          onChange={setMberPw}
        />

        {/* Email Login */}
        <div
          style={{
            display: "flex",
            border: "none",
            background: "#fff",
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          <p className={styles.signupButton}>회원가입하기</p>
        </div>

        <div style={{ flex: 1 }} />
        <Button type="submit" label="다음" />
      </form>
    </Container>
  );
};

export default App;
