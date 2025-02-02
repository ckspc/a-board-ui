"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosService from "@/services/api";
import SuccessButton from "../button/SuccessButton";
import useUserStore from "@/stores/useUserStore";

const SignInForm: React.FC<{ onSwitchToSignUp: () => void }> = ({
  onSwitchToSignUp,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setProfile } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosService.post("/auth/signin", {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      axiosService
        .get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
          router.push("/"); 
        });

      setError("");

      router.push("/");
    } catch (err) {
      const errorData = err as { status: number; message: string };
      setError(errorData.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg w-full max-w-md mx-5 md:mx-0"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">Sign in</h2>
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

      {error && <p className="text-red-500 font-medium my-2">{error}</p>}
      <SuccessButton isLoading={isLoading} className="w-full">
        Sign In
      </SuccessButton>

      <div className="mt-4 text-center flex justify-center items-center">
        <p className="text-white">Don&apos;t have an account?</p>
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="text-btn-success hover:underline ml-2"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
