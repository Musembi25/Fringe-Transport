import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallAppButton({ className = "", compact = false }) {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(
    () => window.matchMedia("(display-mode: standalone)").matches,
  );
  const [installMessage, setInstallMessage] = useState("");

  useEffect(() => {
    function captureInstallPrompt(event) {
      event.preventDefault();
      setInstallPrompt(event);
    }

    function markInstalled() {
      setInstalled(true);
      setInstallPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", captureInstallPrompt);
    window.addEventListener("appinstalled", markInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", captureInstallPrompt);
      window.removeEventListener("appinstalled", markInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) {
      setInstallMessage(
        "Use your browser menu and choose “Install app” or “Add to Home Screen”.",
      );
      return;
    }

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      setInstallPrompt(null);
      setInstallMessage(
        outcome === "accepted"
          ? ""
          : "Installation was cancelled. You can install from your browser menu.",
      );
    } catch (error) {
      console.error("Unable to start the Fringe Transport app installation.", error);
      setInstallMessage(
        "Unable to start installation. Use your browser menu to install the app.",
      );
    }
  }

  if (installed) return null;

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={installApp}
        aria-label={compact ? "Install Fringe Transport app" : undefined}
        title={compact ? "Install Fringe Transport app" : undefined}
        className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${compact ? "w-10 px-0" : ""} ${className}`}
      >
        <Download size={16} aria-hidden="true" />
        {!compact && "Install app"}
      </button>
      {installMessage && (
        <p role="status" className="max-w-56 text-xs leading-5 text-neutral-600">
          {installMessage}
        </p>
      )}
    </div>
  );
}
