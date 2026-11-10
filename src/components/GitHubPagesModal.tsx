import React, { useState } from 'react';
import { X, Rocket, Copy, Check, Terminal, ExternalLink, Download, FileCode, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { githubPagesWorkflowTemplate } from '../data/portfolioData';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [copiedGitCommands, setCopiedGitCommands] = useState(false);
  const [activeTab, setActiveTab] = useState<'actions' | 'overview' | 'commands'>('actions');

  if (!isOpen) return null;

  const gitCommandsText = `# 1. Inisialisasi Git di folder proyek
git init
git add .
git commit -m "feat: portofolio pribadi Maulana Ivan siap GitHub Pages"

# 2. Hubungkan ke repository GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# 3. Push kode
git push -u origin main`;

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(githubPagesWorkflowTemplate);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2500);
  };

  const handleCopyGitCommands = () => {
    navigator.clipboard.writeText(gitCommandsText);
    setCopiedGitCommands(true);
    setTimeout(() => setCopiedGitCommands(false), 2500);
  };

  const handleDownloadWorkflowFile = () => {
    const blob = new Blob([githubPagesWorkflowTemplate], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deploy.yml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-gh-pages-title"
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-gh-pages-title" className="text-xl font-bold text-slate-900 dark:text-white">
                Panduan Deploy ke GitHub Pages (Gratis & Tanpa Hosting)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cara mempublikasikan website profil ini secara online tanpa biaya sewa hosting / server.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela panduan"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Benefits Strip */}
        <div className="px-6 py-3 bg-emerald-50/60 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/40 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>100% Gratis Selamanya</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>CDN Global Cepat & HTTPS</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Otomatis Deploy saat Git Push</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('actions')}
            type="button"
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'actions'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Workflow GitHub Actions (Rekomendasi)</span>
          </button>

          <button
            onClick={() => setActiveTab('commands')}
            type="button"
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'commands'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Perintah Git Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            type="button"
            className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Langkah Konfigurasi di GitHub</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    File Workflow: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">.github/workflows/deploy.yml</code>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    File ini akan otomatis mem-build proyek dan merilisnya ke GitHub Pages setiap kali Anda melakukan push.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadWorkflowFile}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh File .yml</span>
                  </button>

                  <button
                    onClick={handleCopyWorkflow}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    {copiedWorkflow ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin YAML</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 text-xs font-mono p-4">
                <pre className="overflow-x-auto leading-relaxed">
                  {githubPagesWorkflowTemplate}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Proyek Ini Sudah Dioptimasi Khusus untuk GitHub Pages!</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Pengaturan <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded font-mono text-blue-900 dark:text-blue-200">base: './'</code> telah dikonfigurasi di file <code className="font-mono">vite.config.ts</code>. Artinya, semua aset CSS, JavaScript, dan gambar akan otomatis terbaca dengan benar baik di domain root (<code className="font-mono">username.github.io</code>) maupun sub-path repository (<code className="font-mono">username.github.io/portfolio/</code>).
                </p>
              </div>
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Perintah Terminal untuk Menghubungkan Proyek ke GitHub
                </h3>
                <button
                  onClick={handleCopyGitCommands}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {copiedGitCommands ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Semua Perintah</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-200 text-xs font-mono p-4">
                <pre className="overflow-x-auto leading-relaxed">{gitCommandsText}</pre>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <p>
                  Ganti <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-900 dark:text-slate-100">USERNAME</code> dan <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-900 dark:text-slate-100">NAMA-REPO</code> dengan nama akun GitHub dan repositori yang telah Anda buat di <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 underline">github.com/new</a>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                3 Langkah Mengaktifkan GitHub Pages di Repository Anda:
              </h3>

              <ol className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      Buat Repositori di GitHub
                    </span>
                    <p className="text-slate-500 dark:text-slate-400">
                      Buka GitHub dan buat repositori baru (misalnya dengan nama <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">portfolio</code>). Repositori dapat disetel Publik.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      Ubah Source Pages ke "GitHub Actions"
                    </span>
                    <p className="text-slate-500 dark:text-slate-400">
                      Masuk ke tab <strong>Settings</strong> di repository Anda &gt; pilih menu <strong>Pages</strong> di sidebar kiri. Pada bagian <strong>Build and deployment &gt; Source</strong>, ganti pilihan menjadi <strong>"GitHub Actions"</strong>.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      Push Kode dan Website Langsung Live!
                    </span>
                    <p className="text-slate-500 dark:text-slate-400">
                      Simpan file <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">.github/workflows/deploy.yml</code>, lalu jalankan <code className="font-mono">git push origin main</code>. GitHub Actions akan otomatis membuild dalam 30–50 detik dan memberikan URL live Anda!
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <a
            href="https://docs.github.com/en/pages"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <span>Dokumentasi Resmi GitHub Pages</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white transition-colors cursor-pointer"
          >
            Selesai Membaca
          </button>
        </div>
      </div>
    </div>
  );
};
