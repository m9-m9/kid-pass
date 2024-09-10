import React from "react";
import css from "./container.module.css"

export interface InfoContainerProps {
    children: React.ReactNode;
    className: string;  
  }


  const InfoContainer: React.FC<InfoContainerProps> = ({ children, className }) => {
    return <div className={`${css.infoContainer} ${className}`}>{children}</div>;  
  };
  
  export default InfoContainer;