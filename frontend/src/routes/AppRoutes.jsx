import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "../App.jsx"
import { UserRegister } from "../pages/Register.page.jsx"
import { UserHome } from "../pages/Home.page.jsx";
import { UserLogin } from "../pages/Login.page.jsx";
import { userAuth } from "../hooks/userAuth.js";
import { UserProfile } from "../pages/UserProfile.jsx";
import { AddPost } from "../features/user/addPost.jsx";

function AuthRedirect() {
  const { isAuthenticated, loading } = userAuth();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated
    ? <Navigate to="/home" />
    : <Navigate to="/login" />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AuthRedirect/>,
      },
      {
        path: "/register",
        element: <UserRegister />,
      },
      {
        path:"/home",
        element:<UserHome/>
      },
      {
        path:"/login",
        element: <UserLogin/>
      },
      {
        path:"/me",
        element:<UserProfile/>
      },
      {
        path:"/addpost",
        element:<AddPost/>
      }
    ],
  },
]);