import { useRouteError } from "react-router-dom";

export function ErrorFallback() {
  const error = useRouteError();
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <div className="h-full flex items-center justify-center bg-zaurus-lcd-bg">
      <div className="text-center p-8">
        <div className="error-fallback-title text-4xl mb-4">
          ⚠ SYSTEM ERROR
        </div>
        <div className="error-fallback-message text-lg mb-6">
          {message}
        </div>
        <a href="/" className="lcd-btn">
          RETURN TO HOME
        </a>
      </div>
    </div>
  );
}
