import type { ImageFormat } from '@shared/model';

const extensions: Record<ImageFormat, string> = {
  'image/webp': 'webp',
  'image/png': 'png',
  'image/avif': 'avif',
};

const getFileNameAndExt = (nameWithExt: string) => {
  const lastDotIndex = nameWithExt.lastIndexOf('.');
  const name =
    lastDotIndex <= 0 ? nameWithExt : nameWithExt.substring(0, lastDotIndex);
  const extension =
    lastDotIndex <= 0 ? '' : nameWithExt.substring(lastDotIndex + 1);

  return { name, extension };
};

export const getResultFilename = (
  filename: string,
  format?: ImageFormat
): string => {
  if (!format) {
    return filename
  }

  const fileProps = getFileNameAndExt(filename);
  const extension = extensions[format] || fileProps.extension;

  return `${fileProps.name}.${extension}`;
};
