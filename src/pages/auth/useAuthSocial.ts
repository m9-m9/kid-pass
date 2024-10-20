import { useEffect, useMemo, useState } from "react";
import { GoogleLoginProvider } from "./google";
import { KakaoLoginProvider } from "./kakao";
import { SocialLoginResult, SocialType } from "./model";

const firebaseConfig = {
  apiKey: "AIzaSyD6RnrVgwMaQaC9GbVdaxqGeP9srXf6Jd4",
  authDomain: "kidpass-b2e15.firebaseapp.com",
  projectId: "kidpass-b2e15",
  storageBucket: "kidpass-b2e15.appspot.com",
  messagingSenderId: "829184695617",
  appId: "1:829184695617:web:64ff946769042666d495c0",
};
const kakaoClientId = "1bf8beb8e963a381f6cdf1639d02f616";

const googleLogin = new GoogleLoginProvider(firebaseConfig);
const kakaoLogin = new KakaoLoginProvider(kakaoClientId);

const useAuthSocial = () => {
  const [user, setUser] = useState<SocialLoginResult | null>(null);

  const providers = useMemo(() => {
    return {
      google: new GoogleLoginProvider(firebaseConfig),
      kakao: new KakaoLoginProvider(kakaoClientId),
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await googleLogin.initialize();
      await kakaoLogin.initialize();

      const googleResult = await googleLogin.getRedirectResult();
      if (googleResult) {
        setUser(googleResult);
        return;
      }

      const kakaoResult = await kakaoLogin.getRedirectResult();
      if (kakaoResult) {
        setUser(kakaoResult);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (socialType: SocialType, usePopup: boolean) => {
    const provider = providers[socialType];

    try {
      if (usePopup) {
        const result = await provider.loginWithPopup();
        setUser(result);
      } else {
        await provider.loginWithRedirect();
        // 리다이렉트 후 페이지가 다시 로드되면 useEffect에서 결과를 처리합니다.
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      if (user) {
        if (user.provider === "google") {
          await googleLogin.logout();
        } else if (user.provider === "kakao") {
          await kakaoLogin.logout();
        }
        setUser(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { user, handleLogin, handleLogout };
};

export default useAuthSocial;
