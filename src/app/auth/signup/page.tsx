"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "@/components/form/InputForm";
import Button from "@/elements/button/Button";
import Container from "@/elements/container/Container";
import Spacer from "@/elements/spacer/Spacer";
import Header from "@/components/header/Header";

const SignupPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const signupData = {
      userId,
      email,
      password,
      name,
    };

    console.log("회원가입 요청 데이터:", signupData); // 디버깅용 로그

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        router.push("/auth/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container className="container" full>
      <Header title="회원가입" onBack={() => router.back()} />
      <Spacer height={50} />
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <InputForm
          labelText="아이디"
          placeholder="아이디를 입력해주세요"
          labelCss="inputForm"
          value={userId}
          onChange={setUserId}
          type="text"
        />
        <Spacer height={32} />
        <InputForm
          labelText="이메일"
          placeholder="이메일을 입력해주세요"
          labelCss="inputForm"
          value={email}
          onChange={setEmail}
          type="email"
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
        <Spacer height={32} />
        <InputForm
          labelText="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          labelCss="inputForm"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          type="password"
        />
        <Spacer height={32} />
        <InputForm
          labelText="이름"
          placeholder="이름을 입력해주세요"
          labelCss="inputForm"
          value={name}
          onChange={setName}
        />
        <div style={{ flex: 1 }} />
        <Button type="submit" label="가입하기" />
      </form>
    </Container>
  );
};

export default SignupPage;
