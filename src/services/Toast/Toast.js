// const notify = () => toast.error("Wow so easy!",{
//     theme:"dark"
//   });


import { toast } from "react-toastify";

class Tost{
    message;
    constructor(message){
        this.message=message
    }

    SuccessToast(message){
        this.message=message;
        toast.success(this.message,{
            theme:"dark"
        })
    }
    ErrorToast(message){
        this.message=message
        toast.error(this.message,{
            theme:"dark"
        })
    }
}

const notify = new Tost()

export default notify