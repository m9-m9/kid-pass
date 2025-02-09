export interface VaccineType {
  id: number;
  name: string;
  requiredCount: number;
}

// constants/vaccineList.ts
export const VACCINE_LIST: VaccineType[] = [
  { id: 1, name: "결핵", requiredCount: 1 },
  { id: 2, name: "B형간염", requiredCount: 3 },
  { id: 3, name: "디프테리아", requiredCount: 6 },
  { id: 4, name: "파상풍", requiredCount: 6 },
  { id: 5, name: "백일해", requiredCount: 6 },
  { id: 6, name: "폴리오", requiredCount: 4 },
  { id: 7, name: "Hib(b형헤모필루스 인플루엔자)", requiredCount: 4 },
  { id: 8, name: "페렴구균", requiredCount: 4 },
  { id: 9, name: "홍역", requiredCount: 2 },
  { id: 10, name: "볼거리(유행성 이하선염)", requiredCount: 2 },
  { id: 11, name: "풍진", requiredCount: 2 },
  { id: 12, name: "수두", requiredCount: 1 },
  { id: 13, name: "A형간염", requiredCount: 2 },
  { id: 14, name: "일본뇌염", requiredCount: 7 },
  { id: 15, name: "HPV(사람유두종바이러스 감염증)", requiredCount: 2 },
  { id: 16, name: "로티바이러스", requiredCount: 5 }
];

// 전체 필수 예방접종 횟수 계산을 위한 유틸리티 함수
export const getTotalRequiredVaccinations = (): number => {
  return VACCINE_LIST.reduce((sum, vaccine) => sum + vaccine.requiredCount, 0);
};