import { Footer, Header } from "@/components/main";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
      </>
  )
}
