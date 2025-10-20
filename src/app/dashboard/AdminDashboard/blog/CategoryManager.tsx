"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaGripLines } from "react-icons/fa";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const glassmorphism = "bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl";

interface Category {
  id: string;
  name: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // Fetch categories (mock API)
  useEffect(() => {
    // Replace with real API call
    setCategories([
      { id: "1", name: "Technology" },
      { id: "2", name: "Health" },
      { id: "3", name: "Lifestyle" },
    ]);
  }, []);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const newCat = { id: Date.now().toString(), name: newCategory.trim() };
    setCategories((prev) => [...prev, newCat]);
    setNewCategory("");
    // TODO: API POST /categories
  };

  const updateCategory = async (id: string) => {
    if (!editingName.trim()) return;
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, name: editingName.trim() } : cat))
    );
    setEditingId(null);
    setEditingName("");
    // TODO: API PUT /categories/:id
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    // TODO: API DELETE /categories/:id
  };

  // Drag-and-drop setup
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = categories.findIndex((cat) => cat.id === active.id);
      const newIndex = categories.findIndex((cat) => cat.id === over.id);
      setCategories((prev) => arrayMove(prev, oldIndex, newIndex));
      // TODO: API PATCH /categories/reorder
    }
  };

  const SortableItem = ({ category }: { category: Category }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: category.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex items-center justify-between p-3 ${glassmorphism} mb-2`}
      >
        <div className="flex items-center gap-2">
          <span {...attributes} {...listeners} className="cursor-grab">
            <FaGripLines />
          </span>
          {editingId === category.id ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="p-1 rounded bg-white/20 border border-white/30 text-white"
            />
          ) : (
            <span>{category.name}</span>
          )}
        </div>
        <div className="flex gap-2">
          {editingId === category.id ? (
            <button
              onClick={() => updateCategory(category.id)}
              className="px-2 py-1 bg-green-600 rounded hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                setEditingId(category.id);
                setEditingName(category.name);
              }}
              className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700"
            >
              <FaEdit />
            </button>
          )}
          <button
            onClick={() => deleteCategory(category.id)}
            className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-6 ${glassmorphism} flex flex-col gap-4`}>
      <h2 className="text-xl font-bold">Manage Blog Categories</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60"
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <FaPlus /> Add
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categories.map((cat) => cat.id)} strategy={verticalListSortingStrategy}>
          {categories.map((cat) => (
            <SortableItem key={cat.id} category={cat} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
