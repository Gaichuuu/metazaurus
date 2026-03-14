import { describe, it, expect, beforeEach } from "vitest";
import { getSecretConfig, isFileUnlocked, unlockFile } from "./secretFiles";

// Mock localStorage for node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

describe("getSecretConfig", () => {
  it("returns config for a known locked file", () => {
    const config = getSecretConfig("characters", "dark-caster");
    expect(config).toBeDefined();
    expect(config?.locked?.password).toBe("adam");
    expect(config?.locked?.hint).toBe("Who is the dark figure's secret identity?");
  });

  it("returns config for a file with array of passwords", () => {
    const config = getSecretConfig("characters", "crowley");
    expect(Array.isArray(config?.locked?.password)).toBe(true);
    expect(config?.locked?.password).toContain("us");
  });

  it("returns config for a file with no locked property", () => {
    const config = getSecretConfig(
      "book",
      "7-the-incredibly-amazingly-effective-training-gizmo-box-9001-p9001-for-short-patent-pending",
    );
    expect(config).toBeDefined();
    expect(config?.locked).toBeUndefined();
  });

  it("returns undefined for an unknown file", () => {
    expect(getSecretConfig("characters", "nonexistent")).toBeUndefined();
  });

  it("returns undefined for an unknown category", () => {
    expect(getSecretConfig("unknown-category", "dark-caster")).toBeUndefined();
  });
});

describe("isFileUnlocked / unlockFile", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("returns false for a locked file with no unlock stored", () => {
    expect(isFileUnlocked("characters", "dark-caster")).toBe(false);
  });

  it("returns true after unlocking a file", () => {
    unlockFile("characters", "dark-caster");
    expect(isFileUnlocked("characters", "dark-caster")).toBe(true);
  });

  it("does not affect other files when unlocking one", () => {
    unlockFile("characters", "dark-caster");
    expect(isFileUnlocked("world", "timeline")).toBe(false);
  });

  it("calling unlockFile twice does not duplicate the entry", () => {
    unlockFile("characters", "dark-caster");
    unlockFile("characters", "dark-caster");
    const stored = JSON.parse(localStorageMock.getItem("metazaurus-unlocked") || "[]");
    expect(stored.filter((k: string) => k === "characters/dark-caster")).toHaveLength(1);
  });

  it("returns false when localStorage contains invalid JSON", () => {
    localStorageMock.setItem("metazaurus-unlocked", "not-json");
    expect(isFileUnlocked("characters", "dark-caster")).toBe(false);
  });

  it("recovers gracefully when localStorage has corrupt data on unlock", () => {
    localStorageMock.setItem("metazaurus-unlocked", "not-json");
    unlockFile("characters", "dark-caster");
    expect(isFileUnlocked("characters", "dark-caster")).toBe(true);
  });
});
