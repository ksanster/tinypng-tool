import type { ImageFormat } from '@shared/model';

export const formatOptions: Array<{ value: ImageFormat; label: string }> = [
  { value: 'image/webp', label: 'WebP — современный формат, меньший размер' },
  {
    value: 'image/avif',
    label: 'Avif — современный формат видео с поддержкой прозрачности и HDR',
  },
  { value: 'image/png', label: 'PNG — формат с поддержкой прозрачности' },
];
