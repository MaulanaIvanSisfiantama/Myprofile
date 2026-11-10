import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Rocket } from 'lucide-react';
import { UserProfile } from '../data/portfolioData';

interface FooterProps {
  profile: UserProfile;
  onOpenGitHubPages?: () => void;
  onOpenResume?: () => void;
  onOpenCustomizer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-mono text-xs font-bold">
                MI
              </span>
              <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {profile.role} · Didesain dengan standar rekayasa web modern.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <a href="#tentang" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Tentang
            </a>
            <a href="#proyek" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Proyek
            </a>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <a href="#keahlian" className="hover:text-blue-600 dark:hover:text-white transition-colors">
              Keahlian
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
            title="Kembali ke atas"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Portofolio & Rekayasa Sistem IT</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
