import { useEffect, useState } from "react";
import logoArt from "../assets/ascii-art.txt?raw";
import { version } from "../../package.json";
import {
  CURSOR_BLINK_INTERVAL_MS,
  BOOT_STEP_DELAY_MS,
  BOOT_SEQUENCE_TOTAL_STEPS,
} from "../constants";

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
    const steps = Array.from(
      { length: BOOT_SEQUENCE_TOTAL_STEPS },
      (_, i) => i + 1
    );
    steps.forEach((step, i) => {
      setTimeout(() => setBootStep(step), i * BOOT_STEP_DELAY_MS);
    });
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
        <div
          className="flex justify-between items-center mb-2 text-base"
          style={{ fontFamily: "VT323, monospace", color: "#7a8a5a" }}
        >
          <span>METAZAURUS TERMINAL v{version}</span>
          <span
            style={{
              color: "#e8c878",
              textShadow: "0 0 6px rgba(212, 168, 87, 0.5)",
            }}
          >
            {showCursor ? "●" : "○"} ONLINE
          </span>
        </div>

        <div
          className="text-base mb-3 space-y-0.5"
          style={{ fontFamily: "VT323, monospace", color: "#6a7a4a" }}
        >
          {bootStep >= 1 && (
            <div>
              {">"} Initializing cryptid database...{" "}
              <span style={{ color: "#7a9a4a" }}>OK</span>
            </div>
          )}
          {bootStep >= 2 && (
            <div>
              {">"} Loading classified archives...{" "}
              <span style={{ color: "#7a9a4a" }}>OK</span>
            </div>
          )}
          {bootStep >= 3 && (
            <div>
              {">"} Decrypting lore fragments...{" "}
              <span style={{ color: "#7a9a4a" }}>OK</span>
            </div>
          )}
          {bootStep >= 4 && (
            <div>
              {">"} Establishing secure connection...{" "}
              <span style={{ color: "#7a9a4a" }}>OK</span>
            </div>
          )}
          {bootStep >= 5 && (
            <div
              style={{
                color: "#e8c878",
                textShadow: "0 0 8px rgba(232, 200, 120, 0.5)",
              }}
            >
              {">"} SYSTEM READY — SELECT CATEGORY
              {showCursor ? "█" : " "}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <pre
            className="select-none"
            style={{
              fontFamily: "monospace",
              fontSize: "clamp(5px, 1vw, 10px)",
              lineHeight: "1.0",
              color: "#b8c88a",
              textShadow: "0 0 3px rgba(184, 200, 138, 0.3)",
              whiteSpace: "pre",
              opacity: bootStep >= 5 ? 1 : 0.3,
              transition: "opacity 0.5s ease",
            }}
          >
            {logoArt.trim()}
          </pre>
        </div>

        <div
          className="flex justify-between items-end mt-2 text-base"
          style={{ fontFamily: "VT323, monospace" }}
        >
          <div style={{ color: "#5a6a3a" }}>
            <div>CRYPTID NATION INTELLIGENCE SYSTEM</div>
            <div className="opacity-60">35 ENTRIES | 3 CLASSIFIED | 255 CARDS</div>
          </div>
          <div className="text-right" style={{ color: "#8a9a6a" }}>
            <div
              className="text-2xl tracking-widest"
              style={{
                color: "#5A6A3A",
                opacity: 0.6,
                textShadow: "0 0 8px rgba(200, 216, 154, 0.3)",
              }}
            >
              © {new Date().getFullYear()} METAZAURUS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
