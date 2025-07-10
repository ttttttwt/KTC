import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../service"; // import hàm login

type LoginFormData = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      const res = await login(data.username, data.password);
      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("user_id", res.loggedInUser.id);
        window.location.href = "/my-tasks"; // Redirect to My Tasks page
      } else {
        setLoginError(res.message || "Login failed");
      }
    } catch (error) {
      setLoginError("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-md w-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        {loginError && (
          <div className="mb-4 text-red-500 text-sm">{loginError}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <span className="text-red-500 text-xs">
              {errors.username.message as string}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message as string}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
