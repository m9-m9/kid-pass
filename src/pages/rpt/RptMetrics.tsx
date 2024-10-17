import React from "react";
import {Label} from "../../elements/label/Label";
import styles from "./rpt.module.css";
import Container from "../../elements/container/Container";

// MetricsDetailItem 컴포넌트
type MetricsDetailItemProps = {
    label: string;
    value: string;
};


// MetricsItem 컴포넌트
type MetricsItemProps = {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
};


// MetricsContainer

const MetricsItem: React.FC<MetricsItemProps> = ({ title, isOpen, onToggle, children }) => (
    <Container className="rptContainer" backgroundColor="#f4f4f4">
        <div className="horizonFlexbox gap-24">
            <Label text={title} css="symtomLabel" />
            <svg
                width="22"
                height={isOpen ? "10" : "9"}
                viewBox={isOpen ? "0 0 22 10" : "0 0 22 9"}
                fill="none"
                onClick={onToggle}
                xmlns="http://www.w3.org/2000/svg"
                className={styles.toggleIcon}
            >
                <path
                    d={isOpen ? "M1 1L10.5 8.5L21 1" : "M21 8.5L11.5 0.999999L1 8.5"}
                    stroke="black"
                />
            </svg>
        </div>
        <div className={`horizonFlexbox gap-16 ${!isOpen && styles.closed}`}>
            {children}
        </div>
    </Container>
);


// Metrics

const MetricsDetailItem: React.FC<MetricsDetailItemProps> = ({ label, value }) => (
    <div className="horizonFlexbox gap-8">
        <Label text={label} css="metricsLabel" />
        <Label text={value} css="metricsValue" />
    </div>
);

export { MetricsItem, MetricsDetailItem };