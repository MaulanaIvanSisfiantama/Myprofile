import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Save, RotateCcw, Plus, Trash2, Download, UserCheck, FolderPlus, 
  Cpu, Upload, Image as ImageIcon, Star, Edit3, Link as LinkIcon, 
  Loader2, ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { UserProfile, Project, SkillCategory } from '../data/portfolioData';
import { fileToOptimizedDataUrl, fileToAvatarDataUrl, isValidImageUrl } from '../utils/imageUtils';

interface ProfileEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  projects: Project[];
  skillCategories: SkillCategory[];
  onSaveProfile: (profile: UserProfile) => void;
  onSaveProjects: (projects: Project[]) => void;
  onSaveSkills: (skills: SkillCategory[]) => void;
  onResetDefaults: () => void;
}

export const ProfileEditDrawer: React.FC<ProfileEditDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  skillCategories,
  onSaveProfile,
  onSaveProjects,
  onSaveSkills,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects'>('profile');
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);
  const [tempProjects, setTempProjects] = useState<Project[]>(projects);
  const [tempSkills, setTempSkills] = useState<SkillCategory[]>(skillCategories);
  const [skillsInputStrings, setSkillsInputStrings] = useState<Record<number, string>>(() => {
    const initialMap: Record<number, string> = {};
    skillCategories.forEach((cat, idx) => {
      initialMap[idx] = cat.skills.map((s) => s.name).join(', ');
    });
    return initialMap;
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state whenever drawer opens or external props update
  useEffect(() => {
    if (isOpen) {
      setTempProfile(profile);
      setTempProjects(projects);
      setTempSkills(skillCategories);
      const initialMap: Record<number, string> = {};
      skillCategories.forEach((cat, idx) => {
        initialMap[idx] = cat.skills.map((s) => s.name).join(', ');
      });
      setSkillsInputStrings(initialMap);
    }
  }, [isOpen, profile, projects, skillCategories]);

  // Project draft & edit state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    category: 'web',
    customCategoryLabel: '',
    year: '2026',
    summary: '',
    techString: 'React, TypeScript, Tailwind CSS',
    demoUrl: '',
    githubUrl: '',
    images: [] as string[],
  });
  const [urlImageInput, setUrlImageInput] = useState('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Avatar upload handler
  const handleAvatarFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const optimized = await fileToAvatarDataUrl(file);
      setTempProfile((prev) => ({
        ...prev,
        avatarUrl: optimized,
      }));
    } catch (err) {
      console.error(err);
      alert('Gagal memproses gambar foto profil. Pastikan berkas berupa PNG/JPG/WebP.');
    } finally {
      setIsUploadingAvatar(false);
      if (avatarInputRef.current) {
        avatarInputRef.current.value = '';
      }
    }
  };

  // New skill category draft state
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatDraft, setNewCatDraft] = useState({
    title: '',
    description: '',
    skillsText: '',
  });

  if (!isOpen) return null;

  const handleSaveAll = () => {
    try {
      onSaveProfile(tempProfile);
      onSaveProjects(tempProjects);
      onSaveSkills(tempSkills);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const handleAddNewCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatDraft.title.trim()) return;

    const names = newCatDraft.skillsText
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);

    const newCategoryItem: SkillCategory = {
      title: newCatDraft.title.trim(),
      description:
        newCatDraft.description.trim() ||
        'Kumpulan teknologi dan instrumen yang digunakan.',
      skills:
        names.length > 0
          ? names.map((name) => ({ name }))
          : [{ name: 'Teknologi Utama' }],
    };

    const updated = [...tempSkills, newCategoryItem];
    setTempSkills(updated);

    const newIndex = updated.length - 1;
    setSkillsInputStrings((prev) => ({
      ...prev,
      [newIndex]: newCatDraft.skillsText.trim() || 'Teknologi Utama',
    }));

    setNewCatDraft({ title: '', description: '', skillsText: '' });
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = (catIdx: number) => {
    if (tempSkills.length <= 1) {
      alert('Minimal harus ada 1 kategori keahlian pada portofolio Anda.');
      return;
    }
    const categoryTitle = tempSkills[catIdx]?.title || 'kategori ini';
    if (!window.confirm(`Apakah Anda yakin ingin menghapus kategori "${categoryTitle}"?`)) {
      return;
    }
    const updated = tempSkills.filter((_, idx) => idx !== catIdx);
    setTempSkills(updated);

    // Re-index string map
    const newMap: Record<number, string> = {};
    updated.forEach((cat, idx) => {
      newMap[idx] = cat.skills.map((s) => s.name).join(', ');
    });
    setSkillsInputStrings(newMap);
  };

  // Multi-image handlers
  const handleImageFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImages(true);
    try {
      const fileArray = Array.from(files);
      const optimizedUrls = await Promise.all(
        fileArray.map((file) => fileToOptimizedDataUrl(file))
      );
      setNewProject((prev) => ({
        ...prev,
        images: [...prev.images, ...optimizedUrls],
      }));
    } catch (err) {
      console.error(err);
      alert('Terjadi kendala saat memproses gambar. Pastikan berkas berupa PNG/JPG/WebP.');
    } finally {
      setIsUploadingImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrlImage = () => {
    if (!urlImageInput.trim()) return;
    if (!isValidImageUrl(urlImageInput.trim())) {
      alert('Format URL gambar tidak valid.');
      return;
    }
    setNewProject((prev) => ({
      ...prev,
      images: [...prev.images, urlImageInput.trim()],
    }));
    setUrlImageInput('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setNewProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleMakeCoverImage = (index: number) => {
    setNewProject((prev) => {
      const target = prev.images[index];
      const others = prev.images.filter((_, idx) => idx !== index);
      return {
        ...prev,
        images: [target, ...others],
      };
    });
  };

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    setNewProject((prev) => {
      const newImages = [...prev.images];
      const targetIndex = direction === 'left' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newImages.length) return prev;
      const temp = newImages[index];
      newImages[index] = newImages[targetIndex];
      newImages[targetIndex] = temp;
      return {
        ...prev,
        images: newImages,
      };
    });
  };

  const handleStartEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    const standardCategories = ['web', 'mobile', 'api', 'opensource'];
    const isStandardCat = standardCategories.includes(project.category);
    setNewProject({
      title: project.title,
      subtitle: project.subtitle,
      category: isStandardCat ? project.category : 'custom',
      customCategoryLabel: isStandardCat ? '' : project.categoryLabel,
      year: project.year,
      summary: project.summary,
      techString: project.technologies.join(', '),
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      images: project.images && project.images.length > 0 ? [...project.images] : (project.image ? [project.image] : []),
    });
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setNewProject({
      title: '',
      subtitle: '',
      category: 'web',
      customCategoryLabel: '',
      year: '2026',
      summary: '',
      techString: 'React, TypeScript, Tailwind CSS',
      demoUrl: '',
      githubUrl: '',
      images: [],
    });
  };

  const handleAddNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.summary) return;

    const categoryLabels: Record<string, string> = {
      web: 'Web Application',
      mobile: 'Mobile App',
      api: 'Cloud & API',
      opensource: 'Open Source',
    };

    const isCustomCat = newProject.category === 'custom';
    const finalCatSlug = isCustomCat && newProject.customCategoryLabel.trim()
      ? newProject.customCategoryLabel.trim().toLowerCase().replace(/\s+/g, '-')
      : newProject.category;

    const finalCatLabel = isCustomCat && newProject.customCategoryLabel.trim()
      ? newProject.customCategoryLabel.trim()
      : categoryLabels[newProject.category] || newProject.category;

    const finalImages = newProject.images.length > 0
      ? newProject.images
      : ['/src/assets/images/showcase_saas_dashboard_1793694350834.jpg'];

    if (editingProjectId) {
      // Update existing project
      const updated = tempProjects.map((p) => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            title: newProject.title,
            subtitle: newProject.subtitle || p.subtitle,
            category: finalCatSlug,
            categoryLabel: finalCatLabel,
            year: newProject.year || p.year,
            image: finalImages[0],
            images: finalImages,
            summary: newProject.summary,
            fullDescription: newProject.summary,
            technologies: newProject.techString.split(',').map((t) => t.trim()).filter(Boolean),
            demoUrl: newProject.demoUrl || undefined,
            githubUrl: newProject.githubUrl || undefined,
          };
        }
        return p;
      });
      setTempProjects(updated);
      onSaveProjects(updated);
      setEditingProjectId(null);
    } else {
      // Add new project
      const projectToAdd: Project = {
        id: `custom-proj-${Date.now()}`,
        title: newProject.title,
        subtitle: newProject.subtitle || 'Proyek Kustom',
        category: finalCatSlug,
        categoryLabel: finalCatLabel,
        year: newProject.year || '2026',
        image: finalImages[0],
        images: finalImages,
        summary: newProject.summary,
        fullDescription: newProject.summary,
        challenge: 'Optimasi performa dan integrasi komponen arsitektur modern.',
        solution: 'Penerapan clean architecture dan automated testing terstruktur.',
        metrics: [{ label: 'Performance', value: '100%' }],
        technologies: newProject.techString.split(',').map((t) => t.trim()).filter(Boolean),
        demoUrl: newProject.demoUrl || undefined,
        githubUrl: newProject.githubUrl || undefined,
        featured: false,
      };

      const updated = [projectToAdd, ...tempProjects];
      setTempProjects(updated);
      onSaveProjects(updated);
    }

    // Reset draft
    setNewProject({
      title: '',
      subtitle: '',
      category: 'web',
      customCategoryLabel: '',
      year: '2026',
      summary: '',
      techString: 'React, TypeScript, Tailwind CSS',
      demoUrl: '',
      githubUrl: '',
      images: [],
    });
  };

  const handleDeleteProject = (id: string) => {
    if (editingProjectId === id) {
      handleCancelEditProject();
    }
    const updated = tempProjects.filter((p) => p.id !== id);
    setTempProjects(updated);
    onSaveProjects(updated);
  };

  const handleExportData = () => {
    const exportBundle = {
      profile: tempProfile,
      projects: tempProjects,
      skills: tempSkills,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ivan_portfolio_data_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 h-full flex flex-col border-l border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Kustomisasi Portofolio Pribadi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sesuaikan data profil dan tambah karya proyek baru secara live.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 text-xs font-semibold bg-white dark:bg-slate-900 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Profil & Kontak
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'skills'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Keahlian & Teknologi
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 px-3.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Kelola Proyek ({tempProjects.length})
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              {/* Foto Profil Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Foto Profil Utama</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Tampil di Beranda / Hero</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-800 shadow-md shrink-0">
                    <img
                      src={tempProfile.avatarUrl || '/src/assets/images/developer_profile_avatar_1793694350273.jpg'}
                      alt="Pratinjau Foto Profil"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* Hidden file input */}
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileSelected}
                      className="hidden"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled={isUploadingAvatar}
                        onClick={() => avatarInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {isUploadingAvatar ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Memproses...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Unggah Foto Baru</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setTempProfile((prev) => ({
                            ...prev,
                            avatarUrl: '/src/assets/images/developer_profile_avatar_1793694350273.jpg',
                          }))
                        }
                        className="px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Reset Bawaan
                      </button>
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Atau masukkan URL gambar (https://...)"
                        value={tempProfile.avatarUrl}
                        onChange={(e) => setTempProfile({ ...tempProfile, avatarUrl: e.target.value })}
                        className="w-full px-2.5 py-1 text-[11px] rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Bisa unggah file (PNG/JPG) dari perangkat atau tempel tautan foto online (GitHub avatar, Google Drive, dsb).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Judul Profesi / Role
                </label>
                <input
                  type="text"
                  value={tempProfile.role}
                  onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bio / Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={tempProfile.bio}
                  onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    value={tempProfile.whatsapp}
                    onChange={(e) => setTempProfile({ ...tempProfile, whatsapp: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tautan GitHub
                  </label>
                  <input
                    type="text"
                    value={tempProfile.github}
                    onChange={(e) => setTempProfile({ ...tempProfile, github: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Tautan LinkedIn
                  </label>
                  <input
                    type="text"
                    value={tempProfile.linkedin}
                    onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Status Ketersediaan Proyek
                </label>
                <input
                  type="text"
                  value={tempProfile.availability}
                  onChange={(e) => setTempProfile({ ...tempProfile, availability: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          ) : activeTab === 'skills' ? (
            <div className="space-y-6">
              {/* Header Tab with Add Category Button */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Kategori Keahlian & Teknologi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tambah, ubah, atau hapus kategori keahlian sesuai dengan spesialisasi profil Anda.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0 cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingCategory ? 'Tutup Form' : 'Tambah Kategori'}</span>
                </button>
              </div>

              {/* Form Tambah Kategori Baru */}
              {isAddingCategory && (
                <form
                  onSubmit={handleAddNewCategory}
                  className="p-4 rounded-xl border-2 border-blue-500/50 dark:border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20 space-y-3 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Buat Kategori Keahlian Baru</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(false)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Nama Kategori Baru *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Mobile App Development / UI/UX Design / Cloud & Security"
                      value={newCatDraft.title}
                      onChange={(e) => setNewCatDraft({ ...newCatDraft, title: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Deskripsi Kategori (opsional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Merancang dan membangun aplikasi performa tinggi..."
                      value={newCatDraft.description}
                      onChange={(e) => setNewCatDraft({ ...newCatDraft, description: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Daftar Teknologi Awal (pisahkan dengan tanda koma)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Flutter, React Native, Kotlin, Swift"
                      value={newCatDraft.skillsText}
                      onChange={(e) => setNewCatDraft({ ...newCatDraft, skillsText: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(false)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Tambahkan Kategori
                    </button>
                  </div>
                </form>
              )}

              {/* Daftar Kategori Yang Ada */}
              <div className="space-y-4">
                {tempSkills.map((category, catIdx) => (
                  <div
                    key={catIdx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-3"
                  >
                    {/* Header Kartu Kategori dengan tombol Hapus Kategori */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center">
                          {catIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {category.title || `Kategori #${catIdx + 1}`}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(catIdx)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded transition-colors cursor-pointer"
                        title="Hapus kategori ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Kategori</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Judul Kategori
                      </label>
                      <input
                        type="text"
                        value={category.title}
                        onChange={(e) => {
                          const updated = [...tempSkills];
                          updated[catIdx] = { ...updated[catIdx], title: e.target.value };
                          setTempSkills(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Deskripsi Kategori
                      </label>
                      <textarea
                        rows={2}
                        value={category.description}
                        onChange={(e) => {
                          const updated = [...tempSkills];
                          updated[catIdx] = { ...updated[catIdx], description: e.target.value };
                          setTempSkills(updated);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Daftar Teknologi (pisahkan dengan tanda koma)
                      </label>
                      <input
                        type="text"
                        value={skillsInputStrings[catIdx] ?? ''}
                        onChange={(e) => {
                          const rawVal = e.target.value;
                          setSkillsInputStrings((prev) => ({
                            ...prev,
                            [catIdx]: rawVal,
                          }));
                          const names = rawVal
                            .split(',')
                            .map((n) => n.trim())
                            .filter(Boolean);
                          const updated = [...tempSkills];
                          updated[catIdx] = {
                            ...updated[catIdx],
                            skills: names.map((name) => ({ name })),
                          };
                          setTempSkills(updated);
                        }}
                        placeholder="Contoh: React, TypeScript, Tailwind CSS, Next.js"
                        className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:ring-1 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {category.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px]"
                        >
                          <span>{s.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const newSkills = category.skills.filter((_, idx) => idx !== sIdx);
                              const updated = [...tempSkills];
                              updated[catIdx] = { ...updated[catIdx], skills: newSkills };
                              setTempSkills(updated);
                              const newText = newSkills.map((item) => item.name).join(', ');
                              setSkillsInputStrings((prev) => ({
                                ...prev,
                                [catIdx]: newText,
                              }));
                            }}
                            className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                            title={`Hapus ${s.name}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Form Tambah / Edit Proyek */}
              <form onSubmit={handleAddNewProject} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    {editingProjectId ? (
                      <>
                        <Edit3 className="w-4 h-4 text-amber-500" />
                        <span>Edit Proyek: {newProject.title || 'Proyek'}</span>
                      </>
                    ) : (
                      <>
                        <FolderPlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Tambah Proyek Baru</span>
                      </>
                    )}
                  </div>

                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="text-[11px] font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Marketplace B2B Agro"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Kategori
                    </label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-2 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile App</option>
                      <option value="api">Cloud & API</option>
                      <option value="opensource">Open Source</option>
                      <option value="custom">+ Kategori Kustom / Baru</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Tahun
                    </label>
                    <input
                      type="text"
                      placeholder="2026"
                      value={newProject.year}
                      onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {newProject.category === 'custom' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Nama Kategori Baru *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: E-Commerce / Game Dev / Machine Learning"
                      value={newProject.customCategoryLabel}
                      onChange={(e) => setNewProject({ ...newProject, customCategoryLabel: e.target.value })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                )}

                {/* Multi-Photo Documentation Upload Section */}
                <div className="space-y-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Foto Dokumentasi & Tangkapan Layar Proyek</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {newProject.images.length} foto dipilih
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    Pilih lebih dari 1 foto untuk digabungkan secara otomatis dalam tampilan grid/kolase responsif di portofolio.
                  </p>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageFilesSelected}
                    className="hidden"
                  />

                  {/* Upload Action Area */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled={isUploadingImages}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 px-4 border-2 border-dashed border-blue-300 dark:border-blue-800/80 hover:border-blue-500 dark:hover:border-blue-600 rounded-lg bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300 disabled:opacity-50"
                    >
                      {isUploadingImages ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Memproses & mengoptimasi gambar...</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            <Upload className="w-4 h-4" />
                            <span>Unggah Foto Dari Komputer / HP</span>
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Bisa pilih banyak gambar sekaligus (PNG, JPG, WebP)
                          </span>
                        </>
                      )}
                    </button>

                    {/* Or URL input */}
                    <div className="flex items-center gap-1.5">
                      <div className="relative flex-1">
                        <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="url"
                          placeholder="Atau tempel URL gambar (https://...)"
                          value={urlImageInput}
                          onChange={(e) => setUrlImageInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddUrlImage();
                            }
                          }}
                          className="w-full pl-8 pr-2.5 py-1.5 text-[11px] rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddUrlImage}
                        className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer shrink-0"
                      >
                        + Tambah URL
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Filmstrip & Management */}
                  {newProject.images.length > 0 && (
                    <div className="pt-2 space-y-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        Daftar Foto Dokumentasi (Otomatis Digabung Menjadi Grid):
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {newProject.images.map((imgUrl, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 flex flex-col shadow-xs"
                          >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-950/20">
                              <img
                                src={imgUrl}
                                alt={`Dokumentasi ${imgIdx + 1}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              
                              {/* Badge index / cover */}
                              <div className="absolute top-1 left-1">
                                {imgIdx === 0 ? (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-white shadow-xs">
                                    <Star className="w-2.5 h-2.5 fill-current" />
                                    <span>Sampul</span>
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-900/80 text-white">
                                    #{imgIdx + 1}
                                  </span>
                                )}
                              </div>

                              {/* Delete button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(imgIdx)}
                                className="absolute top-1 right-1 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                                title="Hapus foto ini"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Action footer per photo */}
                            <div className="p-1 bg-white dark:bg-slate-900 flex items-center justify-between text-[10px] border-t border-slate-100 dark:border-slate-800">
                              {imgIdx !== 0 ? (
                                <button
                                  type="button"
                                  onClick={() => handleMakeCoverImage(imgIdx)}
                                  className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                >
                                  Jadikan Sampul
                                </button>
                              ) : (
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                                  Foto Utama
                                </span>
                              )}

                              <div className="flex items-center gap-0.5">
                                {imgIdx > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => handleMoveImage(imgIdx, 'left')}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
                                    title="Pindah ke kiri"
                                  >
                                    <ChevronLeft className="w-3 h-3" />
                                  </button>
                                )}
                                {imgIdx < newProject.images.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleMoveImage(imgIdx, 'right')}
                                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500"
                                    title="Pindah ke kanan"
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300">
                        ✨ <strong>Otomatis di-grid</strong>: Foto di posisi #1 adalah sampul, dan saat dibuka oleh pengunjung, semua foto tersusun dalam tata letak galeri grid dengan fitur zoom perbesar.
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Ringkasan Proyek *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Jelaskan secara singkat fungsi dan dampak proyek..."
                    value={newProject.summary}
                    onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Teknologi (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Tailwind, Node.js"
                    value={newProject.techString}
                    onChange={(e) => setNewProject({ ...newProject, techString: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="url"
                    placeholder="URL Demo (opsional)"
                    value={newProject.demoUrl}
                    onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                  <input
                    type="url"
                    placeholder="URL GitHub (opsional)"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={handleCancelEditProject}
                      className="px-3 py-2 text-xs font-medium rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {editingProjectId ? (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Perubahan Proyek</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambahkan ke Portofolio</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Daftar Proyek Saat Ini */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Daftar Proyek Terpasang ({tempProjects.length}):
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Klik Edit untuk ubah foto & detail
                  </span>
                </div>

                <div className="space-y-2">
                  {tempProjects.map((p) => {
                    const photoCount = p.images && p.images.length > 0 ? p.images.length : (p.image ? 1 : 0);
                    const isBeingEdited = editingProjectId === p.id;
                    return (
                      <div
                        key={p.id}
                        className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                          isBeingEdited
                            ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/30'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Small cover thumb */}
                          <div className="w-12 h-10 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-800">
                            <img
                              src={p.image}
                              alt={p.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1.5">
                              <span>{p.categoryLabel} · {p.year}</span>
                              <span aria-hidden="true">·</span>
                              <span className="text-blue-600 dark:text-blue-400 font-medium">
                                {photoCount} Foto
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartEditProject(p)}
                            aria-label={`Edit proyek ${p.title}`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit data & foto proyek ini"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            type="button"
                            aria-label={`Hapus proyek ${p.title}`}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer rounded hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            title="Hapus proyek ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Actions Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              type="button"
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Ekspor Data JSON"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (window.confirm('Reset data profil dan proyek ke bawaan awal?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              type="button"
              className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Reset ke Pengaturan Awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              Batal
            </button>
            <button
              onClick={handleSaveAll}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'Tersimpan!' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
