import React from "react";
import { Link } from "react-router-dom";
import { FaMobileAlt, FaQrcode, FaWallet } from "react-icons/fa";
import paytmLogo from "../assets/paytm-logo.png";
import ScanAndPay from "../components/ScanAndPay";
import { useState } from "react";


const Home = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-white p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
        
      <div className="flex flex-col items-center text-center">
  <img src={paytmLogo} alt="Paytm Logo" className="w-[250px] h-auto mx-auto mb-8" />
  <p className="text-gray-600 mt-2">Fast, secure, and hassle-free transactions.</p>
</div>

        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center bg-blue-100 p-4 rounded-xl shadow-md">
            <FaMobileAlt className="text-blue-600 text-3xl" />
            <p className="text-sm text-gray-700 mt-2">Mobile Recharge</p>
          </div>

          {/* Modify the Scan & Pay component to initiate an Ethereum transaction when scanning a QR code. */}
          <div
           className="flex flex-col items-center bg-blue-100 p-4 rounded-xl shadow-md cursor-pointer"
            onClick={() => setShowModal(true)}
             >
            <FaQrcode className="text-blue-600 text-3xl" />
           <p className="text-sm text-gray-700 mt-2">Scan & Pay</p>
           </div>

          <div className="flex flex-col items-center bg-blue-100 p-4 rounded-xl shadow-md">
            <FaWallet className="text-blue-600 text-3xl" />
            <p className="text-sm text-gray-700 mt-2">Wallet</p>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4 justify-center">
          <Link to="/signin" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all">Sign In</Link>
          <Link to="/signup" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all">Sign Up</Link>
        </div>
      </div>

      {/* QR Code Payment Modal */}
      {showModal && <ScanAndPay closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
