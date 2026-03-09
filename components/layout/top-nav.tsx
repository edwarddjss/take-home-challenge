import type { ReactNode } from "react";

type TopNavProps = {
  rightSlot?: ReactNode;
};

export function TopNav({ rightSlot }: TopNavProps) {
  return (
    <header className="top-nav">
      <div className="top-nav-brand">
        <span aria-hidden="true" className="top-nav-logo">
          <span className="top-nav-logo-inner" />
        </span>
        <span className="top-nav-brand-text">Deck</span>
      </div>

      {rightSlot ? (
        <nav aria-label="Primary" className="top-nav-menu">
          {rightSlot}
        </nav>
      ) : (
        <div aria-hidden="true" className="top-nav-spacer" />
      )}
    </header>
  );
}
