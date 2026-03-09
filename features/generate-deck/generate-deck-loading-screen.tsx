"use client";

import { useEffect, useState } from "react";
import {
  loadingStudyTips,
  loadingTipRotationMs,
} from "@/constants/loading-screen";

export function GenerateDeckLoadingScreen() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTipIndex((current) => (current + 1) % loadingStudyTips.length);
    }, loadingTipRotationMs);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="loading-shell">
      <div aria-hidden="true" className="loading-illustration">
        <div className="loading-card loading-card-back" />
        <div className="loading-card loading-card-mid" />
        <div className="loading-card loading-card-front">
          <span className="loading-dot loading-dot-top" />
          <span className="loading-dot loading-dot-bottom" />
          <span className="loading-accent" />
          <span className="loading-sparkle">✦</span>
        </div>
      </div>

      <div className="loading-copy">
        <h2 className="loading-title">Generating your deck...</h2>
        <p aria-live="polite" className="loading-tip">
          Tip: {loadingStudyTips[tipIndex]}
        </p>
      </div>
    </section>
  );
}
