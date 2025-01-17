import authService from "../services/Appwrite/Auth";
import { Link, useNavigate } from "react-router";
import { login } from "../redux/slices/AuthSlice";
import { Button, Input, Logo } from "./";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import notify from "../services/Toast/Toast";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: {errors} } = useForm();

  const createAccount = async (data) => {
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {errors.name?.type=="required" && <p className="text-red-600 mt-8 text-center">Name is required</p>}

        {errors && <p className="text-red-600 mt-8 text-center">{errors.email?.message}</p>}
        {errors.email?.type=="required" && <p className="text-red-600 mt-8 text-center">Email is required</p>}
        {errors.password?.type=="required" && <p className="text-red-600 mt-8 text-center">Password is required</p>}

        <form onSubmit={handleSubmit(createAccount)}>
        <div className='space-y-5'>
            <Input
                label="Full name: "
                placeholder="Enter your full name"
                {...register("name",{
                    required: true
                })}
            />
            <Input
                label="Email: "
                placeholder="Enter your email"
                {...register("email",{
                    required:true,
                    validate:{
                        matchPatter:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                    }
                })}
            />
            <Input
                label="Password: "
                placeholder="Enter your password"
                type="password"
                {...register("password",{
                    required: true,
                })}
            />
            <Button type="submit">Sign up</Button>
            </div>
        </form>

      </div>
    </div>
  );
}

export default Signup;
