import { Label } from "@/elements/label/Label";
import React from "react";
import { MetricsDetailItem, MetricsItem } from "./RptMetrics";
import Container from "@/elements/container/Container";

interface MetricsDetail {
    label: string;
    value: string;
}

interface MetricsSectionProps {
    labelText: string;
    metricsData: {
        title: string;
        isOpen: boolean;
        onToggle: () => void;
        details?: MetricsDetail[]; // 세부사항
        bodyTempComponent?: React.ReactNode; // BodyTemp 컴포넌트와 같은 특별한 컴포넌트
    }[];
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
    labelText,
    metricsData,
}) => {
    return (
        <Container className="sectionContainer">
            <Label text={labelText} css="category" />
            {metricsData.map((metric, index) => (
                <MetricsItem
                    key={index}
                    title={metric.title}
                    isOpen={metric.isOpen}
                    onToggle={metric.onToggle}
                >
                    {metric.bodyTempComponent ||
                        (metric.details &&
                            metric.details.map((detail, i) => (
                                <MetricsDetailItem
                                    key={i}
                                    label={detail.label}
                                    value={detail.value}
                                />
                            )))}
                </MetricsItem>
            ))}
        </Container>
    );
};

export { MetricsSection };
