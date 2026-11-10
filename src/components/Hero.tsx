import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../data/portfolioData';

interface HeroProps {
  profile: UserProfile;
  onOpenGitHubPages?: () => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="tentang" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Status / Availability (Unboxed clean text) */}
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
              <span className="font-medium text-slate-800 dark:text-slate-200">{profile.availability}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>{profile.location}</span>
            </div>

            {/* Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance] leading-[1.1]">
                Halo, saya <span className="text-blue-600 dark:text-blue-400">{profile.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                {profile.role}
              </p>
            </div>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#proyek"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm shadow-blue-500/20 cursor-pointer whitespace-nowrap"
              >
                <span>Lihat Karya & Proyek</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Social & Contact Icons */}
            <div className="flex items-center gap-5 pt-3 text-slate-500 dark:text-slate-400 text-sm">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Resolution Visual Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Image Frame with Single-Level Soft Shadow & Hairline Border */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none group">
                <img
                  src={profile.avatarUrl || '/src/assets/images/developer_profile_avatar_1793694350273.jpg'}
                  alt={`Potret Profesional ${profile.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Visual Scrim for Name Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                
                {/* Bottom Card Identity Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-mono">
                    IT Engineering & Infrastructure
                  </div>
                  <div className="text-lg font-bold tracking-tight">
                    {profile.name}
                  </div>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Production Codebase</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
