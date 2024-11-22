import { Label } from "@/elements/label/Label";

type MainMetricsProps = {
    label: string;
    value: string;
};

const MainMetrics: React.FC<MainMetricsProps> = ({ label, value }) => (
    <div className="verticalFlexbox gap-5">
        <Label text={label} css="metricsLabel" />
        <Label text={value} css="metricsValue" />
    </div>
);

export default MainMetrics;
