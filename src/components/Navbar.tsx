import React, { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { UserProfile } from '../data/portfolioData';

interface NavbarProps {
  profile: UserProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGitHubPages?: () => void;
  onOpenResume?: () => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  darkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Proyek', href: '#proyek' },
    { label: 'Keahlian', href: '#keahlian' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono text-sm font-extrabold shadow-sm">
            MI
          </span>
          <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {profile.name}
          </span>
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-blue-600 dark:hover:text-white transition-colors py-1 relative whitespace-nowrap shrink-0 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            type="button"
            aria-label="Ganti mode tampilan"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Buka navigasi mobile"
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
