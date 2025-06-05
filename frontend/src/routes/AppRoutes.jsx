import { createBrowserRouter, Navigate } from "react-router-dom"
import App from "../App.jsx"
import { LoadingPage } from "../pages/Loading.page.jsx";
import { UserRegisterPage } from "../pages/Register.page.jsx"
import { UserHomePage } from "../pages/Home.page.jsx";
import { UserLoginPage } from "../pages/Login.page.jsx";
import { userAuth } from "../hooks/userAuth.js";
import { CurrentUserProfilePage } from "../pages/CurrentUserProfile.page.jsx";
import { AddPostPage } from "../pages/AddPost.page.jsx";
import { SearchPage } from "../pages/Search.page.jsx";
import { UserProfilePage } from "../pages/UserProfile.page.jsx";
import { UserSettingPage } from "../pages/UserSetting.page.jsx";
import { useEffect } from "react";

function AuthRedirect() {
  const { isAuthenticated, loading,fetchUser,updateToken } = userAuth();

  useEffect(()=>{
    fetchUser()
    updateToken()
  },[])

  if (loading) return <LoadingPage/>;

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
        element: <UserRegisterPage />,
      },
      {
        path:"/home",
        element:<UserHomePage/>
      },
      {
        path:"/login",
        element: <UserLoginPage/>
      },
      {
        path:"/me",
        element:<CurrentUserProfilePage/>
      },
      {
        path:"/addpost",
        element:<AddPostPage/>
      },
      {
        path:"/search",
        element:<SearchPage/>
      },
      {
        path:"/profile/:userId",
        element:<UserProfilePage/>
      },
      {
        path:"/settings",
        element:<UserSettingPage/>
      },
    ],
  },
]);