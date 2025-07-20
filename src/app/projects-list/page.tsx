'use client';
import { useState, useEffect } from 'react';
import ProjectsList from '../components/Explore Page/projects';
import CategoriesNavbar from '../components/Explore Page/categories';
import crowdfunding_projects from '../components/Data/crowdfunding_projects.json';

type Project = {
  id: number;
  name: string;
  blurb: string;
  goal: number;
  pledged: number;
  currency: string;
  deadline: string;
  location: string;
  creator: {
    id: number;
    name: string;
  };
  description: string;
  category: string;
  percentageFunded: number;
  daysLeft: number;
  image: string; // Add this line to match the expected Project type
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    const data = crowdfunding_projects as Project[];
    setProjects(data);
    setFilteredProjects(data);
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === category));
    }
  };

  return (
    <div className="main">
      <div className="main2">
        <h1 className="text-3xl font-bold text-center mt-10">Projects List</h1>
        <p className="text-center mt-2">Explore a variety of projects and find the one that resonates with you.</p>
        <CategoriesNavbar
          handleCategoryClick={handleCategoryClick}
          activeCategory={activeCategory}
        />
        <ProjectsList projects={filteredProjects} />
      </div>
    </div>
  );
}
