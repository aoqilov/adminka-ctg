import { useState } from 'react';

import { CusButton, CusImageSlot, CusInput, CusModal } from '@/components/ui';

type Props = {
  onClose: () => void;
  /** Qaysi kategoriya ichida — sarlavhada ko'rsatiladi */
  categoryName: string;
  /** Berilsa — tahrirlash rejimi */
  initialName?: string;
  onSubmit: (name: string) => void;
};

/** «Новая подкатегория» / «Редактировать подкатегорию» */
export default function SubcategoryFormModal({
  onClose,
  categoryName,
  initialName,
  onSubmit,
}: Props) {
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
      title={editing ? 'Редактировать подкатегорию' : 'Новая подкатегория'}
      footer={
        <>
          <CusButton variant="secondary" onClick={onClose}>
            Отмена
          </CusButton>
          <CusButton onClick={submit}>Сохранить</CusButton>
        </>
      }
    >
      <p className="text-micro text-subtle">Категория: {categoryName}</p>

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
      </div>
    </CusModal>
  );
}
