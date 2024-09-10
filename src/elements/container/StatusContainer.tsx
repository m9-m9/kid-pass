import React from "react";
import InfoContainer from "./InfoContainer"; 
import css from "./container.module.css";  

const ProfileContainer: React.FC = () => {
  return (
    <InfoContainer className={`${css.statusContainer}`}>  
      <div>
        <p>체온,수면,식사 등 상태 컨테이너</p>
      </div>
    </InfoContainer>
  );
};

export default ProfileContainer;
