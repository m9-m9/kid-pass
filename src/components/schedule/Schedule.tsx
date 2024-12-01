import React from "react";
import styles from "./Schedule.module.css";

export interface ScheduleItem {
  time: string;
  ampm: "AM" | "PM";
  content: keyof typeof CategoryMapColor;
  duration?: string;
  amount?: string;
}

export interface DaySchedule {
  date: string;
  dayOfWeek: string;
  items: ScheduleItem[];
}

interface ScheduleProps {
  schedules: DaySchedule[];
}

const CategoryMapColor = {
  수유: "#729BED",
  배설: "#A0DBF9",
  수면: "#71E0E0",
  체온: "#FFB6D7",
  "몸무게/키": "#FFDE79",
  머리둘레: "#BEBEFA",
  감정: "#EAC2FF",
  특이증상: "#FFB7B8",
  약: "#A7FFAC",
  기타: "#729BED",
};

const Schedule: React.FC<ScheduleProps> = ({ schedules }) => {
  return (
    <div className={styles.scheduleContainer}>
      {schedules.map((daySchedule, dayIndex) => (
        <div key={dayIndex} className={styles.dayContainer}>
          <div className={styles.dateHeader}>
            <span className={styles.date}>{daySchedule.date}</span>
            <span className={styles.dayOfWeek}>{daySchedule.dayOfWeek}</span>
          </div>
          <div className={styles.itemList}>
            {daySchedule.items.map((item, itemIndex) => (
              <div key={itemIndex} className={styles.scheduleItem}>
                <div className={styles.timeContainer}>
                  <span className={styles.time}>{item.time}</span>
                  <span className={styles.ampm}>{item.ampm}</span>
                </div>
                <div className={styles.contentContainer}>
                  <span className={styles.content} style={{ color: CategoryMapColor[item.content] }}>
                    {item.content}
                  </span>
                  {(item.duration || item.amount) && (
                    <span className={styles.detail}>
                      {item.duration && `${item.duration}`}
                      {item.amount && `, ${item.amount}`}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
