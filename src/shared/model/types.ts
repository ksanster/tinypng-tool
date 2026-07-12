export type UploadResult = {
  fileName: string;
  location: string | null;
};

export type ResizeParams = {
  method: string;
  width: number;
  height: number;
};

export type ImageFormat =
  | 'image/webp'
  | 'image/png'
  | 'image/avif';

export type ConvertParams = {
  type: ImageFormat;
};
