// import React from "react";

// export function Balance({ value }) {
//     return (
//         <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center">
//             <h2 className="text-lg font-semibold">Available Balance</h2>
//             <p className="text-4xl font-bold mt-2">₹{value}</p>
//         </div>
//     );
// }

import React from "react";

export function Balance({ value }) {
    return (
        <div className="p-6 border rounded-lg shadow-md bg-white text-center w-full max-w-xs">
            <h2 className="text-lg font-semibold">Account Balance</h2>
            <p className="text-3xl font-bold text-green-600">₹{value}</p>
        </div>
    );
}
