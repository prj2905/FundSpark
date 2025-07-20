"use client"
import { useState } from "react";

export default function CampaignForm() {
  const [form, setForm] = useState({

    name: "",
    category: "",
    description: "",
    goal: "",
    deadline: "",
  });

  const categories = [
    "Technology",
    "Art",
    "Music",
    "Design",
    "Publishing",
    "Education",
    "Health",
    "Gaming",
    "Environment",
  ];

  return (
    <section className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mt-20">
      <h2 className="text-2xl font-poppins font-semibold mb-6">Start a Campaign</h2>

      <form className="space-y-6">
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input
            type="text"
            placeholder="e.g. SolarSketch"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={5}
            placeholder="Describe your project idea..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Amount ($)</label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 5000"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        
        <button
          type="submit"
          className="w-full bg-[#364f6b] text-white py-2 rounded-md font-medium hover:bg-[#2c3e50] transition"
          onClick={(e) => {
            e.preventDefault();
            alert("Submitted! (Functionality coming soon)");
          }}
        >
          Submit Campaign
        </button>
      </form>
    </section>
  );
}
