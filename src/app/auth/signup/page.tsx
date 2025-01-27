"use client";

import InputForm from "@/components/form/InputForm";
import Header from "@/components/header/Header";
import LoadingFullScreen from "@/components/loading/LoadingFullScreen";
import Button from "@/elements/button/Button";
import Container from "@/elements/container/Container";
import Spacer from "@/elements/spacer/Spacer";
import useFetch from "@/hook/useFetch";
import useAuthStore from "@/store/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const searchParams = useSearchParams();
  const { setAccessToken, setRefreshToken } = useAuthStore();
  const router = useRouter();

  const [mberId, setMberId] = useState("");
  const [mberPw, setMberPw] = useState("");
  const [mberPwChk, setMberPwChk] = useState("");

  const { sendRequest, responseData, loading, destroy } = useFetch<any>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      mberId,
      mberPw,
      mberSexdstn: "F",
      mberSttus: "PLAN",
    };
    const formData = new FormData();
    formData.append("Member", JSON.stringify(body));
    formData.append("file", "");

    sendRequest({
      url: "authenticate/signup",
      method: "POST",
      body: formData,
    });
  };

  useEffect(() => {
    if (responseData) {
      if (responseData && responseData.msg === "succes") {
        setAccessToken(responseData.data.accessToken);
        setRefreshToken(responseData.data.refreshToken);
      }
    }
  }, [responseData]);

  return (
    <Container className="container" full>
      <LoadingFullScreen isVisible={loading} />
      <Header title="회원가입" onBack={() => router.back()} />
      {/* <Spacer height={50} /> */}
      <form
        onSubmit={(e) => handleLogin(e)}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <InputForm
          labelText="이메일"
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
          type="password"
          showPasswordToggle
        />
        <Spacer height={32} />
        <InputForm
          labelText="비밀번호 확인"
          placeholder="문자와 숫자를 포함한 8~20자"
          labelCss="inputForm"
          value={mberPw}
          onChange={setMberPw}
          type="password"
          showPasswordToggle
        />
        <div style={{ flex: 1 }} />
        <Button type="submit" label="다음" />
      </form>
    </Container>
  );
};

export default App;