'use client';
import Hero from './components/Landing Page/hero';
import Navbar from './components/Landing Page/Navbar';
import Projects from './components/Landing Page/featured_projects';
import HowItWorks from './components/Landing Page/Howitworks';
import SuccessStories from './components/Landing Page/SuccessStories';
import FAQ from './components/Landing Page/FAQ';
import Footer from './components/Landing Page/Footer';
import Chatbot from './chatbot/page';
import { useRef } from 'react';

export default function Home(){
    const projectsRef = useRef<HTMLDivElement>(null);

  const handleScrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
   <main className='main'>
    <Navbar />
    <div className="main2">
    <Hero />
    <Projects />
    <Chatbot />
    <HowItWorks />
    <SuccessStories />
    <FAQ />
    
    </div>
   </main>
  );
}