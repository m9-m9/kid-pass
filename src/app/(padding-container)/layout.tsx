import Container from "@/elements/container/Container";

export default function PaddingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <Container className="paddingContainer">{children}</Container>;
}
