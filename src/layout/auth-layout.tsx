import ModeToggle from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    
      <section className="relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="max-w-[400px] w-[90%] mx-auto py-20 space-y-6">
          <div className="center">
            <Link to="/">
              <img src="/logo.svg" alt="logo" className="w-10 h-10" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold font-sans">{title}</h1>
            <p className="text-sm text-muted">{description}</p>
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      </section>
   
  );
}
