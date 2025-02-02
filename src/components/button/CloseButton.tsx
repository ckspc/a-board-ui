import React from "react";
import { ThreeDots } from "react-loader-spinner";

interface SuccessButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const CloseButton: React.FC<SuccessButtonProps> = ({
  children,
  onClick,
  className = "",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 border-2 border-btn-success text-btn-success rounded-lg font-medium transition duration-300 flex items-center justify-center ${
        disabled || isLoading ? "bg-gray-400 cursor-not-allowed" : ""
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
        <span className="flex items-center justify-center">{children}</span>
      )}
    </button>
  );
};

export default CloseButton;