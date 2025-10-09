import React from "react";
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const Toast = ({ show, title, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (

    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-5 right-5 z-50 w-full max-w-sm animate-fade-in-down"
    >
      <div className="flex items-center justify-between w-full p-4 bg-white rounded-xl shadow-lg">
        
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircleIcon />
          </div>
          <div className="flex-grow">
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>

        
        <button
          onClick={onClose}
          aria-label="Close"
          className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast