import React from "react";
import ProfileChapters from "./chapter/ProfileChapter";
import Container from "@/elements/container/Container";

const ProfilePage: React.FC = () => {
  return (
    <Container className="container">
      <ProfileChapters />
    </Container>
  );
};

export default ProfilePage;
