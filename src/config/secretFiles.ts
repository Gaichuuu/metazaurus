/**
 * Configuration for files with special access states
 * - locked: Requires password to view
 */
export interface SecretFileConfig {
  locked?: {
    password: string | string[];
    hint?: string;
  };
}

export const secretFiles: Record<string, SecretFileConfig> = {
  "characters/dark-caster": {
    locked: {
      password: "adam",
      hint: "Who is the dark figure's secret identity?",
    },
  },
  "world/timeline": {
    locked: {
      password: "veil",
      hint: "Ever since the ____ has shattered",
    },
  },
  "book/7-the-incredibly-amazingly-effective-training-gizmo-box-9001-p9001-for-short-patent-pending": {},
  "characters/crowley": {
    locked: {
      password: ["us", "usa", "united states"],
      hint: "Where is Crowley buried?",
    },
  },
  "world/evergreen-casters": {
    locked: {
      password: ["thirteen", "13"],
      hint: "How many Evergreen Casters are officially known?",
    },
  },
};

export function getSecretConfig(
  category: string,
  slug: string,
): SecretFileConfig | undefined {
  return secretFiles[`${category}/${slug}`];
}

const UNLOCK_STORAGE_KEY = "metazaurus-unlocked";

export function isFileUnlocked(category: string, slug: string): boolean {
  const key = `${category}/${slug}`;
  try {
    const unlocked = JSON.parse(localStorage.getItem(UNLOCK_STORAGE_KEY) || "[]");
    return unlocked.includes(key);
  } catch {
    return false;
  }
}

export function unlockFile(category: string, slug: string): void {
  const key = `${category}/${slug}`;
  try {
    const unlocked = JSON.parse(localStorage.getItem(UNLOCK_STORAGE_KEY) || "[]");
    if (!unlocked.includes(key)) {
      unlocked.push(key);
      localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(unlocked));
    }
  } catch {
    localStorage.setItem(UNLOCK_STORAGE_KEY, JSON.stringify([key]));
  }
}
