import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import authService from "./services/Appwrite/Auth";
import { useEffect } from "react";
import { login, logout } from "./redux/slices/AuthSlice";
import notify from "./services/Toast/Toast";
import { Audio } from "react-loader-spinner";
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router";

export default function App() {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        notify.ErrorToast(`Error: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-gray-400 flex flex-wrap">

        <div className="w-full block">
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>

      <ToastContainer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <Audio
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
    </div>
  );
}
