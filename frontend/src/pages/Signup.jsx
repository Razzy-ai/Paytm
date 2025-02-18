import React, { useState } from "react";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError(""); // Clear previous errors
    try {
      console.log("Sending data:", { userName, firstName, lastName, password });

      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: userName, 
        firstname: firstName,
        lastname: lastName,
        password: password,
      });

      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard after successful signup
      navigate("/dashboard"); 

    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
          <Heading label="Sign up" className="text-2xl font-bold" />
          <SubHeading label="Enter your information to create an account" className="text-gray-600 mb-4" />

          <div className="space-y-4 text-gray-600 text-left">
            <InputBox
              label="Email"
              placeholder="example@mail.com"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <InputBox
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <InputBox
              label="Last Name"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <InputBox
              label="Password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="pt-4 flex justify-center">
            <Button
              onClick={handleSignup}
              label="Sign up"
              className="w-3/4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            />
          </div>

          <BottomWarning 
            label={<span className="text-blue-500 font-semibold">Already have an account?</span>} 
            buttonText="Sign in" 
            to="/signin" 
            className="text-center mt-4" 
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
