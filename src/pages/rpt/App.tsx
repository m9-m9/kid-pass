import { useState } from "react";
import Button from "../../elements/button/Button";
import BodyTemp from "../../elements/charts/BodyTemp";
import Label from "../../elements/label/Label";
import styles from "./rpt.module.css";
import useUsrStore from "../../store/useUsrStore";

const App: React.FC = () => {
  const [isSleepOpen, setIsSleepOpen] = useState(true);
  const [isMealOpen, setIsMealOpen] = useState(true);
  const [isUrinationOpen, setIsUrinationOpen] = useState(true);
  const [isTempOpen, setIsTempOpen] = useState(true);
  const usr = useUsrStore();
  // 각각의 상태를 토글하는 함수들
  const toggleSleepMetricsArea = () => {
    setIsSleepOpen(!isSleepOpen);
  };

  const toggleMealMetricsArea = () => {
    setIsMealOpen(!isMealOpen);
  };

  const toggleUrinationArea = () => {
    setIsUrinationOpen(!isUrinationOpen);
  };

  const toggleTempArea = () => {
    setIsTempOpen(!isTempOpen);
  };

  return (
    <>
      <div>
        {usr.name}
        <Button css="button" label="Report" onClick={() => {}} />
        <div className={`${styles.profileContainer} ${styles.containerBase}`}>
          <Label text="2024. 10. 31" css="profileDate" />
          <div>
            <Label text="2024.09.28 출생" css="metricsType" />
            <Label text="김아기" css="metricsValue" />
          </div>
          <div>
            <Label text="나이 (만)" css="metricsType" />
            <Label text="36일, 5주 1일" css="metricsValue" />
          </div>
          <div className={styles.metricsArea}>
            <div>
              <Label text="몸무게" css="metricsType" />
              <Label text="5.1kg" css="metricsValue" />
            </div>
            <div>
              <Label text="키" css="metricsType" />
              <Label text="51.0cm" css="metricsValue" />
            </div>
            <div>
              <Label text="머리 둘레" css="metricsType" />
              <Label text="36.9cm" css="metricsValue" />
            </div>
          </div>
        </div>

        <div className={styles.symptomContainer}>
          <Label text="지금 아기의 증상은요" css="category" />
          <div className={styles.symptoms}>
            <Button css="symptomButton" label="고열" onClick={() => {}} />
            <Button css="symptomButton" label="두드러기" onClick={() => {}} />
            <Button css="symptomButton" label="설사" onClick={() => {}} />
          </div>
        </div>
        <div className={styles.metricsContainer}>
          <div className={`${styles.metrics} ${styles.containerBase}`}>
            <Label text="지난 3일 동안의 아기의 상태" css="category" />
            <div className={`${styles.metrics} ${styles.containerBase}`}>
              <div className={styles.metircsTitle}>
                <Label text="체온기록" css="metrics" />
                <svg
                  width="22"
                  height={isTempOpen ? "10" : "9"}
                  viewBox={isTempOpen ? "0 0 22 10" : "0 0 22 9"}
                  fill="none"
                  onClick={toggleTempArea}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={isTempOpen ? "M1 1L10.5 8.5L21 1" : "M21 8.5L11.5 0.999999L1 8.5"} stroke="black" />
                </svg>
              </div>
              <div className={`${styles.metricsArea} ${!isTempOpen && styles.closed}`}>
                <BodyTemp />
              </div>
            </div>
          </div>

          <div className={`${styles.metrics} ${styles.containerBase}`}>
            <div className={styles.metircsTitle}>
              <Label text="수면패턴" css="metrics" />
              <svg
                width="22"
                height={isSleepOpen ? "10" : "9"}
                viewBox={isSleepOpen ? "0 0 22 10" : "0 0 22 9"}
                fill="none"
                onClick={toggleSleepMetricsArea}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={isSleepOpen ? "M1 1L10.5 8.5L21 1" : "M21 8.5L11.5 0.999999L1 8.5"} stroke="black" />
              </svg>
            </div>
            <div className={`${styles.metricsArea} ${!isSleepOpen && styles.closed}`}>
              <div className={styles.metricsDetail}>
                <Label text="간격" css="metricsType" />
                <Label text="3회" css="metricsValue" />
              </div>
              <div className={styles.metricsDetail}>
                <Label text="횟수" css="metricsType" />
                <Label text="6회" css="metricsValue" />
              </div>
            </div>
          </div>
          <div className={`${styles.metrics} ${styles.containerBase}`}>
            <div className={styles.metircsTitle}>
              <Label text="식사패턴" css="metrics" />
              <svg
                width="22"
                height={isMealOpen ? "10" : "9"}
                viewBox={isMealOpen ? "0 0 22 10" : "0 0 22 9"}
                fill="none"
                onClick={toggleMealMetricsArea}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={isMealOpen ? "M1 1L10.5 8.5L21 1" : "M21 8.5L11.5 0.999999L1 8.5"} stroke="black" />
              </svg>
            </div>
            <div className={`${styles.metricsArea} ${!isMealOpen && styles.closed}`}>
              <div className={styles.metricsDetail}>
                <Label text="간격" css="metricsType" />
                <Label text="2시간" css="metricsValue" />
              </div>
              <div className={styles.metricsDetail}>
                <Label text="횟수" css="metricsType" />
                <Label text="6회" css="metricsValue" />
              </div>
            </div>
          </div>
          <div className={`${styles.metrics} ${styles.containerBase}`}>
            <div className={styles.metircsTitle}>
              <Label text="배뇨 횟수" css="metrics" />
              <svg
                width="22"
                height={isUrinationOpen ? "10" : "9"}
                viewBox={isUrinationOpen ? "0 0 22 10" : "0 0 22 9"}
                fill="none"
                onClick={toggleUrinationArea}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={isUrinationOpen ? "M1 1L10.5 8.5L21 1" : "M21 8.5L11.5 0.999999L1 8.5"} stroke="black" />
              </svg>
            </div>
            <div className={`${styles.metricsArea} ${!isUrinationOpen && styles.closed}`}>
              <div className={styles.metricsDetail}>
                <Label text="대변" css="metricsType" />
                <Label text="6회" css="metricsValue" />
              </div>
              <div className={styles.metricsDetail}>
                <Label text="소변" css="metricsType" />
                <Label text="6회" css="metricsValue" />
              </div>
              <div className={styles.metricsDetail}>
                <Label text="대변색깔" css="metricsType" />
                <Label text="묽은 변" css="metricsValue" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.vaccineContainer}>
          <Label text="아기의 예방접종 이력이에요" css="category" />
          <div className={styles.vaccine}>
            <Label text="2024.10.03" css="metricsDate" />
            <Label text="BCG" css="vaccine" />
          </div>
          <div className={styles.vaccine}>
            <Label text="2024.10.03" css="metricsDate" />
            <Label text="B형 간염(1차)" css="vaccine" />
          </div>
        </div>
        <div className={styles.commentsContainer}>
          <Label text="특이사항" css="category" />
          <div className={styles.comments}>
            <Button css="commentsButton" label="출산 시 합병증" onClick={() => {}} />
            <Button css="commentsButton" label="가족력 있음" onClick={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
