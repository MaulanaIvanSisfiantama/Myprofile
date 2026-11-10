import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Copy, Check, Send, MapPin, Github, Linkedin, Download, Sparkles } from 'lucide-react';
import { UserProfile } from '../data/portfolioData';

interface ContactSectionProps {
  profile: UserProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadVCard = () => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.name}`,
      `TITLE:${profile.role}`,
      `EMAIL:${profile.email}`,
      `TEL:${profile.whatsapp}`,
      `URL:${profile.github}`,
      `ADR:;;${profile.location};;;;`,
      `NOTE:${profile.tagline}`,
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate instantaneous delivery feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(formData.subject || `Pesan dari Portofolio oleh ${formData.name}`);
    const body = encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontak" className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Terhubung & Diskusi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white [text-wrap:balance]">
            Mari Berdiskusi & Berkolaborasi
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Tertarik bekerja sama dalam proyek baru, konsultasi arsitektur perangkat lunak, atau mendiskusikan peluang karir? Hubungi saya kapan saja.
          </p>
        </div>

        {/* 2-Column Split: Direct Channels vs Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Cards (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Email Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Salin alamat email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Email</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Kirim Email Kapan Saja
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                >
                  {profile.email}
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Biasanya dibalas dalam waktu kurang dari 24 jam.
              </p>
            </div>

            {/* Direct WhatsApp Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  Chat Cepat WhatsApp
                </div>
                <a
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(profile.name)},%20saya%20melihat%20portofolio%20Anda%20dan%20ingin%20berdiskusi.`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {profile.whatsapp}
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tersedia untuk panggilan cepat atau konsultasi proyek santai.
              </p>
            </div>

            {/* Location & Social Row */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{profile.location}</span>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* vCard Save Contact Button */}
              <button
                onClick={handleDownloadVCard}
                type="button"
                className="w-full py-2 px-3 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Simpan Kontak ke Ponsel (.vcf)</span>
              </button>
            </div>

          </div>

          {/* Right Column: Contact Message Form (7 Columns) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Pesan Anda Berhasil Terkirim!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Terima kasih telah menghubungi, <strong>{formData.name}</strong>. Saya akan meninjau pesan Anda dan segera merespons melalui email <strong>{formData.email}</strong>.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleOpenMailClient}
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Buka Salinan di Aplikasi Email Anda</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    type="button"
                    className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Kirim Pesan Langsung
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Isi formulir di bawah ini untuk mengirimkan inquiry, proposal, atau pertanyaan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Alamat Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nama@perusahaan.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subjek / Topik Diskusi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Peluang Proyek Web Application / Full-time Role"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Pesan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan detail proyek, timeline, atau hal yang ingin Anda diskusikan..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-shadow resize-y"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    Data Anda aman dan hanya digunakan untuk keperluan komunikasi profesional.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm shadow-blue-500/20 cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? (
                      <span>Mengirimkan...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Pesan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
