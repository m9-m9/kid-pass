import React from "react";
import styles from "./auth.module.css";
import "remixicon/fonts/remixicon.css";
import Button from "@/elements/button/Button";
import Spacer from "@/elements/spacer/Spacer";
import useAuthSocial from "./useAuthSocial";

const AuthScreen = () => {
  const { user, handleLogin } = useAuthSocial();

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>아이가 아픈 이유가 뭘까요?</h1>
        <p className={styles.description}>
          남씨처럼 하루하루가 다른
          <br />
          아이의 정확한 증상을 알고싶은
          <br />
          엄마들에게 도움이 되고싶어요.
        </p>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => handleLogin("kakao", true)}
            style={{ background: "#fee500", color: "#000" }}
            label={
              <div className={styles.buttonItem}>
                <i className="ri-kakao-talk-fill"></i>
                <span className={styles.buttonLabel}>카카오로 계속하기</span>

                <Spacer width={10} />
              </div>
            }
          />

          <Button
            style={{ backgroundColor: "#000", color: "#fff" }}
            label={
              <div className={styles.buttonItem}>
                <i className="ri-apple-fill"></i>
                <span className={styles.buttonLabel}>Apple로 계속하기</span>
                <Spacer width={10} />
              </div>
            }
          />

          <Button
            onClick={() => handleLogin("google", true)}
            style={{ backgroundColor: "#f2f2f2", color: "#000" }}
            label={
              <div className={styles.buttonItem}>
                <i className="ri-google-fill"></i>
                <span className={styles.buttonLabel}>Google로 계속하기</span>
                <Spacer width={10} />
              </div>
            }
          />

          {/* Email Login */}
          <div style={{ display: "flex", border: "none", background: "#fff", justifyContent: "center" }}>
            <p className={styles.emailButton}>이메일로 계속하기</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
