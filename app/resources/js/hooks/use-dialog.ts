import { useCallback, useState } from "react";

export const useDialog = (stateInicial: boolean = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(stateInicial);
    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(false), []);

    return { isOpen, onOpen, onClose };
}