import React, {RefObject, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
    open?: boolean,
    className?: string
    children: React.ReactNode
    onClose: (() => void) | undefined
}

export default function Modal({open, className = '', children, onClose}: ModalProps): React.JSX.Element {
    const dialog: RefObject<HTMLDialogElement> = useRef(null);

    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal?.showModal();
        }

        return () => modal?.close();
    }, [open]);

    return createPortal(
        <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal') as HTMLElement
    );
}