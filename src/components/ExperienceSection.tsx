import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Experience } from '../data/portfolioData';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section id="pengalaman" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Rekam Jejak Karir</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Pengalaman Kerja Profesional
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Perjalanan karir dalam rekayasa perangkat lunak, memimpin inisiatif teknis, dan menghantarkan solusi bernilai tinggi untuk produk digital.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Indicator Dot (Single level solid dot) */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-blue-400 group-hover:scale-125 transition-transform" />

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-4">
                
                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements List */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Pencapaian & Kontribusi Kunci:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Tagstrip */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Teknologi:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
