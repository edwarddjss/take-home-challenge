import type { ReactNode } from "react";

type CardPreviewPanelProps = {
  children: ReactNode;
};

export function CardPreviewPanel({ children }: CardPreviewPanelProps) {
  return <section className="card-preview-panel">{children}</section>;
}
