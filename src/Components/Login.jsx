import { Link, useNavigate } from "react-router";
import { login as authLogin } from "../redux/slices/AuthSlice";

import { Button, Input, Logo } from "./";
import authService from "../services/Appwrite/Auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import notify from "../services/Toast/Toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register, formState:{errors} } = useForm();

  const login = async (data) => {
    try {
        const session = await authService.loginAccount(data);
        if (session) {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(authLogin(userData));
                notify.SuccessToast("you logged in")
                navigate("/");
            }
        }
    } catch (error) {
        notify.ErrorToast(`Error: ${error}`);
    }
};

  
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {errors && <p className="text-red-600 mt-8 text-center">{errors.email?.message}</p>}
        {errors.password?.type=="required" && <p className="text-red-600 mt-8 text-center">Password is required</p>}

        <form onSubmit={handleSubmit(login)}>

            <div className="space-y-5">
                <Input
                    label="Email: "
                    placeholder="Enter your Email"
                    type="text"
                    {...register("email",{
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })
                    }
                />
                <Input
                    label="Password: "
                    placeholder="Enter your Password"
                    type="password"
                    {...register("password",{
                        required: true,
                    })}
                />
                <Button
                    type="submit"
                    className="w-full"
                >Sign In</Button>
            </div>

        </form>


      </div>
    </div>
  );
}

export default Login;
