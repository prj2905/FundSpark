 'use client'
import { useState,useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import kickstarter_projects from "./../Data/crowdfunding_projects.json";

export default function Projects() {
    const [projects, setProjects] = useState(kickstarter_projects.slice(0, 5));
    
    return (
        <div className="feature py-10 px-4">
  <h1 className="text-3xl font-bold text-gray-900 mb-6">🌟 Featured Projects</h1>

  <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
    {projects.map((project) => (
      <div
        key={project.id}
        className="min-w-[280px] sm:min-w-[320px] bg-white rounded-2xl shadow-lg p-5 border border-gray-100 flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
      >
        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
          {project.category}
        </span>

        <h3 className="text-xl font-semibold text-[#364f6b] mt-2 mb-2 leading-snug">
          {project.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-700 mt-auto">
          <span className="text-gray-500">{project.daysLeft} days left</span>
          <span className="font-semibold text-green-600">{project.percentageFunded}% funded</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(project.pledged-project.goal)/100}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>


    )
}