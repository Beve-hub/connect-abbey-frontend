import { palette } from "../styles/theme";
import logo from "../assets/white_logo.svg"; 

interface LoadingScreenProps {
  label?: string;
}

export default function LoadingScreen({ label }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: "100vh",
        background: palette.ink,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <img
        src={logo}
        alt=""
        width={150}
        className="abbey-loader-pulse"
      />
      {label && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            fontFamily: "inherit",
            fontSize: 18,
            color: palette.faded,
            letterSpacing: 0.2,
          }}
        >
          {label}
          <span aria-hidden="true" style={{ display: "inline-flex", marginLeft: 2 }}>
            <span className="abbey-dot" style={{ animationDelay: "0s" }}>.</span>
            <span className="abbey-dot" style={{ animationDelay: "0.2s" }}>.</span>
            <span className="abbey-dot" style={{ animationDelay: "0.4s" }}>.</span>
          </span>
        </span>
      )}
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        Loading
      </span>

      <style>{`
        .abbey-loader-pulse {
          animation: abbey-pulse 1.6s ease-in-out infinite;
        }
        @keyframes abbey-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .abbey-dot {
          animation: abbey-dot-fade 1.4s ease-in-out infinite;
        }
        @keyframes abbey-dot-fade {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .abbey-loader-pulse, .abbey-dot { animation: none !important; }
          .abbey-dot { opacity: 1; }
        }
      `}</style>
    </div>
  );
}