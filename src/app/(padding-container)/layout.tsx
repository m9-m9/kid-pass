import Container from "@/elements/container/Container";

export default function PaddingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // className에 직접 styles 객체의 클래스명을 사용
    return <Container className="paddingContainer">{children}</Container>;
}
