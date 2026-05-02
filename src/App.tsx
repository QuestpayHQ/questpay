import { Toaster } from 'sonner'
import { Waitlist } from './pages'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ui/ScrollToTop'

export default function App() {
  return (
    <>
      <Toaster position="top-right"
      richColors
      />
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Waitlist />} />
    </Routes>
    </>
  )
}
