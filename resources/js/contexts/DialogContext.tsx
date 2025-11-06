import { Task } from '@/types';
import { createContext, useContext, useState } from 'react';

interface DialogContextData {
    isOpen: boolean;
    onOpen: (task?: Task) => void;
    onClose: () => void;
    task: Task | null;
}

const DialogContext = createContext<DialogContextData>({} as DialogContextData);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState<Task | null>(null);

    const onOpen = (task?: Task) => {
        setTask(task || null);
        setIsOpen(true);
    };

    const onClose = () => {
        setTask(null);
        setIsOpen(false);
    };

    return (
        <DialogContext.Provider value={{ isOpen, onOpen, onClose, task }}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);

    if (!context) {
        throw new Error('useDialog deve ser usado com um DialogProvider');
    }

    return context;
};
