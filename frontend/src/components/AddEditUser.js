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
    for (const key in formData) {
      if (key === "profilePicture" && formData.profilePicture instanceof File) {
        data.append(key, formData.profilePicture);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/users/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/users/create", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving user:", error);
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
