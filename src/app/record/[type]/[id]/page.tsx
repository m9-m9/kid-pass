"use client";

import { use } from "react";
import Header from "@/components/header/Header";
import Container from "@/elements/container/Container";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";
import { TYPE_PATH_MAP } from "../../constants";
import styles from "./page.module.css";

interface RecordDetailProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

const RecordDetail = ({ params }: RecordDetailProps) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const [record, setRecord] = useState<any>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = await getToken();
        const currentKid = localStorage.getItem("currentKid");

        if (!token || !currentKid) {
          return;
        }

        const response = await fetch(
          `/api/record/${resolvedParams.id}?type=${resolvedParams.type}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRecord(data.data);
        }
      } catch (error) {
        console.error("기록 조회 에러:", error);
      }
    };

    fetchRecord();
  }, [resolvedParams.id, resolvedParams.type]);

  const handleEdit = () => {
    // 수정 페이지 대신 등록 페이지로 이동하면서 id 전달
    const pathMap = {
      FEEDING: "/record/feeding",
      SLEEP: "/record/sleep",
      DIAPER: "/record/buHist",
      TEMPERATURE: "/record/heat",
      GROWTH: "/record/hgWgh",
      HEAD: "/record/hgWgh",
      EMOTION: "/record/emotion",
      SYMPTOM: "/record/symptm",
      MEDICINE: "/record/takngHist",
      ETC: "/record/etc",
    } as const;

    const path = pathMap[resolvedParams.type as keyof typeof pathMap];
    if (path) {
      router.push(`${path}?id=${resolvedParams.id}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const token = await getToken();
      const response = await fetch(`/api/record/${resolvedParams.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.error("기록 삭제 에러:", error);
    }
  };

  return (
    <Container className="container" full>
      <Header
        title={`${
          TYPE_PATH_MAP[resolvedParams.type as keyof typeof TYPE_PATH_MAP] ??
          "기록"
        } 상세`}
        onBack={() => router.back()}
      />
      {record && (
        <>
          <div className={styles.container}>
            <div className={styles.infoItem}>
              <span className={styles.label}>시작 시간</span>
              <span className={styles.value}>
                {new Date(record.startTime).toLocaleString()}
              </span>
            </div>
            {record.endTime && (
              <div className={styles.infoItem}>
                <span className={styles.label}>종료 시간</span>
                <span className={styles.value}>
                  {new Date(record.endTime).toLocaleString()}
                </span>
              </div>
            )}
            {record.amount && (
              <div className={styles.infoItem}>
                <span className={styles.label}>수유량</span>
                <span className={styles.value}>
                  {record.amount}
                  {record.unit}
                </span>
              </div>
            )}
            {record.memo && (
              <div className={styles.memo}>
                <div className={styles.memoLabel}>메모</div>
                <div className={styles.memoText}>{record.memo}</div>
              </div>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              className={`${styles.button} ${styles.deleteButton}`}
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default RecordDetail;
