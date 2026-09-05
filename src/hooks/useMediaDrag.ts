import { useCallback, useState, type DragEvent } from 'react';

type SlotProps = {
  onDragOver: (e: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: DragEvent) => void;
};

type MediaDrag = {
  /** Hozir sudralayotgan fayl id'si */
  dragId: string | null;
  /** Ustida turgan katak kaliti — `${variantIndex}:${slotIndex}` */
  dropKey: string | null;
  getSourceProps: (id: string) => {
    draggable: true;
    onDragStart: (e: DragEvent) => void;
    onDragEnd: () => void;
  };
  getSlotProps: (key: string, onDrop: (id: string) => void) => SlotProps;
};

/**
 * Медиатека → variant kataklariga rasm sudrash.
 * Bitta joyda saqlanadi, chunki manba va nishon turli komponentlarda.
 */
export function useMediaDrag(): MediaDrag {
  const [dragId, setDragId] = useState<string | null>(null);
  const [dropKey, setDropKey] = useState<string | null>(null);

  const getSourceProps = useCallback(
    (id: string) => ({
      draggable: true as const,
      onDragStart: (e: DragEvent) => {
        /* Firefox sudrashni boshlashi uchun dataTransfer to'ldirilishi shart */
        e.dataTransfer?.setData('text/plain', id);
        setDragId(id);
      },
      onDragEnd: () => {
        setDragId(null);
        setDropKey(null);
      },
    }),
    [],
  );

  const getSlotProps = useCallback(
    (key: string, onDrop: (id: string) => void): SlotProps => ({
      onDragOver: (e) => {
        e.preventDefault();
        if (dragId) setDropKey((prev) => (prev === key ? prev : key));
      },
      onDragLeave: () => setDropKey((prev) => (prev === key ? null : prev)),
      onDrop: (e) => {
        e.preventDefault();
        if (dragId) onDrop(dragId);
        setDragId(null);
        setDropKey(null);
      },
    }),
    [dragId],
  );

  return { dragId, dropKey, getSourceProps, getSlotProps };
}
