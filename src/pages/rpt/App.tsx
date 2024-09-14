import Button from "../../elements/button/Button";
import Container from "../../elements/container/Container";

const App: React.FC = () => {
    return (
        <div>
            <Button label="Report" onClick={() => {}} />
            <Container css="profileContainer containerBase">
                <div>
                    <div>
                        <p>2024. 10. 31</p>
                        <p>2024.09.28 출생</p>
                    </div>
                    <p>김아기</p>
                    <p>36일, 5주 1일</p>
                    <div>
                        <p>몸무게: 5.1kg</p>
                        <p>키: 51.0cm</p>
                        <p>머리 둘레: 36.9cm</p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default App;
