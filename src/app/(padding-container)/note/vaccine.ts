export interface VaccineType {
    id: number;
    name: string;
    totalCount: number;
}

// constants/vaccineList.ts
export const VACCINE_LIST: VaccineType[] = [
    { id: 1, name: '결핵', totalCount: 1 },
    { id: 2, name: 'B형간염', totalCount: 3 },
    { id: 3, name: '디프테리아', totalCount: 6 },
    { id: 4, name: '파상풍', totalCount: 6 },
    { id: 5, name: '백일해', totalCount: 6 },
    { id: 6, name: '폴리오', totalCount: 4 },
    { id: 7, name: 'b형헤모필루스', totalCount: 4 },
    { id: 8, name: '페렴구균', totalCount: 4 },
    { id: 9, name: '홍역', totalCount: 2 },
    { id: 10, name: '유행성 이하선염', totalCount: 2 },
    { id: 11, name: '풍진', totalCount: 2 },
    { id: 12, name: '수두', totalCount: 1 },
    { id: 13, name: 'A형간염', totalCount: 2 },
    { id: 14, name: '일본뇌염', totalCount: 7 },
    { id: 15, name: '사람유두종바이러스', totalCount: 2 },
    { id: 16, name: '로티바이러스', totalCount: 5 },
];

// 전체 필수 예방접종 횟수 계산을 위한 유틸리티 함수
export const getTotalRequiredVaccinations = (): number => {
    return VACCINE_LIST.reduce((sum, vaccine) => sum + vaccine.totalCount, 0);
};
