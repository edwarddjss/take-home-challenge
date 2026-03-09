import Link from "next/link";
import { appCopyright, savedDecksLabel } from "@/constants/app-shell";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div aria-hidden="true" className="app-footer-spacer" />
      <p className="app-footer-copy">{appCopyright}</p>
      <div className="app-footer-actions">
        <Link className="top-nav-item" href="/decks">
          {savedDecksLabel}
        </Link>
      </div>
    </footer>
  );
}
