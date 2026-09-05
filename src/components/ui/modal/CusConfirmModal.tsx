import CusButton from '@/components/ui/button/CusButton';
import CusModal from '@/components/ui/modal/CusModal';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  /** Nima o'chirilayotgani — "Свадебные платья" kabi */
  target?: string;
  description?: string;
  confirmLabel?: string;
};

/** O'chirishni tasdiqlash — barcha `remove` amallari shu orqali o'tadi */
export default function CusConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Удалить?',
  target,
  description = 'Это действие нельзя отменить.',
  confirmLabel = 'Удалить',
}: Props) {
  return (
    <CusModal
      open={open}
      onClose={onClose}
      title={title}
      width="sm"
      footer={
        <>
          <CusButton variant="secondary" onClick={onClose}>
            Отмена
          </CusButton>
          <CusButton
            className="border-danger bg-danger text-danger-fg hover:opacity-90"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </CusButton>
        </>
      }
    >
      {target && <p className="text-body font-medium text-foreground">{target}</p>}
      <p className="text-tiny text-muted">{description}</p>
    </CusModal>
  );
}
