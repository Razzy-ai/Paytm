import React from "react";

export function Heading({ label, className = "", textColor = "text-gray-900" }) {
  return (
    <h1 className={`font-bold text-4xl pt-6 ${textColor} ${className} 
                    sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>
      {label || "Default Heading"}
    </h1>
  );
}
