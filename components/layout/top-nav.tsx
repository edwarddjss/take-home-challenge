import type { ReactNode } from "react";
import Link from "next/link";
import { appName } from "@/constants/app-shell";

type TopNavProps = {
  rightSlot?: ReactNode;
};

export function TopNav({ rightSlot }: TopNavProps) {
  return (
    <header className="top-nav">
      <Link aria-label="Go to home" className="top-nav-brand" href="/">
        <span aria-hidden="true" className="top-nav-logo">
          <span className="top-nav-logo-inner" />
        </span>
        <span className="top-nav-brand-text">{appName}</span>
      </Link>

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
