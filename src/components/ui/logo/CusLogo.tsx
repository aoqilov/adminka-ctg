import { cn } from '@/utils/cn';

type Props = {
  /**
   * Haqiqiy logo fayli (masalan `/logo.svg`). Berilsa — shu rasm chiziladi.
   * Bo'sh bo'lsa quyidagi vaqtinchalik belgi ishlatiladi.
   */
  src?: string;
  alt: string;
  size?: number;
  className?: string;
};

/**
 * Brend belgisi. Ichki variant `currentColor` bilan chizilgan — ya'ni
 * temaga va Settings'dagi accent tanloviga moslashadi.
 *
 * Salon o'z logotipini bergach: faylni `public/` ga qo'ying va
 * `APP_LOGO_URL` ni to'ldiring — kod o'zgarmaydi.
 */
export default function CusLogo({ src, alt, size = 40, className }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        height={size}
        className={cn('block w-auto max-w-full object-contain', className)}
        style={{ height: size }}
      />
    );
  }

  return (
    <svg
      role="img"
      aria-label={alt}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={cn('block', className)}
    >
      {/* ramka */}
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="11"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.35"
      />

      {/* A-siluetli ko'ylak: yurakcha korsaj + kengayuvchi etak */}
      <path
        d="M17.5 13C19.5 16.5 22 16.5 24 13.6C26 16.5 28.5 16.5 30.5 13L27.6 25L36.5 39H11.5L20.4 25L17.5 13Z"
        fill="currentColor"
      />

      {/* etakdagi tikuv chizig'i */}
      <path
        d="M24 27.5V38"
        stroke="var(--color-surface)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
