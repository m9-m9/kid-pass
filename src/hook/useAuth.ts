import useAuthStore from "@/store/useAuthStore";

// useAuth.ts 같은 커스텀 훅으로 만들기
const useAuth = () => {
    const { accessToken, setAccessToken } = useAuthStore();

    const getToken = () => {
        // 1. 먼저 Zustand store 확인
        if (accessToken) {
            return accessToken;
        }

        // 2. store에 없으면 localStorage 확인
        if (typeof localStorage !== "undefined") {
            const stored = localStorage.getItem("kidlove");
            if (stored) {
                const parsedData = JSON.parse(stored);
                const storedToken = parsedData.state.accessToken;
    
                // localStorage에 있으면 Zustand store에도 다시 설정
                if (storedToken) {
                    setAccessToken(storedToken);
                    return storedToken;
                }
            // 이후 처리
        } else {
            console.warn("localStorage is not available.");
        }
      
        }

        return null; // 둘 다 없으면 null 반환
    };

    return { getToken };
};

export default useAuth;
