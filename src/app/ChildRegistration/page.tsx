import React from "react";
import RegistrationChapters from "./chapter/RegistrationChapter";
import Container from "@/elements/container/Container";

const App: React.FC = () => {
    return (
        <Container className="container">
            <RegistrationChapters />
        </Container>
    );
};

export default App;
