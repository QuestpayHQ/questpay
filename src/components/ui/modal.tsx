import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="presentation"
    >
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm"
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 max-h-[min(90vh,640px)] w-full max-w-[480px] overflow-y-auto rounded-3xl bg-background p-4 shadow-lg"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          {title ? (
            <h2 id={titleId} className="font-outfit text-lg font-bold text-main">
              {title}
            </h2>
          ) : (
            <span className="sr-only">Dialog</span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="btn grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
