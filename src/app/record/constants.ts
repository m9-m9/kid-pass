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
    path: "/record/feeding",
  },
  {
    title: "배설",
    src: "/images/diaper.png",
    path: "/record/buHist",
  },
  {
    title: "수면",
    src: "/images/sleep.png",
    path: "/record/sleep",
  },
  {
    title: "체온",
    src: "/images/temperature.png",
    path: "/record/heat",
  },
  {
    title: "몸무게/키/머리둘레",
    src: "/images/scale.png",
    path: "/record/hgWgh",
  },
  {
    title: "감정",
    src: "/images/heart.png",
    path: "/record/emotion",
  },
  {
    title: "특이증상",
    src: "/images/info.png",
    path: "/record/symptm",
  },
  {
    title: "약",
    src: "/images/medicine.png",
    path: "/record/takngHist",
  },
  {
    title: "기타",
    src: "/images/etc.png",
    path: "/record/etc",
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
