import RecordForm from "../components/RecordForm";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default async function RecordFormPage({ params }: PageProps) {
  const { type } = await params;
  return <RecordForm type={type} />;
}
