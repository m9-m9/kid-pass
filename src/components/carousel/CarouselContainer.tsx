import React, { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import styles from "./Carousel.module.css";

interface Props {
    children: ReactNode;
    options?: EmblaOptionsType;
    slideClassName?: keyof typeof styles;
}

const CarouselContainer: React.FC<Props> = ({
    children,
    options,
    slideClassName = "slide",
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
