import { useEffect, useMemo, useState } from "react";
import { GoogleLoginProvider } from "./google";
import { KakaoLoginProvider } from "./kakao";
import { SocialLoginResult, SocialType } from "./model";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

export const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;

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
