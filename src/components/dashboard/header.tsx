import Menubar from "@/components/dashboard/menubar";
import ModeToggle from "@/components/ui/mode-toggle";
import { AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <Menubar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>

      <header className="sticky w-full top-0 z-40 border-b border-line bg-background/80 dark:bg-secondary/90 backdrop-blur-md">
        <nav className="px-4 md:px-6 flex items-center justify-between h-[70px] w-full">
          <div className="md:invisible visible flex items-center justify-center h-10 w-10 rounded-full bg-background dark:bg-foreground">
            <Menu size={20} onClick={() => setMenuOpen(true)} />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full center">
              <ModeToggle />
            </div>
            <div>
              <Link to="/notifications" className="h-10 w-10 rounded-full bg-foreground center relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  9
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <p className="hidden md:block font-sans text-sm md:text-base font-medium">Gift Jackson</p>
              <div className="h-10 w-10 rounded-full bg-primary">
                <img
                  src="https://api.dicebear.com/9.x/adventurer/svg?seed=Felix"
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <ChevronDown size={20} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
