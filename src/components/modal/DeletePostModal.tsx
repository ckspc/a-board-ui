import React, { useState } from "react";
import axiosService from "@/services/api";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  postId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    setIsLoading(true);
    try {
      setError("");
      await axiosService.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onClose();
      window.location.reload();
    } catch (err) {
      const errorData = err as { status: number; message: string };
      setError(errorData.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-lg text-center font-bold text-black">
            Please confirm if you wish to <br /> delete the post
          </h2>
        </div>

        <p className="mb-6 text-[#475467] text-center">
          Are you sure you want to delete the post? Once deleted, it cannot be
          recovered.
        </p>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="md:flex w-full">
          <button
            onClick={onClose}
            className="mb-3 md:mb-0 md:mx-2 w-full md:w-1/2 border border-gray-300 text-gray-700 font-semibold rounded-lg px-6 py-2 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="w-full md:w-1/2 md:mx-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg px-8 py-2 transition-colors"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
