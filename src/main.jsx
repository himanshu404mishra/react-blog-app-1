import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayoutProtected from "./Components/AuthLayout.jsx"
import {Home, AddPost, AllPost, EditPost,Login,Post,Signup} from "./pages/index.js"


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element:(
          <AuthLayoutProtected authentication={false}>
              <Login />
          </AuthLayoutProtected>
      ),
      },
      {
        path: "/signup",
        element: (
            <AuthLayoutProtected authentication={false}>
                <Signup />
            </AuthLayoutProtected>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayoutProtected authentication>
                {" "}
                <AllPost />
            </AuthLayoutProtected>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayoutProtected authentication>
                {" "}
                <AddPost />
            </AuthLayoutProtected>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayoutProtected authentication>
                {" "}
                <EditPost />
            </AuthLayoutProtected>
        ),
    },
    {
        path: "/posts/:slug",
        element: <Post />,
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
      <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)
