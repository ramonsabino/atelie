"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className={cn(
          "w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 pt-4",
          "animate-in slide-in-from-bottom duration-300",
          "max-h-[85vh] overflow-y-auto",
          className
        )}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-1.5 bg-brown/20 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 sm:hidden" />
          {title && <h2 className="text-lg font-serif font-bold text-brown">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-card rounded-full transition-colors ml-auto"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-brown" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
