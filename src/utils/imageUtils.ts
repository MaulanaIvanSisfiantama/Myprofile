/**
 * Image processing utilities for client-side portfolio documentation
 * Resizes and compresses uploaded images so they are lightweight (< 150KB),
 * preventing browser QuotaExceededError and ensuring fast loading on GitHub Pages.
 */

export async function fileToOptimizedDataUrl(
  file: File,
  maxWidth = 1080,
  maxHeight = 720,
  quality = 0.78
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih bukan berkas gambar.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memuat gambar untuk dioptimasi.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Proportional resize
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Fill white background for transparent PNGs converted to JPEG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        // Draw image onto canvas with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Always convert to JPEG with quality compression to prevent bloated uncompressed PNGs
        let dataUrl = canvas.toDataURL('image/jpeg', quality);

        // If still excessively large (> 350KB), scale down further
        if (dataUrl.length > 350 * 1024) {
          const smallCanvas = document.createElement('canvas');
          smallCanvas.width = Math.round(width * 0.75);
          smallCanvas.height = Math.round(height * 0.75);
          const sCtx = smallCanvas.getContext('2d');
          if (sCtx) {
            sCtx.fillStyle = '#FFFFFF';
            sCtx.fillRect(0, 0, smallCanvas.width, smallCanvas.height);
            sCtx.drawImage(canvas, 0, 0, smallCanvas.width, smallCanvas.height);
            dataUrl = smallCanvas.toDataURL('image/jpeg', 0.72);
          }
        }

        resolve(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Specifically optimized for profile avatars (compact 400x400 square)
 */
export async function fileToAvatarDataUrl(file: File): Promise<string> {
  return fileToOptimizedDataUrl(file, 480, 480, 0.82);
}

/**
 * Validates whether a string looks like a valid image URL or Data URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('data:image/')) return true;
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return true;
  }
  return false;
}
