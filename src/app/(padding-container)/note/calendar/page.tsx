'use client'

import React, { useState } from 'react';
import styles from './calendar.module.css';
import WeeklyCalendar from '@/components/datePicker/DateCarousel';

const Calendar = () => {
  const [viewType, setViewType] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 이전 달의 마지막 날 정보
  const prevMonthLastDay = new Date(year, month, 0);
  const prevMonthLastDate = prevMonthLastDay.getDate();

  const firstDayOfWeek = firstDay.getDay();
  const lastDate = lastDay.getDate();

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  // 달력에 표시할 날짜 배열 생성
  const getDatesArray = () => {
    const dates = [];

    // 이전 달의 날짜 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevDate = prevMonthLastDate - firstDayOfWeek + i + 1;
      dates.push({
        day: prevDate,
        type: 'prev'
      });
    }

    // 현재 달의 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        day: i,
        type: 'current'
      });
    }

    // 다음 달의 날짜 추가 (7x6=42 그리드를 채우기 위해)
    const remainingDays = 42 - dates.length;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        day: i,
        type: 'next'
      });
    }

    return dates;
  };

  const getWeeksArray = () => {
    const dates = getDatesArray();
    const weeks = [];

    for (let i = 0; i < dates.length; i += 7) {
      weeks.push(dates.slice(i, i + 7));
    }

    return weeks;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <h2 className={styles.title}>
            {year}년 {monthNames[month]}
          </h2>
          <div className={styles.btnArea}>
            <button onClick={handlePrevMonth} className={styles.button}>
              <i className="ri-arrow-up-s-line" />
            </button>
            <button onClick={handleNextMonth} className={styles.button}>
              <i className="ri-arrow-down-s-line" />
            </button>
          </div>
        </div>
        <div className={styles.header_right}>
          <button
            onClick={() => setViewType('calendar')}
            className={`${styles.tab} ${viewType === 'calendar' ? styles.selected : ''}`}
          >
            달력
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`${styles.tab} ${viewType === 'list' ? styles.selected : ''}`}
          >
            목록
          </button>
        </div>
      </div>

      {viewType === 'calendar' ? (
        <>
          <div className={styles.weekDaysGrid}>
            {weekDays.map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.datesGrid}>
            {getWeeksArray().map((week, weekIndex) => (
              <div key={weekIndex} className={styles.weekRow}>
                {week.map((date, dateIndex) => (
                  <div
                    key={dateIndex}
                    className={`${styles.dateCell} ${date.type !== 'current' ? styles.adjacentMonth : ''}`}
                  >
                    {date.day}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <WeeklyCalendar />
      )}
    </div>
  );

};

export default Calendar;