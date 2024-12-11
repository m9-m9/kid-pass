"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const App: React.FC = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleLogin = async () => {
    try {
      const code = searchParams.get("code");

      if (!code) {
        throw new Error("Code parameter not found in the URL.");
      }

      const response = await fetch("http://localhost:8071/authenticate/login-with-kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${code}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log("Login response:", data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (code) {
      handleLogin();
    }
  }, [code]);

  return (
    <div>
      로그인
      <input />
      <input />
    </div>
  );
};

export default App;
