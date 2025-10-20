"use client";

import { useState } from "react";
import useSWR from "swr";
import { FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
}

interface ModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

function UserModal({ user, onClose, onSave }: ModalProps) {
  const [formData, setFormData] = useState<User | null>(user);

  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  if (!user || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev && { ...prev, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white rounded-2xl p-6 w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
          >
            <option value="CLIENT">CLIENT</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
          <button
            className="bg-lime-500 hover:bg-lime-400 text-black font-semibold py-2 rounded mt-2"
            onClick={() => { formData && onSave(formData); onClose(); }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Users() {
  const { data: users, error, isLoading } = useSWR<User[]>("/api/admin/users", fetcher);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "CLIENT" | "ADMIN">("ALL");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Failed to load users</p>;

  const filteredUsers = users?.filter(
    (user) =>
      (roleFilter === "ALL" || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      // Optimistic UI update; ideally call API to delete
      users && (users.splice(users.findIndex(u => u.id === id), 1));
    }
  };

  const handleSave = (updatedUser: User) => {
    // Optimistic UI update; ideally call API to save
    users && users.map(u => (u.id === updatedUser.id ? updatedUser : u));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white w-full">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white focus:outline-none"
          />
        </div>
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as "ALL" | "CLIENT" | "ADMIN")}
        >
          <option value="ALL">All Roles</option>
          <option value="CLIENT">Client</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    className="bg-lime-500 p-2 rounded hover:bg-lime-400 text-black"
                    onClick={() => { setSelectedUser(user); setShowModal(true); }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded hover:bg-red-400 text-black"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="bg-gray-700 p-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="bg-gray-700 p-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {showModal && selectedUser && (
        <UserModal user={selectedUser} onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  );
}
