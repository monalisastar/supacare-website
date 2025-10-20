"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from "react-icons/fa";

// Service type
interface Service {
  id: string;
  name: string;
  category: string;
  owner: string; // user who submitted
  status: "PENDING" | "APPROVED" | "REJECTED";
}

// Modal props
interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSave: (updatedService: Service) => void;
}

function ServiceModal({ service, onClose, onSave }: ServiceModalProps) {
  const [formData, setFormData] = useState<Service | null>(service);

  useEffect(() => {
    setFormData(service);
  }, [service]);

  if (!service || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
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
        <h2 className="text-xl font-bold mb-4">Edit Service</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
            placeholder="Service Name"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
            placeholder="Category"
          />
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
            placeholder="Owner"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="bg-gray-800 p-2 rounded text-white"
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
          <button
            className="bg-lime-500 hover:bg-lime-400 text-black font-semibold py-2 rounded mt-2"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  // Mock fetch services
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      try {
        const mockServices: Service[] = [
          { id: "1", name: "Composting Setup", category: "Composting", owner: "Alice", status: "PENDING" },
          { id: "2", name: "Smart Bin Installation", category: "Waste Management", owner: "Bob", status: "APPROVED" },
          { id: "3", name: "Consultancy: Climate Strategy", category: "Consultancy", owner: "Charlie", status: "PENDING" },
          { id: "4", name: "AI Chatbot Development", category: "AI", owner: "David", status: "REJECTED" },
          { id: "5", name: "Compost Sales", category: "Composting", owner: "Eve", status: "APPROVED" },
        ];
        setServices(mockServices);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  // Filter + Search
  const filteredServices = services.filter(
    (service) =>
      (categoryFilter === "ALL" || service.category === categoryFilter) &&
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.owner.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleApprove = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "APPROVED" } : s))
    );
  };

  const handleReject = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "REJECTED" } : s))
    );
  };

  const handleSave = (updatedService: Service) => {
    setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
  };

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white w-full">
      <h1 className="text-2xl font-bold mb-4">Services Management</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by service or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white focus:outline-none"
          />
        </div>
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="Composting">Composting</option>
          <option value="Waste Management">Waste Management</option>
          <option value="Consultancy">Consultancy</option>
          <option value="AI">AI</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2">Service</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Owner</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service) => (
                <tr key={service.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-2">{service.name}</td>
                  <td className="p-2">{service.category}</td>
                  <td className="p-2">{service.owner}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded font-semibold ${
                        service.status === "APPROVED"
                          ? "bg-lime-500 text-black"
                          : service.status === "REJECTED"
                          ? "bg-red-500 text-black"
                          : "bg-gray-600 text-white"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2">
                    {service.status === "PENDING" && (
                      <>
                        <button
                          className="bg-lime-500 p-2 rounded hover:bg-lime-400 text-black"
                          onClick={() => handleApprove(service.id)}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className="bg-red-500 p-2 rounded hover:bg-red-400 text-black"
                          onClick={() => handleReject(service.id)}
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    <button
                      className="bg-gray-700 p-2 rounded hover:bg-gray-600 text-white"
                      onClick={() => {
                        setSelectedService(service);
                        setShowModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-gray-700 p-2 rounded hover:bg-gray-600 text-white"
                      onClick={() => handleDelete(service.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <ServiceModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
