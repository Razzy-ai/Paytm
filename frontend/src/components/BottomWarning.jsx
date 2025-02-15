import React from "react";
import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to = "#" }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div className="mr-1">
        <span className="text-gray-700">{label}</span> {/* Ensure styling applies */}
      </div>
      <Link className="underline text-blue-600 hover:text-blue-800" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
