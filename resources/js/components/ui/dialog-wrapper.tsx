import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface DialogWrapperProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  processing?: boolean;
  handleClick: () => void;
  buttonText?: string;
  variant?: "default" | "destructive";
  children: React.ReactNode;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({ title, isOpen, onClose, processing, handleClick, buttonText = 'Salvar', variant, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <Button variant={variant} onClick={handleClick}>
          {processing ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {buttonText}
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};