import { useState } from "react";
import { UNLOCK_ANIMATION_DELAY_MS } from "../../constants";
import { isTouchDevice } from "../../utils/isTouchDevice";

interface LockedContentProps {
  hint?: string;
  correctPassword: string | string[];
  onUnlockComplete: () => void;
  children: React.ReactNode;
}

type LockState = "locked" | "unlocking" | "unlocked";

export function LockedContent({
  hint,
  correctPassword,
  onUnlockComplete,
  children,
}: LockedContentProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [lockState, setLockState] = useState<LockState>("locked");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredPassword = password.toLowerCase().trim();

    const passwords = Array.isArray(correctPassword)
      ? correctPassword
      : [correctPassword];

    if (passwords.includes(enteredPassword)) {
      setError(false);
      setLockState("unlocking");
      setTimeout(() => {
        setLockState("unlocked");
        onUnlockComplete();
      }, UNLOCK_ANIMATION_DELAY_MS);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (lockState === "unlocked") {
    return <>{children}</>;
  }

  if (lockState === "unlocking") {
    return (
      <div className="locked-content unlocking">
        <div className="locked-icon unlocked">🔓</div>
        <div className="locked-title success">ACCESS GRANTED</div>
        <div className="locked-subtitle">Decrypting file...</div>
        <div className="unlock-progress">
          <div className="unlock-progress-bar" />
        </div>
      </div>
    );
  }

  return (
    <div className="locked-content">
      <div className="locked-icon">🔒</div>
      <div className="locked-title">CLASSIFIED FILE</div>
      <div className="locked-subtitle">Authorization Required</div>

      <form onSubmit={handleSubmit} className="locked-form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter access code..."
          className="locked-input"
          autoFocus={!isTouchDevice()}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore
          data-form-type="other"
        />
        <button type="submit" className="locked-submit">
          DECRYPT
        </button>
      </form>

      {hint && <div className="locked-hint">Hint: {hint}</div>}

      {error && (
        <div className="locked-error">ACCESS DENIED - Invalid code</div>
      )}
    </div>
  );
}
