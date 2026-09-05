import { useEffect, useRef, useState, type CSSProperties } from 'react';
import CusLinkModal from '@/components/ui/rich-editor/CusLinkModal';
import { cn } from '@/utils/cn';

type Props = {
  /** HTML matn */
  value: string;
  onChange: (html: string) => void;
  label?: string;
  error?: string | null;
  hint?: string | null;
  placeholder?: string;
  minHeight?: number;
  className?: string;
};

type Tool = {
  label: string;
  title: string;
  /** Guruh boshlanishi — chapdan bo'sh joy */
  gap?: boolean;
  style?: CSSProperties;
  cmd: string;
  arg?: string;
};

const TOOLS: readonly Tool[] = [
  { label: 'H3', title: 'Заголовок 3', cmd: 'formatBlock', arg: 'h3', style: { fontWeight: 600 } },
  { label: 'H4', title: 'Заголовок 4', cmd: 'formatBlock', arg: 'h4', style: { fontWeight: 600 } },
  { label: '¶', title: 'Обычный текст', cmd: 'formatBlock', arg: 'p' },
  { label: 'B', title: 'Полужирный', cmd: 'bold', gap: true, style: { fontWeight: 700 } },
  { label: 'I', title: 'Курсив', cmd: 'italic', style: { fontStyle: 'italic' } },
  { label: '❝', title: 'Цитата', cmd: 'formatBlock', arg: 'blockquote' },
];

/**
 * Tavsif va yangilik matni uchun oddiy rich-text maydoni.
 * `document.execCommand` — dizayn prototipidagi bilan bir xil xatti-harakat;
 * server state ulanganda kutubxonaga almashtiriladi.
 */
export default function CusRichEditor({
  value,
  onChange,
  label,
  error,
  hint,
  placeholder,
  minHeight = 120,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);

  /* Tashqi qiymat o'zgarganda ichkarini yangilash. Kursor sakramasligi uchun
     faqat haqiqiy farq bo'lganda yoziladi. */
  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  const run = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  return (
    <div className={cn('w-full', className)}>
      {label && <div className="mb-1.5 text-micro tracking-wide text-muted">{label}</div>}

      <div
        className={cn(
          'overflow-hidden rounded-sm border',
          error
            ? 'border-danger'
            : 'border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25',
        )}
      >
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-background px-2 py-1.5">
          {TOOLS.map((t) => (
            <button
              key={t.label}
              type="button"
              title={t.title}
              style={t.style}
              onClick={() => run(t.cmd, t.arg)}
              className={cn(
                'h-6 min-w-6 rounded-xs border border-transparent px-1.5 text-mini text-muted',
                'transition-colors hover:border-border hover:bg-primary-soft hover:text-primary-hover',
                t.gap && 'ml-2',
              )}
            >
              {t.label}
            </button>
          ))}

        
        </div>

        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label={label}
          data-placeholder={placeholder}
          style={{ minHeight }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="bg-surface px-3 py-2.5 text-body text-foreground outline-none"
        />
      </div>

      {error ? (
        <p className="mt-1 text-micro text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1 text-micro text-subtle">{hint}</p>
      )}

      {linkOpen && (
        <CusLinkModal
          onClose={() => setLinkOpen(false)}
          onSubmit={(url) => run('createLink', url)}
        />
      )}
    </div>
  );
}
