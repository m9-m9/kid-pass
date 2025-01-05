import React, { ReactNode, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import styles from "./Carousel.module.css";

interface Props {
    children: ReactNode;
    options?: EmblaOptionsType;
    slideClassName?: keyof typeof styles;
    onSelect?: (index: number) => void;
}

const CarouselContainer: React.FC<Props> = ({
    children,
    options,
    slideClassName = "slide",
    onSelect,
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        dragFree: true,
        ...options,
    });

    useEffect(() => {
        if (!emblaApi || !onSelect) return;

        const onSelectCallback = () => {
            onSelect(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelectCallback);

        return () => {
            emblaApi.off("select", onSelectCallback);
        };
    }, [emblaApi, onSelect]);

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
