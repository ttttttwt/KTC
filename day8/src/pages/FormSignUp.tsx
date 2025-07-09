import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function FormSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="p-2 mx-auto rounded-lg bg-center h-[80vh] w-96 flex flex-col justify-center"
      style={{
        background: `linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%, black 100%), url('images/1.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div>
        <h1 className="text-white text-3xl font-medium text-start">Sign Up</h1>
      </div>
      <div className="flex flex-col items-center bg-gray-600/30 backdrop-blur-sm h-fit my-4 rounded-2xl p-6">
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full mb-4">
            <label className="block text-white text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded border-2 border-gray-300 bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="Jane Doe"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}

          <div className="w-full mb-4">
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded border-2 border-gray-300 bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="jane.doe@example.com"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">
              Please enter a valid email address
            </span>
          )}

          <div className="w-full mb-4">
            <label className="block text-white text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 rounded border-2 border-gray-300 pr-14 bg-white focus:border-emerald-500 focus:outline-none"
                placeholder="Enter your password"
                {...register("password", { required: true, minLength: 8 })}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "View"}
              </button>
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              Password must be at least 8 characters
            </span>
          )}
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
