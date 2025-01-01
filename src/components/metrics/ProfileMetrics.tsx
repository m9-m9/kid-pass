import { Label } from "@/elements/label/Label";

type ProfileMetricsProps = {
    label: string;
    value: string | number;
};

const ProfileMetrics: React.FC<ProfileMetricsProps> = ({ label, value }) => (
    <div className="verticalFlexbox gap-5">
        <Label text={label} css="metricsLabel" />
        <Label text={String(value)} css="metricsValue" />
    </div>
);
export default ProfileMetrics;
