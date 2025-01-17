import { useState } from "react"
import { useEffect } from "react"
import { Audio } from "react-loader-spinner"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

function AuthLayoutProtected({children, authentication=true}) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.status)
    useEffect(() => {
    
        if(authentication && authStatus !== authentication) {
            navigate("/login")
        }else if(!authentication && authStatus !== authentication ){
            navigate("/")
        }
        setLoader(false)
  }, [authStatus,navigate,authentication])

  return loader ?  (
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
  ) : (
    <div>
    {children}
    </div>
  )

}

export default AuthLayoutProtected