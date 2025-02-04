'use client'

import { useState, useRef, useEffect } from 'react';
import S from "../picker.module.css"
import { useDateStore } from '@/store/useDateStore';

interface WheelStyles {
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
}

interface WheelProps {
  startNum: number;
  endNum: number;
  initialValue: number;
  styles?: WheelStyles;
  onChange?: (value: number) => void;
}

const Wheel = ({ startNum, endNum, initialValue, styles, onChange }: WheelProps) => {

  const { setYear, setMonth, setDay } = useDateStore();
  const initialIndex = initialValue - startNum;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const isWheeling = useRef(false);
  const wheelTimeout = useRef<NodeJS.Timeout>();

  const numbers = Array.from(
    { length: endNum - startNum + 1 },
    (_, i) => startNum + i
  );

  const ITEM_HEIGHT = 40;

  // 스크롤 위치를 기반으로 아이템 인덱스와 값을 업데이트하는 함수
  const updateSelectedItem = (newScrollTop: number) => {
    if (!containerRef.current || !highlightRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const highlightRect = highlightRef.current.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;

    const items = containerRef.current.getElementsByClassName(S.wheelItem);
    let selectedIndex = currentIndex;

    Array.from(items).forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterY = itemRect.top + itemRect.height / 2;

      // 아이템의 중심이 하이라이트 영역 안에 있는지 확인
      if (Math.abs(itemCenterY - centerY) < ITEM_HEIGHT / 2) {
        selectedIndex = index;
      }
    });

    if (selectedIndex !== currentIndex) {
      setCurrentIndex(selectedIndex);
      onChange?.(numbers[selectedIndex]);
      handleChange(numbers[selectedIndex]);
      // console.log('Current Value:', numbers[selectedIndex]);
    }

    return selectedIndex;
  };

  // 스크롤 위치 스냅 함수
  const snapToItem = (index: number) => {
    const newScrollTop = index * ITEM_HEIGHT;
    setScrollTop(newScrollTop);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = (e.clientY - startY);
    const newScrollTop = scrollTop - delta;
    setScrollTop(newScrollTop);
    setStartY(e.clientY);

    updateSelectedItem(newScrollTop);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToItem(currentIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const delta = (e.touches[0].clientY - startY);
    const newScrollTop = scrollTop - delta;
    setScrollTop(newScrollTop);
    setStartY(e.touches[0].clientY);

    updateSelectedItem(newScrollTop);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    snapToItem(currentIndex);
  };

  const WHEEL_SENSITIVITY = 0.5;  // 휠 감도 조절용 상수

  // handleWheel 함수를 수정
  const handleWheel = (e: React.WheelEvent) => {
    if (isWheeling.current) return;
    isWheeling.current = true;

    // 휠 델타를 더 세밀하게 조절
    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      numbers.length - 1
    );

    setCurrentIndex(newIndex);
    const newScrollTop = newIndex * ITEM_HEIGHT;
    setScrollTop(newScrollTop);
    onChange?.(numbers[newIndex]);
    handleChange(numbers[newIndex]);
    // console.log('Current Selected Value:', numbers[newIndex]);

    // 디바운스 시간을 줄임
    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
    }
    wheelTimeout.current = setTimeout(() => {
      isWheeling.current = false;
    }, 20);  // 더 빠른 응답을 위해 타임아웃 시간 감소
  };

  const handleChange = (value: number) => {
    onChange?.(value);
    if (startNum === 2010) setYear(value); // 연도 휠
    else if (startNum === 1 && endNum === 12) setMonth(value); // 월 휠
    else if (startNum === 1 && endNum === 31) setDay(value); // 일 휠
  };

  // 마운트 시 초기 스냅
  useEffect(() => {
    const initialScrollTop = initialIndex * ITEM_HEIGHT;
    setScrollTop(initialScrollTop);
  }, []);
  return (
    <div
      ref={containerRef}
      className={S.wheelContainer}
      style={{
        width: styles?.width || '100px',
        height: styles?.height || '200px',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div
        className={S.wheelTrack}
        style={{
          transform: `translateY(${-scrollTop}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s',
          padding: `${(styles?.height as number || 200) / 2.5}px 0`
        }}
      >
        {numbers.map((number, index) => (
          <div
            key={number}
            className={`${S.wheelItem} ${index === currentIndex ? S.selected : ''}`}
            style={{
              fontSize: styles?.fontSize || '16px',
            }}
          >
            {number}
          </div>
        ))}
      </div>
      <div ref={highlightRef} className={S.highlight} />
    </div>
  );
};

export default Wheel;