import { useState } from 'react';

import { CusButton, CusImageSlot, CusInput, CusModal } from '@/components/ui';

type Props = {
  onClose: () => void;
  /** Berilsa — tahrirlash rejimi */
  initialName?: string;
  onSubmit: (name: string) => void;
};

/** «Новая категория» / «Редактировать категорию» */
export default function CategoryFormModal({ onClose, initialName, onSubmit }: Props) {
  const editing = initialName !== undefined;
  const [name, setName] = useState(initialName ?? '');
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Название обязательно');
      return;
    }
    onSubmit(trimmed);
    onClose();
  };

  return (
    <CusModal
      open
      onClose={onClose}
      title={editing ? 'Редактировать категорию' : 'Новая категория'}
      footer={
        <>
          <CusButton variant="secondary" onClick={onClose}>
            Отмена
          </CusButton>
          <CusButton onClick={submit}>Сохранить</CusButton>
        </>
      }
    >
      <CusInput
        label="Название"
        value={name}
        autoFocus
        error={error}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />

      <div>
        <div className="mb-1.5 text-micro tracking-wide text-muted">Обложка</div>
        <div className="w-32">
          <CusImageSlot aspect="square" label="Фото 1:1" />
        </div>
        <p className="mt-1.5 text-micro text-subtle">
          Квадратное фото 1:1 — 1000×1000 px. Обрезается по центру, держите главный объект в
          середине кадра.
        </p>
      </div>
    </CusModal>
  );
}
