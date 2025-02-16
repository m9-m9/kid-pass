import RecordForm from "../components/RecordForm";

interface PageProps {
  params: {
    type: string;
  };
}

export default function RecordFormPage({ params }: PageProps) {
  return <RecordForm type={params.type} />;
}
