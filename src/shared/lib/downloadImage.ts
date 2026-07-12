import { API_URL } from '@shared/api';

export const downloadImage = async (src: string, filename: string) => {
  const downloadUrl = `${API_URL}${(new URL(src)).pathname}`
  console.log(downloadUrl)
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
