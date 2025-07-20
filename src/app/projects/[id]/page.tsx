"use client";
import { useParams } from 'next/navigation';
import { useState } from "react";
import projects from "@/app/components/Data/crowdfunding_projects.json";
import getStripe from "@/app/utils/get-stripe";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage() {
 const { id } = useParams();
  const projectId = Number(id);
  const project = projects.find((p) => p.id === projectId);
  const [loadingTier, setLoadingTier] = useState<number | null>(null);

  const handleSelectTier = async (amount: number) => {
    setLoadingTier(amount);
    try {
      const res = await fetch("/api/checkout_sessions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          campaignId: String(projectId),
          backerEmail: "backer@example.com",
        }),
      });

      const { url } = await res.json();
      const stripe = await getStripe();
      if (stripe && url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoadingTier(null);
    }
  };

  if (!project)
    return <div className="p-8 text-center text-lg">🚫 Project not found.</div>;


  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-10">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <Image
          src={project.image}
          alt={project.name}
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-bold text-gray-800">{project.name}</h1>
        <p className="text-gray-600 italic">{project.blurb}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Project Info</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Creator:</strong> {project.creator.name}</li>
              <li><strong>Location:</strong> {project.location}</li>
              <li><strong>Category:</strong> {project.category}</li>
              <li><strong>Goal:</strong> ${project.goal.toLocaleString()}</li>
              <li><strong>Pledged:</strong> ${project.pledged.toLocaleString()} ({project.percentageFunded}% funded)</li>
              <li><strong>Days Left:</strong> {project.daysLeft}</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Back This Project</h2>
            <ul className="space-y-4">
              {project.what_will_you_get.map((tier, index) => (
                <li
                  key={index}
                  className="border rounded-lg p-4 hover:border-green-500 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium">${tier.amount}</p>
                      <p className="text-gray-600">{tier.reward}</p>
                    </div>
                    <button
                      onClick={() => handleSelectTier(tier.amount)}
                      disabled={loadingTier === tier.amount}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition disabled:opacity-50"
                    >
                      {loadingTier === tier.amount ? "Redirecting..." : "Select"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Story</h2>
            <p className="text-gray-800 whitespace-pre-line">{project.story}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">About the Company</h2>
            <p className="text-gray-800 whitespace-pre-line">{project.company_description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Risks and Challenges</h2>
            <p className="text-gray-800 whitespace-pre-line">{project.risks_and_challenges}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
