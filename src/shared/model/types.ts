export type UploadResult = {
  fileName: string;
  location: string | null;
};

export type ResizeParams = {
  method: string;
  width: number;
  height: number;
}