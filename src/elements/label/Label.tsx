import React from "react";
import styles from "./label.module.css"; 

interface LabelProps {
    text: string;
    css: string;
    
}

interface DateLabelProps{

    text: string;
    className?: string;  

}

const Label: React.FC<LabelProps> = ({ text, css }) => {
    return <p className={styles[css]}>{text}</p>; 
};

const DateLabel: React.FC<DateLabelProps>= ({text,className})=>{

    console.log(text)
    return <p className={className}>{text}</p>; 
}


export { Label,DateLabel};
