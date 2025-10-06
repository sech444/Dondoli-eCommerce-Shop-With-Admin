// In components/CustomButton.tsx

import React from "react";

// 1. Add the optional 'disabled' property to the interface
interface CustomButtonProps {
  paddingX: number;
  paddingY: number;
  text: string;
  buttonType: "submit" | "reset" | "button";
  customWidth: string;
  textSize: string;
  disabled?: boolean; // <-- ADD THIS LINE
}

const CustomButton = ({
  paddingX,
  paddingY,
  text,
  buttonType,
  customWidth,
  textSize,
  disabled, // 2. Destructure the new 'disabled' prop
}: CustomButtonProps) => {
  return (
    <button
      type={buttonType}
      disabled={disabled} // 3. Apply the 'disabled' prop to the HTML button
      className={`
        ${customWidth !== "no" && `w-${customWidth}`}
        px-${paddingX} 
        py-${paddingY} 
        text-${textSize}
        uppercase font-bold border border-gray-300 shadow-sm 
        focus:outline-none focus:ring-2
        transition-colors duration-150
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Styles for when the button IS disabled
            : "bg-white text-blue-600 hover:bg-gray-100" // Styles for when the button is ENABLED
        }
      `}
    >
      {text}
    </button>
  );
};

export default CustomButton;