import type { ResizeMethod } from '../model';

export const resizeMethods: Array<{ value: ResizeMethod; label: string }> = [
  { value: 'scale', label: 'Scale — пропорциональное масштабирование' },
  { value: 'fit', label: 'Fit — точный размер, сохраняет пропорции' },
  { value: 'cover', label: 'Cover — заполнение заданного размера' },
  { value: 'thumb', label: 'Thumb — создание миниатюры' },
];
