import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  // Validation function for username (email or phone)
  const validateUsername = (value: string) => {
    if (value.length < 5) {
      return "Minimum 5 characters required";
    }

    // Check if it's a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if it's a valid phone number (basic pattern)
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return "Must be a valid email or phone number";
    }

    return true;
  };

  // Validation function for password
  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (/\s/.test(value)) {
      return "Password cannot contain spaces";
    }

    if (!/[a-zA-Z]/.test(value)) {
      return "Password must contain at least 1 letter";
    }

    return true;
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row items-stretch min-h-screen bg-gray-100 p-0">
      {/* Left side - Image and content */}
      <div className="w-full md:w-2/3 min-h-[300px] md:h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center p-6 md:p-12 relative">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl md:text-5xl text-gray-800 font-bold text-start leading-tight mb-6 md:mb-8">
            Set Your Partner
            <br />
            Recruitment on Auto-Pilot
          </h1>
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <img
            className="max-w-full max-h-60 md:max-h-96 object-contain"
            src="images/24719203_7000959.svg"
            alt="Recruitment illustration"
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/3 min-h-[400px] md:h-screen bg-white flex flex-col justify-center p-6 md:p-12 relative">
        {/* Logo */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <div className="text-red-500 font-bold text-lg md:text-xl">
            🏠 Grovia
          </div>
        </div>

        <div className="max-w-sm mx-auto w-full">
          <h2 className="text-xl md:text-2xl text-red-500 font-semibold mb-2">
            Login
          </h2>

          <h3 className="text-base md:text-lg text-gray-800 font-medium mb-2">
            Login to your account
          </h3>

          <p className="text-sm text-gray-600 mb-6 md:mb-8">
            Thank you for get back to Grovia, let's access our the best
            recommendation for you.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                {...register("username", {
                  required: "Username is required",
                  validate: validateUsername,
                })}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition duration-200 ${
                  errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="GroviaPass123"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition duration-200 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500 focus:border-transparent"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("rememberMe")}
                  className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-red-500 hover:underline">
                Reset Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SIGN IN
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account yet?{" "}
              <a href="#" className="text-red-500 hover:underline font-medium">
                Join Grovia Now!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
