import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Sending login data:", { username: email, password });
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", { 
      username: email, 
      password
     });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Login</h2>
        
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        {error && <p className="text-red-500">{error}</p>}

        <button 
          className="bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-2 text-gray-800">
          New User? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
