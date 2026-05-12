import { navLinks } from "@/constants/data";
import { Link, NavLink } from "react-router-dom";
import ModeToggle from "../ui/mode-toggle";


export default function Header() {
  return (
    <>
          <header className="sticky bg-background/50 dark:bg-secondary/90 backdrop-blur-sm border-b border-line">
              <nav className="main flex items-center justify-between h-[70px]">
                  <Link to='/home' className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Questpay" width={35} />
                    <h3 className="text-2xl font-bold hidden sm:block">Questpay</h3>
                  </Link>

                  <div className="flex items-center gap-10">
                      <ul className="hidden md:flex items-center gap-6 border-r border-line pr-10">
                        {navLinks.map((link) => (
                          <li key={link.to}>
                            <NavLink to={link.to} className="text-sm font-medium text-muted hover:text-primary hover:underline transition-all duration-300 ease-out">{link.label}</NavLink>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2">
                          <div className="center h-10 w-10 bg-secondary rounded-full">
                              <ModeToggle/>
                          </div>
                          <Link to='/login' className="btn btn-primary text-sm rounded-xl h-10 px-4 w-fit">
                          Account
                          </Link>
                      </div>
                  </div>
              </nav>
    </header>
      </>
  )
}
