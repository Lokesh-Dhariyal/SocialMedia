import { Outlet } from 'react-router-dom'
import './App.css'
import {Header} from "./components/header/Header"

function App() {

  return (
    <>
      <div className='w-full block font-Roboto'>
        <Header/>
        <main className='mt-15'>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App
