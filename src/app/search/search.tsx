'use client'

export const dynamic = "force-dynamic";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    type Project = {
      id: string;
      name: string;
      description: string;
      category: string;
    };

    const [searchResults, setSearchResults] = useState<Project[]>([]);

    useEffect(() => {
    const fetchProjects = async () => {
      if (!query) return;

      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setSearchResults(data.projects);
    };

    fetchProjects();
  }, [query]);

    return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Search results for: {query}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchResults.map(project => (
          <div key={project.id} className="bg-white shadow p-4 rounded">
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-sm text-gray-600">{project.description}</p>
            <span className="text-xs text-blue-500">{project.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

  
