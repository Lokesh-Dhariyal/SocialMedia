import { Outlet } from 'react-router-dom'
import './App.css'
import {Header} from "./components/header/Header"

function App() {

  return (
    <>
      <div className='w-full block bg-gray-800 h-dvh'>
        <Header/>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App
