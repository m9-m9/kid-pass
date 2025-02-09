"use client";

import FloatingBtn from "@/components/floatingBtn/FloatingBtn";
import styles from "./hostpial.module.css";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";
import { hospitalRecord } from "./type/hospital";
import Container from "@/elements/container/Container";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";
import ProfileHeader from "@/components/header/ProfileHeader";

const Hospital = () => {
  const router = useRouter();

  return (
    <Container className="container">
      <ProfileHeader
        icon={<i className="ri-calendar-line" />}
        path="/hospital"
      />
      {sampleRecords.map((record, index) => (
        <Item key={record.hsptlNo} {...record} />
      ))}

      <FloatingBtn
        onClick={() => router.push("/hospital/form")}
        children={undefined}
      />
      <BottomNavigation />
    </Container>
  );
};

const Item = (item: hospitalRecord) => {
  return (
    <div className={styles.medicineCard}>
      <div className={styles.header}>
        <div className={styles.title}>{item.mdexmnDgnssNm}</div>
        <div className={styles.actionButton}>처방전</div>
      </div>
      <div className={styles.date}>{item.mdexmnRcordDt}</div>
    </div>
  );
};

const sampleRecords: hospitalRecord[] = [
  {
    mdexmnRcordDt: "2024.11.30",
    hsptlNo: "H001",
    hsptlDrctr: "김의사",
    mdexmnMdlrt: "외용약 처방",
    mdexmnDgnssNm: "감기",
    mdexmnMemo: "기침과 콧물 증상으로 내원",
    file: "file1.pdf",
    chldrnNo: "C001",
    drugNm: "타이레놀 시럽",
  },
  {
    mdexmnRcordDt: "2024.11.29",
    hsptlNo: "H002",
    hsptlDrctr: "박의사",
    mdexmnMdlrt: "주사 치료",
    mdexmnDgnssNm: "장염",
    mdexmnMemo: "복통과 설사 증상",
    file: "file2.pdf",
    chldrnNo: "C001",
    drugNm: "정장제",
  },
  {
    mdexmnRcordDt: "2024.11.28",
    hsptlNo: "H003",
    hsptlDrctr: "이의사",
    mdexmnMdlrt: "물리치료",
    mdexmnDgnssNm: "염좌",
    mdexmnMemo: "발목 삠",
    file: "file3.pdf",
    chldrnNo: "C001",
    drugNm: "파스",
  },
];

export default Hospital;
