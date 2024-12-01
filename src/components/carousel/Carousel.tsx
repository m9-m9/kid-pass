import React, { useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselButton";
import { SelectedSnapDisplay, useSelectedSnapDisplay } from "./CarouselSelectedSnapDisplay";
import styles from "./Carousel.module.css";

interface Options extends EmblaOptionsType {
  useButton?: boolean;
  useIndex?: boolean;
  selectedItems?: number[]; // 선택된 아이템들의 인덱스 배열
  onSelect?: (index: number) => void; // 선택 콜백 함수 타입 수정
}

type PropType = {
  slides: string[];
  options?: Options;
};

const Carousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  const handleSlideClick = useCallback(
    (index: number) => {
      console.log(index);
      if (options?.onSelect) {
        options.onSelect(index);
      }
    },
    [options]
  );

  const isSelected = useCallback(
    (index: number) => {
      return options?.selectedItems?.includes(index) || false;
    },
    [options?.selectedItems]
  );

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((text, index) => (
            <div className={styles.embla__slide} key={index} onClick={() => handleSlideClick(index)}>
              <div
                className={`${styles.embla__slide__item} ${
                  isSelected(index) ? styles.embla__slide__selected_item : ""
                }`}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        {options?.useButton && (
          <div className={styles.embla__buttons}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        )}

        {options?.useIndex && <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />}
      </div>
    </section>
  );
};

export default Carousel;
