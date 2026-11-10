import React from 'react';
import { Cpu, Terminal, Database, ShieldCheck, Layers, Smartphone, Globe, Sparkles, Code2 } from 'lucide-react';
import { SkillCategory } from '../data/portfolioData';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  const iconsList = [Terminal, Database, ShieldCheck, Code2, Layers, Smartphone, Sparkles, Globe, Cpu];

  return (
    <section id="keahlian" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Keahlian & Kemampuan Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Teknologi & Instrumen Pengembangan
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Kombinasi teknologi modern yang saya gunakan untuk mewujudkan produk digital berstandar industri dengan reliabilitas tinggi.
          </p>
        </div>

        {/* Dynamic Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = iconsList[index % iconsList.length];
            return (
              <div
                key={category.title}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Skill List without level and years */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
