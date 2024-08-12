import React, { useState } from "react";

export default function UserModal({ user, onClose, onSave, onDelete }) {
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    if (!fname || !lname || !email) {
      alert("All fields are required.");
      return;
    }

    const updatedUser = { student_id: user.student_id, fname, lname, email };
    onSave(updatedUser);
  };

  const handleDelete = () => {
    onDelete(user.student_id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Edit User</h2>
        <div className="mb-4">
          <label htmlFor="fname" className="block text-gray-700 font-semibold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lname" className="block text-gray-700 font-semibold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete User
          </button>
          <button
            className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
