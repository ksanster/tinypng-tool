import type { ResizeParams } from '@shared/model';
import { AUTH_HEADER } from '@shared/api/constants.ts';


export const fetchResizeImage = async (location: string, resize: ResizeParams): Promise<string> => {
  const response = await fetch(location, {
    method: 'POST',
    body: JSON.stringify({ resize }) ,
    headers: {
      Authorization: `Basic ${AUTH_HEADER}`,
    },
  });

  const imageBlob: Blob = await response.blob();
  return URL.createObjectURL(imageBlob);
};
