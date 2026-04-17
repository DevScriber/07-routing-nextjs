import css from './Modal.module.css'
import { createPortal } from "react-dom";
import { useEffect } from 'react';

interface ModalProps {
    onClose: () => void,
    children: React.ReactNode;
}

export default function Modal({ onClose, children, }: ModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        document.body
    );

}