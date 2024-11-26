import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import instance from "../../axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  // const location = useLocation();

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const res = await instance.post(`auth/login`, data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate( "/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Auth-Login"}>
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-4xl flex justify-center">
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-6">Login</h3>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              <div className="text-center">
                <button
                  className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <Link className="text-blue-500 hover:underline" to="/forgot">
                  Forgot Password?
                </Link>
                <Link className="text-blue-500 hover:underline" to="/login">
                  Already have an account? Sign Up!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
