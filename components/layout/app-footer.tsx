import { appCopyright } from "@/constants/app-shell";

export function AppFooter() {
  return (
    <footer className="app-footer">
      <p className="app-footer-copy">{appCopyright}</p>
    </footer>
  );
}
