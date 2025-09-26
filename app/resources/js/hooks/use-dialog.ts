import { useCallback, useState } from "react";

export const useDialog = (stateInicial: boolean = false) => {
    const [isOpen, setIsOpen] = useState<Boolean>(stateInicial);
    const onOpen = useCallback(() => setIsOpen(true), []);
    const onClose = useCallback(() => setIsOpen(true), []);

    return { isOpen, onOpen, onClose };
}