import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  newsletter: boolean;
  terms: boolean;
};

export default function FormRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <div className="flex flex-col md:flex-row container mx-auto min-h-screen items-stretch">
      <div className="w-full md:w-1/3 min-h-[300px] md:h-screen relative">
        <div className="absolute inset-0 z-0">
          <img
            src="images/2.png"
            alt="Business Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-blue-500/90 z-10"></div>
        <div className="relative z-20 p-6 md:p-8 text-white h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <span className="text-lg md:text-xl">🖥️</span>
            <span className="font-medium">Lottery Display</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-light leading-tight mb-3 md:mb-4">
            A few clicks away from creating your Lottery Display
          </h1>
          <div className="mb-6 md:mb-8">
            <img
              src="/images/416666781_11648733.svg"
              alt="World illustration"
              className="w-40 h-40 md:w-72 md:h-72 mx-auto"
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 bg-white p-4 md:p-12">
        <h2 className="text-xl md:text-2xl font-medium mb-2">Register</h2>
        <p className="text-gray-600 mb-4 md:mb-8">
          Manage all your lottery efficiently
        </p>
        <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-8">
          Let's get you all set up so you can verify your personal account and
          begin setting up your profile.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                className={`w-full border rounded p-2 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters",
                  },
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className={`w-full border rounded p-2 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters",
                  },
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="0987654321"
                className={`w-full border rounded p-2 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10,15}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className={`w-full border rounded p-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="******"
                className={`w-full border rounded p-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter and one number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="******"
                className={`w-full border rounded p-2 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("newsletter")} />
              <span className="text-sm">
                Yes, I want to receive Lottery Display emails
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
              />
              <span className="text-sm">
                I agree to all the{" "}
                <a href="#" className="text-blue-500">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="text-blue-500">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500">
                  Fees
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Account
          </button>

          <p className="text-center text-xs md:text-sm">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
