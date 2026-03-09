type StatusPillProps = {
  children: React.ReactNode;
};

export function StatusPill({ children }: StatusPillProps) {
  return <span className="status-pill">{children}</span>;
}
