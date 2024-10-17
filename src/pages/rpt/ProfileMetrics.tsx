import {Label} from "../../elements/label/Label";

type ProfileMetricsProps = {
    label: string;
    value: string;
};

const ProfileMetrics: React.FC<ProfileMetricsProps> = ({ label, value }) => (
    <div className="verticalFlexbox gap-8">
        <Label text={label} css="metricsLabel" />
        <Label text={value} css="metricsValue" />
    </div>
);

export default ProfileMetrics;
