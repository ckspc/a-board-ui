import React from "react";
import { ThreeDots } from "react-loader-spinner";

interface SuccessButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const SuccessButton: React.FC<SuccessButtonProps> = ({
  children,
  onClick,
  className = "",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-6 py-3 bg-btn-success hover:bg-btn-success-hover text-white rounded-lg font-medium transition duration-300 ${
        disabled || isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-btn-success"
      } ${className}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ThreeDots
            height="30"
            width="30"
            color="#fff"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default SuccessButton;