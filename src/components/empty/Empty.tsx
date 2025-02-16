import React from "react";
import styles from "./Empty.module.css";
import Image from "next/image";

interface EmptyProps {
  text?: string;
}

const Empty: React.FC<EmptyProps> = ({ text = "데이터가 없습니다." }) => {
  return (
    <div className={styles.container}>
      <Image src="/images/empty.png" alt="No data" width={120} height={120} />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Empty;
