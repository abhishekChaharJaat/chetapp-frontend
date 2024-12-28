import React from "react";

const Button = ({ title, onclick, className }) => {
  return (
    <div>
      <button
        type="button" // Prevents form submission if you don't want that
        className={`bg-gray-600 text-white py-1 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 ${className}`}
        onClick={onclick} // Ensure `onclick` is correctly passed and used here
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
