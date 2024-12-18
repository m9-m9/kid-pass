import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import styles from "./Carousel.module.css";

interface Props {
    children: ReactNode;
    options?: EmblaOptionsType;
    slideClassName?: keyof typeof styles; // styles 객체의 키값만 허용
}

const CarouselContainer: React.FC<Props> = ({
    children,
    options,
    slideClassName = "slide", // 기본값으로 'slide' 클래스 사용
}) => {
    const [emblaRef] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        ...options,
    });

    return (
        <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.container}>
                {React.Children.map(children, (child) => (
                    <div className={styles[slideClassName]}>{child}</div>
                ))}
            </div>
        </div>
    );
};

export default CarouselContainer;
