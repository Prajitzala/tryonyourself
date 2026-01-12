/**
 * Image compression utility to reduce memory usage and improve performance
 */

export async function compressImage(
  file: File, 
  maxWidth: number = 1024, 
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use PNG format for API compatibility (Gemini API expects PNG)
        // Quality parameter doesn't affect PNG, but we keep it for consistency
        const compressed = canvas.toDataURL('image/png');
        resolve(compressed);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert data URL to PNG format if needed (async version)
 */
export async function ensurePngFormat(dataUrl: string): Promise<string> {
  if (dataUrl.startsWith('data:image/png')) {
    return dataUrl;
  }
  // Convert other formats to PNG by drawing on canvas
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
