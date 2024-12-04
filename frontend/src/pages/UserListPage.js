import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const [users, setUsers] = useState([]); // All users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
  const [loading, setLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState(""); // Current filter
  const navigate = useNavigate();

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle division filter
  const handleDivisionChange = (event) => {
    const division = event.target.value;
    setSelectedDivision(division);

    if (division === "") {
      // Show all users if no division is selected
      setFilteredUsers(users);
    } else {
      // Filter users by division
      const filtered = users.filter((user) => user.division === division);
      setFilteredUsers(filtered);
    }
  };

//add user
const handleAdd = () => {
  navigate("/add"); // Ensure this route is correctly handled in your routing setup
};

  //edit user
  const handleEdit = (user) => {
    console.log("Edit user:", user);
    navigate(`/edit/${user._id}`); // Navigate to the edit page with the user's ID
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/api/users/${id}`)
        .then(() => {
          const updatedUsers = users.filter((user) => user._id !== id);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers); // Update filtered users as well
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Meet the Team</h1>

      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Main Page
        </button>
        <button
          onClick={() => handleAdd()}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Add User
        </button>
      </div>

      {/* Division Filter Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedDivision}
          onChange={handleDivisionChange}
          className="p-3 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Divisions</option>
          <option value="Holiday Homes">Holiday Homes</option>
          <option value="Property Management">Property Management</option>
          <option value="Design Solution">Design Solution</option>
          <option value="Brokerage">Brokerage</option>
        </select>
      </div>

      {/* User Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-700">Loading users...</p>
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-700">No users found for the selected division.</p>
        </div>
      )}
    </div>
  );
};

export default UserListPage;
