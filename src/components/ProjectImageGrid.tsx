import React, { useState, useEffect } from 'react';
import { Images, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ProjectImageGridProps {
  images?: string[];
  fallbackImage: string;
  title: string;
  variant?: 'card' | 'detail';
  onSelectProject?: () => void;
}

export const ProjectImageGrid: React.FC<ProjectImageGridProps> = ({
  images,
  fallbackImage,
  title,
  variant = 'card',
  onSelectProject,
}) => {
  // Normalize images array
  const allImages = React.useMemo(() => {
    if (images && images.length > 0) {
      return images.filter(Boolean);
    }
    return [fallbackImage].filter(Boolean);
  }, [images, fallbackImage]);

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, allImages.length]);

  // Card Variant: Sleek adaptive collage
  if (variant === 'card') {
    const count = allImages.length;

    // Single image
    if (count <= 1) {
      return (
        <div 
          className="relative w-full h-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
          onClick={onSelectProject}
        >
          <img
            src={allImages[0]}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />
        </div>
      );
    }

    // 2 images: 2 vertical columns split
    if (count === 2) {
      return (
        <div 
          className="relative w-full h-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer grid grid-cols-2 gap-0.5"
          onClick={onSelectProject}
        >
          <div className="relative h-full overflow-hidden">
            <img
              src={allImages[0]}
              alt={`${title} - Foto 1`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-full overflow-hidden">
            <img
              src={allImages[1]}
              alt={`${title} - Foto 2`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Images className="w-3 h-3" />
            <span>2 Foto</span>
          </div>
          <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors pointer-events-none" />
        </div>
      );
    }

    // 3 images: 1 large left (60%) + 2 stacked right (40%)
    if (count === 3) {
      return (
        <div 
          className="relative w-full h-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer grid grid-cols-3 gap-0.5"
          onClick={onSelectProject}
        >
          <div className="relative col-span-2 h-full overflow-hidden">
            <img
              src={allImages[0]}
              alt={`${title} - Foto Utama`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col gap-0.5 h-full">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={allImages[1]}
                alt={`${title} - Foto 2`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative flex-1 overflow-hidden">
              <img
                src={allImages[2]}
                alt={`${title} - Foto 3`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Images className="w-3 h-3" />
            <span>3 Foto</span>
          </div>
          <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors pointer-events-none" />
        </div>
      );
    }

    // 4+ images: 1 large left (col-span-2) + 2 right, bottom right shows +N overlay
    const remaining = count - 3;
    return (
      <div 
        className="relative w-full h-full bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer grid grid-cols-3 gap-0.5"
        onClick={onSelectProject}
      >
        <div className="relative col-span-2 h-full overflow-hidden">
          <img
            src={allImages[0]}
            alt={`${title} - Foto Utama`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col gap-0.5 h-full">
          <div className="relative flex-1 overflow-hidden">
            <img
              src={allImages[1]}
              alt={`${title} - Foto 2`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative flex-1 overflow-hidden">
            <img
              src={allImages[2]}
              alt={`${title} - Foto 3`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {remaining > 0 && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px] flex items-center justify-center text-white text-xs font-bold">
                +{remaining}
              </div>
            )}
          </div>
        </div>
        <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
          <Images className="w-3 h-3" />
          <span>{count} Foto Dokumentasi</span>
        </div>
        <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/5 transition-colors pointer-events-none" />
      </div>
    );
  }

  // Detail Modal Variant: Full auto-grid showcase with interactive Lightbox
  const totalCount = allImages.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Images className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Dokumentasi & Tangkapan Layar Proyek ({totalCount} Foto)</span>
        </div>
        <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>Klik foto untuk perbesar</span>
        </span>
      </div>

      {/* Grid Layout depending on count */}
      {totalCount === 1 ? (
        <div
          onClick={() => setActiveLightboxIndex(0)}
          className="group relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
        >
          <img
            src={allImages[0]}
            alt={`${title} - Dokumentasi 1`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Perbesar Foto</span>
            </span>
          </div>
        </div>
      ) : totalCount === 2 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={img}
                alt={`${title} - Dokumentasi ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                  <Maximize2 className="w-3 h-3" />
                  <span>Foto {idx + 1}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : totalCount === 3 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setActiveLightboxIndex(0)}
            className="group relative sm:col-span-2 aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={allImages[0]}
              alt={`${title} - Dokumentasi Utama`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                <Maximize2 className="w-3 h-3" />
                <span>Foto Utama</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {allImages.slice(1, 3).map((img, idx) => (
              <div
                key={idx + 1}
                onClick={() => setActiveLightboxIndex(idx + 1)}
                className="group relative flex-1 aspect-video sm:aspect-auto rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={img}
                  alt={`${title} - Dokumentasi ${idx + 2}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm">
                    <Maximize2 className="w-3 h-3" />
                    <span>Foto {idx + 2}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 4 or more images: Featured Hero + 3-col gallery grid */
        <div className="space-y-3">
          <div
            onClick={() => setActiveLightboxIndex(0)}
            className="group relative aspect-[21/9] sm:aspect-[24/10] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={allImages[0]}
              alt={`${title} - Dokumentasi Utama`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
              <span>Foto Sampul Utama</span>
            </div>
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Perbesar Foto</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {allImages.slice(1).map((img, idx) => (
              <div
                key={idx + 1}
                onClick={() => setActiveLightboxIndex(idx + 1)}
                className="group relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-blue-500 transition-all shadow-xs"
              >
                <img
                  src={img}
                  alt={`${title} - Dokumentasi ${idx + 2}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-slate-900/70 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-xs">
                  Foto {idx + 2}
                </div>
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Top Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between text-white py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm truncate max-w-xs sm:max-w-md">
                {title}
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                Foto {activeLightboxIndex + 1} dari {allImages.length}
              </span>
            </div>

            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Stage with Prev/Next Controls */}
          <div 
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-2 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {allImages.length > 1 && (
              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev - 1 + allImages.length) % allImages.length : null
                  )
                }
                className="absolute left-2 sm:left-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-lg"
                title="Foto Sebelumnya (Panah Kiri)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Active Image */}
            <div className="max-w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl">
              <img
                src={allImages[activeLightboxIndex]}
                alt={`${title} - Foto ${activeLightboxIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Next Button */}
            {allImages.length > 1 && (
              <button
                onClick={() =>
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % allImages.length : null
                  )
                }
                className="absolute right-2 sm:right-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-lg"
                title="Foto Berikutnya (Panah Kanan)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Filmstrip */}
          {allImages.length > 1 && (
            <div 
              className="w-full max-w-5xl flex items-center justify-center gap-2 overflow-x-auto py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeLightboxIndex === idx
                      ? 'border-blue-500 scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
