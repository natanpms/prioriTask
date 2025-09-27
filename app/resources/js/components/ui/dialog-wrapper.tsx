import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DialogWrapperProps  {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    handleClick: () => void;
    buttonText?: string;
    variant?: "default" | "destructive";
    children: React.ReactNode;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({ title, isOpen, onClose, handleClick, buttonText = 'Salvar', variant, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <Button variant={variant} onClick={handleClick}>{buttonText}</Button>
      </DialogContent>
    </Dialog>
  );
};