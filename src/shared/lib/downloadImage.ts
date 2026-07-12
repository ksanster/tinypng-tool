import { translateLocation } from '@shared/lib';

export const downloadImage = async (src: string, filename: string) => {
  const downloadUrl = translateLocation(src);
  const response = await fetch(downloadUrl);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
