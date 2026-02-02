interface IconProps {
  className?: string;
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14l6 6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v1M12 11v6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M10 2L4 8l6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function MapIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 4v4l3 2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M2 2h5v12H2V2zm7 0h5v12H9V2z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function MagazineIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <rect x="2" y="1" width="12" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 4h6M5 7h6M5 10h4" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function MangaIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M2 3c0-1 1-2 2-2h8c1 0 2 1 2 2v6c0 1-1 2-2 2H7l-3 3v-3H4c-1 0-2-1-2-2V3z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <rect x="2" y="1" width="12" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="8" cy="8" rx="3" ry="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M1 8h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ScrollIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M4 2c-1 0-2 1-2 2v8c0 1 1 2 2 2h8c1 0 2-1 2-2V4c0-1-1-2-2-2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function KeyIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <circle cx="5" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 7l7 7M12 12l2-2M12 14l2-2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
