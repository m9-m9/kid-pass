'use client'

import { useState, useRef, useEffect } from 'react';
import S from "../styles/picker.module.css"
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
  isRepeating?: boolean;
  onChange?: (value: number) => void;
}

const Wheel = ({ startNum, endNum, initialValue, styles, isRepeating = false, onChange }: WheelProps) => {
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

  const ITEM_HEIGHT = 40;
  const REPEAT_COUNT = 5; // 반복할 횟수

  // 기본 숫자 배열 생성
  const baseNumbers = Array.from(
    { length: endNum - startNum + 1 },
    (_, i) => startNum + i
  );

  // 반복된 숫자 배열 생성
  const numbers = isRepeating
    ? Array.from({ length: baseNumbers.length * REPEAT_COUNT }, (_, i) =>
      baseNumbers[i % baseNumbers.length]
    )
    : baseNumbers;

  // 실제 값 계산 함수
  const getRealValue = (index: number) => {
    if (!isRepeating) return numbers[index];
    return baseNumbers[index % baseNumbers.length];
  };

  const updateSelectedItem = (newScrollTop: number) => {
    if (!containerRef.current || !highlightRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;

    const items = containerRef.current.getElementsByClassName(S.wheelItem);
    let selectedIndex = currentIndex;

    Array.from(items).forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenterY = itemRect.top + itemRect.height / 2;

      if (Math.abs(itemCenterY - centerY) < ITEM_HEIGHT / 2) {
        selectedIndex = index;
      }
    });

    if (selectedIndex !== currentIndex) {
      setCurrentIndex(selectedIndex);
      const realValue = getRealValue(selectedIndex);
      onChange?.(realValue);
      handleChange(realValue);
    }

    return selectedIndex;
  };

  const snapToItem = (index: number) => {
    setCurrentIndex(index);
    setScrollTop(index * ITEM_HEIGHT);
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

  const handleWheel = (e: React.WheelEvent) => {
    if (isWheeling.current) return;
    isWheeling.current = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.min(Math.max(currentIndex + direction, 0), numbers.length - 1);

    setCurrentIndex(newIndex);
    const newScrollTop = newIndex * ITEM_HEIGHT;
    setScrollTop(newScrollTop);

    const realValue = getRealValue(newIndex);
    onChange?.(realValue);
    handleChange(realValue);

    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
    }
    wheelTimeout.current = setTimeout(() => {
      isWheeling.current = false;
    }, 20);
  };

  const handleChange = (value: number) => {
    onChange?.(value);
    if (startNum === 2010) setYear(value);
    else if (startNum === 1 && endNum === 12) setMonth(value);
    else if (startNum === 1 && endNum === 31) setDay(value);
  };

  useEffect(() => {
    // 초기 위치를 중앙으로 설정
    const middleIndex = isRepeating
      ? Math.floor(numbers.length / 2)
      : initialIndex;
    const initialScrollTop = middleIndex * ITEM_HEIGHT;
    setScrollTop(initialScrollTop);
    setCurrentIndex(middleIndex);
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
            key={`${number}-${index}`}
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