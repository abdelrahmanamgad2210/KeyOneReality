import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
  const defaultImagePath =
    "http://localhost:5000/uploads/png-transparent-default-avatar-thumbnail.png";

  const profilePictureSrc = user.profilePicture
    ? `http://localhost:5000/${user.profilePicture}`
    : defaultImagePath; 

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={profilePictureSrc}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
        onError={(e) => {
          // Fallback if the image URL is broken
          e.target.onerror = null;
          e.target.src = defaultImagePath;
        }}
      />
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-500">{user.email}</p>
      <p className="text-gray-500">{user.phoneNumber}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
