"use client";

import { useEffect, useState } from "react";
import Button from "../../../elements/button/Button";
import useAuthSocial from "../useAuthSocial";
import styles from "./signup.module.css";
import useFetch from "@/hook/useFetch";

interface SignUpForm {
  mberId: string;
  mberPw: string;
  mberNcnm: string;
  mberSexdstn: "F" | "M";
  mberSttus: "PLAN" | "PREGNAN" | "CHLDRN";
}

const SignUp: React.FC = () => {
  const { user, handleLogin } = useAuthSocial();
  const [body, setBody] = useState<SignUpForm>({
    mberId: "",
    mberPw: "",
    mberNcnm: "",
    mberSexdstn: "F",
    mberSttus: "PLAN",
  });
  const { sendRequest, responseData, loading, destroy } = useFetch<any>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    return () => {
      destroy();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // 이미지 미리보기 URL 생성
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("Member", new Blob([JSON.stringify(body)], { type: "application/json" }));
    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    sendRequest({ url: "authenticate/signup", body: formData, method: "POST" });
  };

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원가입</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.imageUploadContainer}>
          <label className={styles.imageUploadLabel}>
            {previewUrl ? (
              <img src={previewUrl} alt="Profile preview" className={styles.previewImage} />
            ) : (
              <div className={styles.uploadPlaceholder}>프로필 이미지 선택</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className={styles.hiddenInput} />
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>아이디</label>
          <input
            className={styles.input}
            type="text"
            name="mberId"
            value={body.mberId}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>비밀번호</label>
          <input
            className={styles.input}
            type="password"
            name="mberPw"
            value={body.mberPw}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            name="mberNcnm"
            value={body.mberNcnm}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>성별</label>
          <select className={styles.select} name="mberSexdstn" value={body.mberSexdstn} onChange={handleChange}>
            <option value="F">여성</option>
            <option value="M">남성</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>상태</label>
          <select className={styles.select} name="mberSttus" value={body.mberSttus} onChange={handleChange}>
            <option value="PLAN">임신 계획중</option>
            <option value="PREGNAN">임신중</option>
            <option value="CHLDRN">자녀있음</option>
          </select>
        </div>

        <Button label="가입하기" type="submit" />

        <div className={styles.divider}>또는</div>

        <div className={styles.socialButtons}>
          <Button label="구글로 가입" onClick={() => handleLogin("google", true)} style={{ flex: 1 }} />
          <Button label="카카오로 가입" onClick={() => handleLogin("kakao", true)} style={{ flex: 1 }} />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
