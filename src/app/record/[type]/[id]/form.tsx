import RecordForm from "../../components/RecordForm";

interface PageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function EditRecordPage({ params }: PageProps) {
  return <RecordForm type={params.type} id={params.id} />;
}
