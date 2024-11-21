import Container from "@/elements/container/Container";
import { useModalStore } from "@/store/useModalStore";
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
    const { isOpen } = useModalStore();

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <Container className="modalContainer">{children}</Container>,
        document.getElementById("modal-root") as HTMLElement,
    );
};

export default Modal;
