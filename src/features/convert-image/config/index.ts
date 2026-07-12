import type { TargetFormat } from '../model';

export const formatOptions: Array<{ value: TargetFormat; label: string }> = [
  { value: 'image/webp', label: 'WebP — современный формат, меньший размер' },
  { value: 'image/png', label: 'PNG — формат с поддержкой прозрачности' },
];
