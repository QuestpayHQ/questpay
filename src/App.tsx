import { Toaster } from 'sonner'
import { Waitlist } from '@/pages'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { Home } from '@/pages/main'
import { MainLayout } from '@/layout'

export default function App() {
  return (
    <>
      <Toaster position="top-right"
      richColors
      />
    <ScrollToTop />
    <Routes>
        <Route path="/" element={<Waitlist />} />
        <Route element={<MainLayout />}>
          <Route path='home' element={<Home />} />
        </Route>
    </Routes>
    </>
  )
}
