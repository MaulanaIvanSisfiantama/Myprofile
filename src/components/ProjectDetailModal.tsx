import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, BarChart3 } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { ProjectImageGrid } from './ProjectImageGrid';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Media Preview */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Tutup jendela detail proyek"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on media scrim */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Rilis {project.year}</span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Subtitle & Full Description */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {project.subtitle}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Multi-Photo Documentation Gallery & Lightbox */}
          <div className="pt-1 pb-1">
            <ProjectImageGrid
              images={project.images && project.images.length > 0 ? project.images : [project.image]}
              fallbackImage={project.image}
              title={project.title}
              variant="detail"
            />
          </div>

          {/* Quantitative Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Hasil & Dampak Terukur</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-1.5">
              <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Tantangan Utama</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                {project.challenge}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solusi Arsitektur</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack (Unboxed Clean Badges) */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Teknologi & Tooling</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Buka Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Lihat Kode Sumber</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              type="button"
              className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Tutup Jendela
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
