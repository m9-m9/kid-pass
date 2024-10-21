import Container from "../../elements/container/Container";
import { Label } from "../../elements/label/Label";

const Note = () => {
    return (
        <>
            <div className="horizonFlexbox gap-8 mb-16">
                <Label text="김아기" css="babyName" />
                <Label text="12주" css="babyAge" />
            </div>
            <Container className="dueDate mb-16">
                <Label text="결핵" css="dueDate" />
                <div className="vertivalFlexbox gap-8">
                    <Label text="D-DAY + 5" css="dueDate" />
                    <Label text="접종일이 지났습니다" css="dueDate" />
                </div>
            </Container>
            <Container className="vaccination">
                <Label text="B형 간염 3차" css="vaccination" />
                <Label text="D-Day" css="vaccination" />
            </Container>
        </>
    );
};

export default Note;
