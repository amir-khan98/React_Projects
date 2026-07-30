import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-5 py-4 rounded-2xl border hover:bg-blue-500 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
