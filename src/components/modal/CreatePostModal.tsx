import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import SuccessButton from "../button/SuccessButton";
import CloseButton from "../button/CloseButton";
import axiosService from "@/services/api";
import { useRouter } from "next/navigation";
import { PostCategory } from "@/types/category";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = Object.values(PostCategory);

const CreatePostModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | "">(
    ""
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category: PostCategory) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !title || !content) {
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
        category: selectedCategory,
        title,
        content,
      };

      const response = await axiosService.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onClose();
      router.push(`/posts/${response.data.id}`);
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
          <h2 className="text-xl font-bold text-black">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full md:w-56 inline-flex items-center justify-between px-6 py-3 text-green-600 border-2 border-green-600 rounded-xl"
            >
              <span className="whitespace-nowrap">
                {selectedCategory || "Choose a category"}
              </span>
              <ChevronDown
                className={`ml-2 w-5 h-5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full md:w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <ul className="py-1">
                  {CATEGORIES.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700"
                      onClick={() => selectCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
          />

          <textarea
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-green-500"
          />
          {error && (
            <div className="text-red-500 text-sm font-semibold">
              Can not create Post : {error}
            </div>
          )}

          <div className="md:flex md:justify-end md:space-x-3">
            <CloseButton
              className="font-semibold w-full md:w-24 h-[40px] mb-3"
              onClick={onClose}
            >
              Cancel
            </CloseButton>
            <SuccessButton
              onClick={handleSubmit}
              className="font-semibold w-full md:w-24 h-[40px]"
              isLoading={isLoading}
              disabled={!selectedCategory || !title || !content}
            >
              Post
            </SuccessButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
