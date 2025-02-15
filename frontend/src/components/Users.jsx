import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Button } from "./Button";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }

        fetchUsers(""); // Fetch all users initially
    }, []);

    const fetchUsers = async (query) => {
        setLoading(true);
        setError("");

        try {
            console.log(`Fetching users from API: http://localhost:3000/api/v1/user/bulk?filter=${query}`);

            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${query}`);
            console.log("API Response:", response.data);
            if (response.data.users) {
                setUsers(response.data.users);
            } else {
                setUsers([]);
            }
        } catch (err) {
            setError("Failed to fetch users. Please try again.");
            console.error("Error fetching users:", err);
        }

        setLoading(false);
    };

    const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), [fetchUsers]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        debouncedFetchUsers(e.target.value);
    };

    // ✅ Filter by `username` instead of `email`
    const filteredUsers = users.filter(user => user.username !== loggedInUser?.username);

    return (
        <div className="mt-6 w-full max-w-lg bg-gray-900 p-5 rounded-md shadow-md">
            <h2 className="font-bold text-lg text-gray-800">Users</h2>

            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full px-3 py-2 border rounded-md border-gray-500 text-white bg-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            {loading && <p className="text-gray-400 text-sm">Loading users...</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-3">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => {
                        console.log("Rendering User:", user);
                        return <User key={user._id} user={user} />;
                    })
                ) : (
                    !loading && <p className="text-gray-400 text-sm">No users found.</p>
                )}
            </div>
        </div>
    );
};

// ✅ Fixed User Component
function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-4 border border-gray-700 rounded-2xl shadow-lg bg-gray-900 transition-all hover:bg-gray-800">
        {/* User Avatar & Details */}
        <div className="flex items-center space-x-4">
            {/* Gradient Avatar */}
            <div className="rounded-full h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold border border-gray-300 shadow-md">
               <span className="text-gray-600">{user.firstname[0].toUpperCase()}</span>
             </div>



            {/* User Info */}
            <div>
                <div className="text-gray-700 font-medium text-lg">{user.firstname} {user.lastname}</div>
                <div className="text-sm text-gray-400">@{user.username}</div>
            </div>
        </div>

        {/* Send Money Button */}
        <Button 
            label="Send Money" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md"
            onClick= {() => navigate(`/transfer?id=${user._id}&name=${user.firstname}`)}
             />
    </div>

    );
}

// ✅ Fixed PropTypes
User.propTypes = {
    user: PropTypes.shape({
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired, 
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default Users;
