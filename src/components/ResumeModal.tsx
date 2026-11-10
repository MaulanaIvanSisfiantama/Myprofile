import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { UserProfile, Experience, SkillCategory } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  experiences: Experience[];
  skillCategories: SkillCategory[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  skillCategories,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden during print) */}
        <div className="no-print p-4 sm:px-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              Curriculum Vitae (CV) Preview
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              · Format Standar Industri
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Tutup jendela resume"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content (Printable document) */}
        <div className="p-8 sm:p-12 max-h-[75vh] overflow-y-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 space-y-8 font-sans">
          
          {/* Document Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 id="modal-resume-title" className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {profile.name}
              </h1>
              <span className="text-base font-semibold text-blue-600 dark:text-blue-400">
                {profile.role}
              </span>
            </div>

            {/* Contact metadata strip */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.email}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.whatsapp}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.location}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.github}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              {profile.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Pengalaman Kerja Profesional
            </h2>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 ml-2">
                        {exp.company}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {exp.period} · {exp.location}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {exp.description}
                  </p>

                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-4 list-disc">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                    Keahlian: {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Pendidikan & Kualifikasi
            </h2>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Sarjana Teknik Informatika (S.Kom)
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                    Universitas Terkemuka Indonesia
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  IPK: 3.82 / 4.00 · Predikat Cum Laude
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fokus studi: Rekayasa Perangkat Lunak, Struktur Data & Algoritma Terdistribusi, Pemrograman Web Modern.
              </p>
            </div>
          </div>

          {/* Core Technical Competencies */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
              Kompetensi Teknis Utama
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="space-y-1.5">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-1 text-slate-700 dark:text-slate-300">
                    {cat.skills.map((s, idx) => (
                      <span key={s.name}>
                        {s.name}{idx < cat.skills.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="no-print p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Gunakan fungsi cetak browser untuk menyimpan file sebagai format PDF berkualitas tinggi.
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
