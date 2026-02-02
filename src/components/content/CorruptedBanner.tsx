interface CorruptedBannerProps {
  message?: string;
}

export function CorruptedBanner({
  message = "FILE INTEGRITY COMPROMISED",
}: CorruptedBannerProps) {
  return <div className="corrupted-banner">⚠ {message} ⚠</div>;
}
