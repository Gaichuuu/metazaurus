import { useEffect, useState } from "react";
import logoArt from "../assets/ascii-art.txt?raw";
import { version } from "../../package.json";
import {
  CURSOR_BLINK_INTERVAL_MS,
  BOOT_STEP_DELAY_MS,
  BOOT_SEQUENCE_TOTAL_STEPS,
} from "../constants";
import { getWikiStats } from "../hooks/useWikiData";

const { entries, classified, cards } = getWikiStats();

const BOOT_MESSAGES = [
  "Initializing cryptid database...",
  "Loading classified archives...",
  "Decrypting lore fragments...",
  "Establishing secure connection...",
];

export function HomePage() {
  const [showCursor, setShowCursor] = useState(true);
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setShowCursor((s) => !s),
      CURSOR_BLINK_INTERVAL_MS
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const steps = Array.from(
      { length: BOOT_SEQUENCE_TOTAL_STEPS },
      (_, i) => i + 1
    );
    steps.forEach((step, i) => {
      timers.push(setTimeout(() => setBootStep(step), i * BOOT_STEP_DELAY_MS));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="homepage-terminal h-full w-full flex flex-col overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="homepage-header flex justify-between items-center mb-2 text-base">
          <span>METAZAURUS TERMINAL v{version}</span>
          <span className="homepage-status">
            {showCursor ? "●" : "○"} ONLINE
          </span>
        </div>

        <div className="homepage-boot text-base mb-3 space-y-0.5">
          {BOOT_MESSAGES.map(
            (msg, i) =>
              bootStep >= i + 1 && (
                <div key={i}>
                  {">"} {msg} <span className="homepage-boot-ok">OK</span>
                </div>
              )
          )}
          {bootStep >= 5 && (
            <div className="homepage-boot-ready">
              {">"} SYSTEM READY — SELECT CATEGORY
              {showCursor ? "█" : " "}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <pre
            className="homepage-ascii select-none"
            style={{ opacity: bootStep >= 5 ? 1 : 0.3 }}
          >
            {logoArt.trim()}
          </pre>
        </div>

        <div className="homepage-header flex justify-between items-end mt-2 text-base">
          <div className="homepage-footer-left">
            <div>CRYPTID NATION INTELLIGENCE SYSTEM</div>
            <div className="opacity-60">{entries} ENTRIES | {classified} CLASSIFIED | {cards} CARDS</div>
          </div>
          <div className="homepage-footer-right text-right">
            <div className="homepage-copyright text-2xl tracking-widest">
              © {new Date().getFullYear()} METAZAURUS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
