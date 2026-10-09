import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import WhatsAppButton from "../components/layout/WhatsAppButton"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717]">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  )
}