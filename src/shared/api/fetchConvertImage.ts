import { AUTH_HEADER } from '@shared/api/constants.ts';
import { translateLocation } from '@shared/lib';
import type { ConvertParams } from '@shared/model';

export const fetchConvertImage = async (
  location: string,
  type: ConvertParams
): Promise<string> => {
  const response = await fetch(translateLocation(location), {
    method: 'POST',
    body: JSON.stringify({ convert: { type } }),
    headers: {
      Authorization: `Basic ${AUTH_HEADER}`,
      'Content-Type': 'application/json',
    },
  });

  const imageBlob: Blob = await response.blob();
  return URL.createObjectURL(imageBlob);
};
