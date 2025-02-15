import React from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AppBar />
      
      <div className="pt-50 max-w-screen-lg mx-auto p-8">
        <div className=" pt-30 p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Balance value={"10000"} />
          <Users />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


