import { useDispatch } from "react-redux"
import authService from "../../services/Appwrite/Auth"
import {logout} from "../../redux/slices/AuthSlice"
import notify from "../../services/Toast/Toast"

const LogoutBtn = () => {

    const dispatch = useDispatch()

    const logouthandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
            notify.SuccessToast("you logged out")
        })
    }

    return (
    <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logouthandler}>Logout </button>
  )
}

export default LogoutBtn