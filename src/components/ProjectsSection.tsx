import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Github, ArrowRight, FolderKanban } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectImageGrid } from './ProjectImageGrid';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenAddProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const defaultLabels: Record<string, string> = {
      web: 'Web Apps',
      mobile: 'Mobile',
      api: 'Cloud & API',
      opensource: 'Open Source',
    };

    const uniqueCategories = new Map<string, string>();
    uniqueCategories.set('all', 'Semua Proyek');

    projects.forEach((p) => {
      if (p.category && !uniqueCategories.has(p.category)) {
        uniqueCategories.set(
          p.category,
          p.categoryLabel || defaultLabels[p.category] || p.category
        );
      }
    });

    return Array.from(uniqueCategories.entries()).map(([id, label]) => ({ id, label }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="proyek" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Portofolio & Karya Unggulan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
              Proyek yang Telah Saya Bangun
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Koleksi aplikasi web, mobile, dan sistem backend dengan fokus pada arsitektur bersih, performa optimal, serta kemudahan penggunaan.
            </p>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Category Tabs (Interactive Segmented Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari proyek / teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow"
            />
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-3">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Tidak ada proyek yang sesuai dengan kata kunci "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              type="button"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset filter pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Media Container with adaptive image grid */}
                <div 
                  className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <ProjectImageGrid
                    images={project.images && project.images.length > 0 ? project.images : [project.image]}
                    fallbackImage={project.image}
                    title={project.title}
                    variant="card"
                    onSelectProject={() => onSelectProject(project)}
                  />
                  
                  {/* Subtle hover detail indicator */}
                  <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 shadow-md pointer-events-none">
                    <span>Lihat Detail & Foto</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Unboxed Metadata (NO PILLS) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectProject(project)}
                      className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tech list as clean unboxed inline elements */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-slate-400 dark:text-slate-500 self-center">
                          +{project.technologies.length - 4} lainnya
                        </span>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onSelectProject(project)}
                        type="button"
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Detail & Arsitektur</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Buka Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Lihat Kode di GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
