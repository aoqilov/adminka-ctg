import { useCallback, useState, type DragEvent } from 'react';

type ItemProps = {
  draggable: true;
  onDragStart: (e: DragEvent) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onDragEnd: () => void;
};

type DragSort = {
  dragIndex: number | null;
  overIndex: number | null;
  isDragging: (index: number) => boolean;
  isOver: (index: number) => boolean;
  getItemProps: (index: number) => ItemProps;
};

/**
 * Ro'yxatni sudrab qayta tartiblash. Kategoriya, subkategoriya va
 * услуги — uchalasi ham shu hook orqali ishlaydi.
 *
 * `onReorder(from, to)` faqat indekslar haqiqatan farq qilganda chaqiriladi.
 */
export function useDragSort(onReorder: (from: number, to: number) => void): DragSort {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const reset = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
  }, []);

  const getItemProps = useCallback(
    (index: number): ItemProps => ({
      draggable: true,
      onDragStart: (e) => {
        /* Firefox sudrashni boshlashi uchun dataTransfer to'ldirilishi shart */
        e.dataTransfer?.setData('text/plain', String(index));
        setDragIndex(index);
      },
      onDragOver: (e) => {
        e.preventDefault();
        setOverIndex((prev) => (prev === index ? prev : index));
      },
      onDrop: (e) => {
        e.preventDefault();
        if (dragIndex !== null && dragIndex !== index) onReorder(dragIndex, index);
        reset();
      },
      onDragEnd: reset,
    }),
    [dragIndex, onReorder, reset],
  );

  return {
    dragIndex,
    overIndex,
    isDragging: (index) => dragIndex === index,
    isOver: (index) => overIndex === index && dragIndex !== index,
    getItemProps,
  };
}

/** Massivda elementni `from` dan `to` ga surish (yangi massiv qaytaradi) */
export function moveItem<T>(list: readonly T[], from: number, to: number): T[] {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
