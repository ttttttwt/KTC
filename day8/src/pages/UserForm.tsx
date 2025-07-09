import React from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaCalendarAlt,
  FaGlobe,
  FaCamera,
  FaEdit,
  FaExclamationCircle,
} from "react-icons/fa";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePicture: FileList | null;
  bio: string;
}

const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "",
      dob: "",
      country: "",
      hobbies: [],
      profilePicture: null,
      bio: "",
    },
  });

  const password = watch("password");
  const bio = watch("bio");

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "in", label: "India" },
    { value: "vn", label: "Vietnam" },
  ];

  const hobbiesList = ["reading", "traveling", "gaming"];

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const isOver18 = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age >= 18;
  };

  const validateProfilePicture = (files: FileList | null) => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    return (
      validTypes.includes(file.type) ||
      "Please select a valid image file (.jpg, .jpeg, .png)"
    );
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          User Registration
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaUser className="mr-2 text-gray-500" />
              Full Name *
            </label>
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.fullName.message}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaEnvelope className="mr-2 text-gray-500" />
              Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  isValidEmail(value) || "Please enter a valid email address",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaLock className="mr-2 text-gray-500" />
              Password *
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  isValidPassword(value) ||
                  "Password must be at least 8 characters with letters and numbers",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaLock className="mr-2 text-gray-500" />
              Confirm Password *
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaPhone className="mr-2 text-gray-500" />
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10,}$/,
                  message: "Please enter at least 10 digits",
                },
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.phone.message}
              </div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 block">
              Gender *
            </label>
            <div className="flex gap-6">
              {["male", "female", "other"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    value={gender}
                    {...register("gender", {
                      required: "Please select a gender",
                    })}
                    className="mr-2 text-blue-600"
                  />
                  <span className="capitalize">{gender}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.gender.message}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              Date of Birth *
            </label>
            <input
              type="date"
              {...register("dob", {
                required: "Date of birth is required",
                validate: (value) =>
                  isOver18(value) || "You must be at least 18 years old",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.dob ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dob && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.dob.message}
              </div>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaGlobe className="mr-2 text-gray-500" />
              Country *
            </label>
            <select
              {...register("country", {
                required: "Please select a country",
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            {errors.country && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.country.message}
              </div>
            )}
          </div>

          {/* Hobbies */}
          <div>
            <label className="text-gray-700 font-semibold mb-3 block">
              Hobbies *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {hobbiesList.map((hobby) => (
                <label key={hobby} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={hobby}
                    {...register("hobbies", {
                      required: "Please select at least one hobby",
                    })}
                    className="mr-2 text-blue-600"
                  />
                  <span className="capitalize">{hobby}</span>
                </label>
              ))}
            </div>
            {errors.hobbies && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.hobbies.message}
              </div>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaCamera className="mr-2 text-gray-500" />
              Profile Picture
            </label>
            <input
              type="file"
              {...register("profilePicture", {
                validate: validateProfilePicture,
              })}
              accept=".jpg,.jpeg,.png"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.profilePicture && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.profilePicture.message}
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="flex items-center text-gray-700 font-semibold mb-2">
              <FaEdit className="mr-2 text-gray-500" />
              Bio / About You
            </label>
            <textarea
              {...register("bio", {
                maxLength: {
                  value: 300,
                  message: "Bio must not exceed 300 characters",
                },
              })}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.bio ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Tell us about yourself..."
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {bio?.length || 0}/300
            </div>
            {errors.bio && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <FaExclamationCircle className="mr-1" />
                {errors.bio.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
               
