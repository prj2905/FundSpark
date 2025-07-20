'use client';
import kickstarter_projects from '../Data/crowdfunding_projects.json';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Project = {
  id: number;
  name: string;
  image: string;
  blurb: string;
  description: string;
  goal: number;
  pledged: number;
  currency: string;
  deadline: string;
  location: string;
  category: string;
  creator: {
    id: number;
    name: string;
  };
  daysLeft: number;
  percentageFunded: number;
};



type Props = {
  projects: Project[];
};

export default function ProjectsList({ projects }: Props) {
  const route = useRouter();
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => route.push(`/projects/${project.id}`)}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="aspect-[4/3] bg-gray-200">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
                
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{project.blurb}</p>
              <div className="mt-2 text-sm text-gray-500">By {project.creator.name}</div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${project.percentageFunded}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-1 text-gray-700">
                  <span>${project.pledged} pledged</span>
                  <span>{project.percentageFunded}% funded</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {project.daysLeft} days left • {project.location} • {project.category}
                </div>
              </div>
              <Link
                href={`/projects/${project.id}`}
                className="inline-block mt-4 text-blue-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
