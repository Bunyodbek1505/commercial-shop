import {useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { useForm } from "react-hook-form";
import instance from "../../axios";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await instance.post(`auth/register`, data);
      console.log(data)
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Auth-Register"}>
      <div className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-4xl flex justify-center">
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Create an Account!
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    id="name"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name.message}</small>
                  )}
                </div>
              </div>
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
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                  id="address"
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <small className="text-danger">
                    {errors.address.message}
                  </small>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <div>
                <input
                  type="text"
                  className={`w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300`}
                  {...register("answer", { required: "Answer is required" })}
                  placeholder="What is Your Favorite Sport"
                />
                {errors.answer && (
                  <small className="text-danger">{errors.answer.message}</small>
                )}
              </div>
              <div className="text-center">
                <button
                  className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  type="submit"
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
