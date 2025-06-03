import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import './App.css'
import { Header } from './components/header/Header'

function App() {

  return (
    <div className="w-full block font-Roboto">
      <Header />
      <AnimatePresence mode="wait">
          <Outlet />
      </AnimatePresence>
    </div>
  )
}

export default App
