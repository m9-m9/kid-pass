import useAuthStore from "@/store/useAuthStore";

// useAuth.ts 같은 커스텀 훅으로 만들기
const useAuth = () => {
  const { accessToken, setAccessToken, crtChldrnNo, setCrtChldrnNo } =
    useAuthStore();

  const getToken = async () => {
    // 1. 먼저 Zustand store 확인
    if (accessToken) {
      return accessToken;
    }

    // 2. store에 없으면 localStorage 확인
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("kidlove");
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          const storedToken = parsedData.state.accessToken;
          const storedRefreshToken = parsedData.state.refreshToken;

          if (!storedToken) {
            return null;
          }

          // 토큰 검증
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            setAccessToken(storedToken);
            return storedToken;
          } else {
            // 토큰이 만료되었다면 리프레시 토큰으로 새로운 액세스 토큰 발급
            const refreshResponse = await fetch("/api/auth/refresh", {
              headers: {
                Authorization: `Bearer ${storedRefreshToken}`,
              },
            });

            if (refreshResponse.ok) {
              const { accessToken: newAccessToken } =
                await refreshResponse.json();
              setAccessToken(newAccessToken);
              return newAccessToken;
            }
          }
        } catch (error) {
          return null;
        }
      }
    }

    return null;
  };

  // 현재 접속중인 아이번호 가져오기
  const getCrtChldNo = () => {
    if (crtChldrnNo) {
      return crtChldrnNo;
    }

    const stored = localStorage.getItem("kidlove");
    if (stored) {
      const parsedData = JSON.parse(stored);
      const storedCurrentChldrnNo = parsedData.state;
      if (storedCurrentChldrnNo) {
        setCrtChldrnNo(storedCurrentChldrnNo);
        return storedCurrentChldrnNo;
      }
    }

    return null; // 둘다 없으면 null 반환
  };

  return { getToken, getCrtChldNo };
};

export default useAuth;
