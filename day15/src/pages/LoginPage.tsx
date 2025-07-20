import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthStore } from "../useAuthStore";
import {
  AiOutlineInfoCircle,
  AiOutlineUser,
  AiOutlineLock,
} from "react-icons/ai";
import { HiExclamationCircle } from "react-icons/hi";
import { useEffect } from "react";

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { login, loading, error, loggedInUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("LoginPage mounted");
    if (loggedInUser) {
      navigate("/my-tasks");
    }
  }, [loggedInUser, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    await login({
      username: data.username,
      password: data.password,
    });
  };
  console.log("LoginPage rendered");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                <div className="flex items-center">
                  <AiOutlineInfoCircle className="w-4 h-4 mr-2" />
                  {error?.message || "Login failed"}
                </div>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your username"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <AiOutlineUser className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <HiExclamationCircle className="w-3 h-3 mr-1" />
                  {errors.username.message as string}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <AiOutlineLock className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <HiExclamationCircle className="w-3 h-3 mr-1" />
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500 transition duration-200"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
