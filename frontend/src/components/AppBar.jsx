// import React from "react";

// export const AppBar = () => {
//     return (
//         <div className="w-full h-16 bg-blue-600 text-white px-6 shadow-md flex justify-between items-center fixed top-0 left-0 z-50">
//             {/* Logo or App Title */}
//             <div className="text-xl font-bold tracking-wide">Paytm Dashboard</div>

//             {/* User Profile Section */}
//             <div className="flex items-center space-x-4">
//                 <span className="text-sm">Hello, User</span>
//                 <div className="h-10 w-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-semibold text-lg">
//                     U
//                 </div>
//             </div>
//         </div>
//     );
// };

import React from "react";

export const AppBar = () => {
    return (
        <div className="w-full bg-blue-600 text-white p-4 shadow-md flex justify-between items-center fixed top-0 left-0 z-50">
            <div className="text-lg font-bold">Paytm Dashboard</div>
            <div className="flex items-center space-x-4">
                <div className="text-sm">Hello, User</div>
                <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">U</div>
            </div>
        </div>
    );
};
