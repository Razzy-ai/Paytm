import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";

const Transfer = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const recipientName = params.get("name") || "Friend's Name"; 
  const recipientId = params.get("id"); // Extract recipient ID from URL

  const [amount, setAmount] = useState(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
        
        {/* Title */}
        <Heading label="Send Money" className="text-2xl font-bold text-center text-gray-800" />

        {/* Recipient Section */}
        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg mt-6 shadow-sm">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-lg">
            {recipientName[0].toUpperCase()}
          </div>
          <span className="font-medium text-gray-700 text-lg">{recipientName}</span>
        </div>

        {/* Amount Input */}
        <div className="mt-5">
          <label className="block text-gray-600 text-sm font-medium mb-2">Amount (in Rs)</label>
          <InputBox 
            onChange={(e) => setAmount(Number(e.target.value))} // Convert to number
            placeholder="Enter amount" 
            id="amount"
            type="number" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        {/* Send Button */}
        <div className="mt-5">
          <Button 
            onClick={() => {
              if (!recipientId) {
                alert("Recipient ID is missing!");
                return;
              }
              if (amount <= 0) {
                alert("Please enter a valid amount!");
                return;
              }
              
              axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: recipientId,
                amount
              }, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                }
              })
              .then(() => {
                alert("Transfer Successful!");
              })
              .catch(error => {
                alert("Transfer Failed: " + (error.response?.data?.message || "An error occurred"));
              });
            }}
            label="Initiate Transfer" 
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md"
          />
        </div>

      </div>
    </div>
  );
};

export default Transfer;
