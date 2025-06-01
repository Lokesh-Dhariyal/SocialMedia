import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './features/auth/authContext.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/AppRoutes.jsx'
import { PostProvider } from './features/auth/postContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router}/>
      </PostProvider>
    </AuthProvider>
  </StrictMode>,
)
