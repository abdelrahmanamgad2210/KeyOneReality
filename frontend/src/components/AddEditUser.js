import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEditUser = () => {
  const { id } = useParams(); // Check for ID in the route (edit mode)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    division: "",
    profilePicture: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((response) => {
          const { name, email, phoneNumber, department, division, profilePicture } = response.data;
          setFormData({
            name,
            email,
            phoneNumber,
            department,
            division,
            profilePicture,
          });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.name) data.append("name", formData.name);
    if (formData.email) data.append("email", formData.email);
    if (formData.phoneNumber) data.append("phoneNumber", formData.phoneNumber);
    if (formData.department) data.append("department", formData.department);
    if (formData.division) data.append("division", formData.division);
    if (formData.profilePicture instanceof File) {
        data.append("profilePicture", formData.profilePicture);
    }

    try {
        const url = isEditMode
            ? `http://localhost:5000/api/users/${id}`
            : "http://localhost:5000/api/users/create";

        const method = isEditMode ? "put" : "post";

        const response = await axios({
            method,
            url,
            data,
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert(`${isEditMode ? "User updated" : "User added"} successfully!`);
        navigate("/"); // Redirect to home
    } catch (error) {
        console.error("Error saving user:", error.response?.data || error.message);
        alert("Failed to save user. Check console for more details.");
    }
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEditMode ? "Edit User" : "Add User"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="division"
          value={formData.division}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Division</option>
          <option value="Holiday Homes">Holiday Homes</option>
          <option value="Property Management">Property Management</option>
          <option value="Design Solution">Design Solution</option>
          <option value="Brokerage">Brokerage</option>
        </select>
        <div>
          {isEditMode && formData.profilePicture && !(formData.profilePicture instanceof File) && (
            <img
              src={`http://localhost:5000/${formData.profilePicture}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
          )}
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {isEditMode ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddEditUser;
