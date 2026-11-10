import React, { useState, useEffect } from 'react';
import {
  initialProfile,
  initialProjects,
  initialSkillCategories,
  UserProfile,
  Project,
  SkillCategory,
} from './data/portfolioData';
import {
  saveToIndexedDB,
  loadFromIndexedDB,
  safeSetLocalStorage,
} from './utils/storageUtils';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';

export default function App() {
  // Dark mode state with system preference fallback and documentElement sync
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mi_portfolio_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // User Profile state with localStorage + IndexedDB persistence
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mi_portfolio_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl) {
          parsed.avatarUrl = initialProfile.avatarUrl;
        }
        if (parsed.location?.includes('Jakarta')) {
          parsed.location = 'Semarang, Jawa Tengah (Tersedia Remote)';
        }
        if (parsed.role && (parsed.role.includes('Software Engineer') || parsed.role.includes('Full-Stack'))) {
          parsed.role = 'IT Engineering & Infrastructure';
        }
        if (!parsed.github || parsed.github.toLowerCase().includes('github.com/maulanaivan')) {
          parsed.github = 'https://github.com/MaulanaIvanSisfiantama';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return initialProfile;
  });

  // Projects state with localStorage + IndexedDB persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('mi_portfolio_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((p: Project) => {
            const githubUrl = p.githubUrl?.toLowerCase().includes('github.com/maulanaivan')
              ? p.githubUrl.replace(/github\.com\/maulanaivan/i, 'github.com/MaulanaIvanSisfiantama')
              : p.githubUrl;
            if (!p.images || p.images.length === 0) {
              const matchingInit = initialProjects.find((ip) => ip.id === p.id);
              return {
                ...p,
                githubUrl: githubUrl || matchingInit?.githubUrl,
                images: matchingInit?.images || (p.image ? [p.image] : []),
              };
            }
            return { ...p, githubUrl };
          });
        }
      }
    } catch {
      // fallback
    }
    return initialProjects;
  });

  // Skills state with localStorage + IndexedDB persistence
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem('mi_portfolio_skills');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialSkillCategories;
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    safeSetLocalStorage('mi_portfolio_dark_mode', String(darkMode));
  }, [darkMode]);

  // Load complete data from IndexedDB on startup (supports large images without 5MB quota restrictions)
  useEffect(() => {
    async function loadPersistedData() {
      try {
        const [savedProfile, savedProjects, savedSkills] = await Promise.all([
          loadFromIndexedDB<UserProfile>('mi_portfolio_user_profile'),
          loadFromIndexedDB<Project[]>('mi_portfolio_projects'),
          loadFromIndexedDB<SkillCategory[]>('mi_portfolio_skills'),
        ]);

        if (savedProfile) {
          const updatedLocation = savedProfile.location?.includes('Jakarta')
            ? 'Semarang, Jawa Tengah (Tersedia Remote)'
            : (savedProfile.location || 'Semarang, Jawa Tengah (Tersedia Remote)');
          const updatedRole = (savedProfile.role && (savedProfile.role.includes('Software Engineer') || savedProfile.role.includes('Full-Stack')))
            ? 'IT Engineering & Infrastructure'
            : (savedProfile.role || 'IT Engineering & Infrastructure');
          const updatedGithub = (!savedProfile.github || savedProfile.github.toLowerCase().includes('github.com/maulanaivan'))
            ? 'https://github.com/MaulanaIvanSisfiantama'
            : savedProfile.github;

          setProfile((prev) => ({
            ...prev,
            ...savedProfile,
            location: updatedLocation,
            role: updatedRole,
            github: updatedGithub,
            avatarUrl: savedProfile.avatarUrl || prev.avatarUrl || initialProfile.avatarUrl,
          }));
        }

        if (savedProjects && Array.isArray(savedProjects) && savedProjects.length > 0) {
          const normalizedProjects = savedProjects.map((p) => ({
            ...p,
            githubUrl: p.githubUrl?.toLowerCase().includes('github.com/maulanaivan')
              ? p.githubUrl.replace(/github\.com\/maulanaivan/i, 'github.com/MaulanaIvanSisfiantama')
              : p.githubUrl,
          }));
          setProjects(normalizedProjects);
        }

        if (savedSkills && Array.isArray(savedSkills) && savedSkills.length > 0) {
          setSkillCategories(savedSkills);
        }
      } catch (err) {
        console.warn('Could not load data from IndexedDB:', err);
      }
    }

    loadPersistedData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero profile={profile} />

        {/* Featured Projects Section */}
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Technical Skills & Architecture */}
        <SkillsSection skillCategories={skillCategories} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
