import DashboardNavPanel from "@/components/dashboard/dashboard-nav-panel";
import { useEffect, useState } from "react";

export interface MenubarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menubar({ isOpen, onClose }: MenubarProps) {
  const [panelIn, setPanelIn] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => setPanelIn(true));
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="presentation">
      <button
        type="button"
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200 ${
          panelIn ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        id="dashboard-mobile-nav"
        className="absolute top-0 left-0 flex h-dvh w-[min(100%,20rem)] max-w-full shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: panelIn ? "translateX(0)" : "translateX(-100%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        <DashboardNavPanel
          onNavigate={onClose}
          onRequestClose={onClose}
          className="min-h-0 flex-1 shadow-[4px_0_24px_rgba(0,0,0,0.15)]"
        />
      </div>
    </div>
  );
}
