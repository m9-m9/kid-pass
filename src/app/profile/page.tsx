import React from "react";
import ProfileChapters from "./chapter/ProfileChapter";
import Container from "@/elements/container/Container";

const App: React.FC = () => {
    return (
        <Container className="container">
            <ProfileChapters />
        </Container>
    );
};

export default App;
