export interface hospitalRecord {
  mdexmnRcordDt: string; // 기록날짜
  hsptlNo: string;
  hsptlDrctr: string; // 의사 이름
  mdexmnMdlrt: string; // 치료방법
  mdexmnDgnssNm: string; // 진단 명
  mdexmnMemo: string; // 메모
  file: string;
  chldrnNo: string;
  drugNm: string; // 약 이름
}
