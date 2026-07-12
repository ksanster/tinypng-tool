import type { ResizeParams } from '@shared/model';
import { AUTH_HEADER } from '@shared/api/constants.ts';
import { translateLocation } from '@shared/lib';


export const fetchResizeImage = async (location: string, resize: ResizeParams): Promise<string> => {
  const response = await fetch(translateLocation(location), {
    method: 'POST',
    body: JSON.stringify({ resize }) ,
    headers: {
      'Authorization': `Basic ${AUTH_HEADER}`,
      'Content-Type': 'application/json'
    },
  });

  const imageBlob: Blob = await response.blob();
  return URL.createObjectURL(imageBlob);
};
