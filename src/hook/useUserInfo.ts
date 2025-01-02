import useUserStore from "@/store/useUserStore";

// useAuth.ts 같은 커스텀 훅으로 만들기
const useUserInfo = () => {
    const { chldrnNo, setChldrnNo } = useUserStore();

    const getUserInfo = () => {
        // 1. 먼저 Zustand store 확인
        if (chldrnNo) {
            return chldrnNo;
        }

        // 2. store에 없으면 localStorage 확인
        const stored = localStorage.getItem("userInfo");
        if (stored) {
            const parsedData = JSON.parse(stored);
            const storedChldrnNo = parsedData.state.chldrnNo;

            // localStorage에 있으면 Zustand store에도 다시 설정
            if (storedChldrnNo) {
                setChldrnNo(storedChldrnNo);
                return storedChldrnNo;
            }
        }

        return null; // 둘 다 없으면 null 반환
    };

    return { getUserInfo };
};

export default useUserInfo;
