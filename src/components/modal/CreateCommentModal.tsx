import React, { useState } from "react";
import { X } from "lucide-react";
import SuccessButton from "../button/SuccessButton";
import CloseButton from "../button/CloseButton";
import axiosService from "@/services/api";

interface CreateCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const CreateCommentModal: React.FC<CreateCommentModalProps> = ({
  isOpen,
  onClose,
  postId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found");
      return;
    }

    setIsLoading(true);
    try {
      setError("");
      const formData = {
        content: commentText,
        postId: postId,
      };

      await axiosService.post("/comments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
      onClose();
    } catch (err) {
      const errorData = err as { status: number; message: string };
      setError(errorData.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">Add Comment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <textarea
            placeholder="What's on your mind..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-green-500"
          />
          {error && (
            <div className="text-red-500 text-sm font-semibold">
              Cannot create comment: {error}
            </div>
          )}

          <div className=" justify-center">
            <CloseButton
              className="font-semibold w-full h-[40px] mb-3"
              onClick={onClose}
            >
              Cancel
            </CloseButton>
            <SuccessButton
              onClick={handleSubmit}
              className="font-semibold w-full h-[40px]"
              isLoading={isLoading}
              disabled={!commentText.trim()}
            >
              Post
            </SuccessButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommentModal;
