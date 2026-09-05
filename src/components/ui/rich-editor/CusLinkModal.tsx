import { useState } from 'react';
import CusButton from '@/components/ui/button/CusButton';
import CusInput from '@/components/ui/input/CusInput';
import CusModal from '@/components/ui/modal/CusModal';

type Props = {
  onClose: () => void;
  onSubmit: (url: string) => void;
};

/** `window.prompt('URL:')` o'rniga — rich-editor'ning havola oynasi */
export default function CusLinkModal({ onClose, onSubmit }: Props) {
  const [url, setUrl] = useState('https://');

  const submit = () => {
    const trimmed = url.trim();
    if (!trimmed || trimmed === 'https://') return;
    onSubmit(trimmed);
    onClose();
  };

  return (
    <CusModal
      open
      onClose={onClose}
      title="Ссылка"
      width="sm"
      footer={
        <>
          <CusButton variant="secondary" onClick={onClose}>
            Отмена
          </CusButton>
          <CusButton onClick={submit}>Вставить</CusButton>
        </>
      }
    >
      <CusInput
        label="URL"
        value={url}
        autoFocus
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit();
        }}
      />
    </CusModal>
  );
}
