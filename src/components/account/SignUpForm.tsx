"use client";
import { useState } from "react";
import axiosService from "@/services/api";
import SuccessButton from "../button/SuccessButton";
import { ThreeDots } from "react-loader-spinner";

const SignUpForm: React.FC<{ onSwitchToSignIn: () => void }> = ({
  onSwitchToSignIn,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosService.post("/auth/signup", {
        name,
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      setError("");
      setLoading(false);
      onSwitchToSignIn();
    } catch (err) {
      const errorData = err as { status: number; message: string };
      setError(errorData.message || "An unknown error occurred.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg w-full max-w-md  mx-5 md:mx-0">
      <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>

      {error && <p className="text-red-500 font-medium my-2">{error}</p>}

      <SuccessButton className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex justify-center items-center">
            <ThreeDots
              height="30"
              width="30"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          "Sign Up"
        )}
      </SuccessButton>

      <div className="mt-4 text-center flex justify-center items-center">
        <p className="text-white">Already have an account?</p>
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-btn-success hover:underline ml-2"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
