// import React from "react";
// export function Button({ label, onClick }) {
//     return (
//         <button 
//             onClick={onClick} 
//             type="button" 
//             className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//         >
//             {label}
//         </button>
//     );
// }
import React from "react";

export function Button({ label, onClick, className = "" }) {
    return (
        <button 
            onClick={onClick} 
            type="button" 
            className={`font-medium rounded-lg text-sm px-5 py-2.5 ${className}`}
        >
            {label}
        </button>
    );
}


