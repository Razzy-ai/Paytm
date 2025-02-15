import React from "react";
export function SubHeading({ label, className = "" }) {
    return (
      <h2 className={`text-slate-500 text-md pt-1 px-4 pb-4 ${className}`}>
        {label || "Default Subheading"}
      </h2>
    );
  }
  