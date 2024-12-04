import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MeetTheTeam = () => {
  const [users, setUsers] = useState([]); // All users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
  const [loading, setLoading] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState(""); // Current filter
  const navigate = useNavigate(); // For navigation

  const defaultImagePath =
    "http://localhost:5000/uploads/png-transparent-default-avatar-thumbnail.png";

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

  return (
    <div className="p-6 bg-purple-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Meet the Team</h1>

        {/* Admin Panel Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Admin Panel
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
            <p className="text-lg text-gray-700">Loading team members...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => {
              const profilePictureSrc = user.profilePicture
                ? `http://localhost:5000/${user.profilePicture}`
                : defaultImagePath;

              return (
                <div
                  key={user._id}
                  className="bg-red-100 shadow-lg rounded-lg p-6 flex flex-col items-center"
                >
                  <img
                    src={profilePictureSrc}
                    alt={user.name || "Default Avatar"}
                    className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
                    onError={(e) => {
                      // Fallback if the image URL is broken
                      e.target.onerror = null;
                      e.target.src = defaultImagePath;
                    }}
                  />
                  <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-gray-600">{user.department}</p>
                  <p className="text-gray-500">{user.division}</p>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.email}
                  </a>
                  <a
                    href={`tel:${user.phoneNumber}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.phoneNumber}
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-700">No team members available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetTheTeam;
