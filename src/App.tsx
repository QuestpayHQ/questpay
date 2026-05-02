import { Toaster } from 'sonner'
import { Home } from './pages'
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
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  )
}
