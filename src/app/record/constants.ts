export const SLIDES = [
  "수면",
  "수유",
  "배변",
  "체온",
  "몸무게/키",
  "머리둘레",
  "감정",
  "특이증상",
  "약",
  "기타",
];

export const RECORDS = [
  {
    title: "수유",
    src: "/images/feeding.png",
    path: "/record/FEEDING",
    type: "FEEDING",
  },
  {
    title: "배변",
    src: "/images/diaper.png",
    path: "/record/DIAPER",
    type: "DIAPER",
  },
  {
    title: "수면",
    src: "/images/sleep.png",
    path: "/record/SLEEP",
    type: "SLEEP",
  },
  {
    title: "체온",
    src: "/images/temperature.png",
    path: "/record/TEMPERATURE",
    type: "TEMPERATURE",
  },
  {
    title: "신체정보",
    src: "/images/scale.png",
    path: "/record/GROWTH",
    type: "GROWTH",
  },
  {
    title: "감정",
    src: "/images/heart.png",
    path: "/record/EMOTION",
    type: "EMOTION",
  },
  {
    title: "특이증상",
    src: "/images/info.png",
    path: "/record/SYMPTOM",
    type: "SYMPTOM",
  },
  {
    title: "약",
    src: "/images/medicine.png",
    path: "/record/MEDICINE",
    type: "MEDICINE",
  },
  {
    title: "기타",
    src: "/images/etc.png",
    path: "/record/ETC",
    type: "ETC",
  },
] as const;

export const TYPE_PATH_MAP = {
  수유: "/record/feeding",
  배설: "/record/buHist",
  수면: "/record/sleep",
  체온: "/record/heat",
  "몸무게/키": "/record/hgWgh",
  머리둘레: "/record/hgWgh",
  감정: "/record/emotion",
  특이증상: "/record/symptm",
  약: "/record/takngHist",
  기타: "/record/etc",
} as const;

export const TYPE_MAP = {
  FEEDING: "수유",
  DIAPER: "배변",
  SLEEP: "수면",
  TEMPERATURE: "체온",
  GROWTH: "성장",
  EMOTION: "감정",
  SYMPTOM: "특이증상",
  MEDICINE: "투약",
  ETC: "기타",
} as const;
