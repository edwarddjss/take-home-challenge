type ProgressBarProps = {
  current: number;
  label: string;
  total: number;
};

export function ProgressBar({ current, label, total }: ProgressBarProps) {
  const progress = total === 0 ? 0 : (current / total) * 100;

  return (
    <section className="progress-bar-block">
      <div className="progress-bar-header">
        <p className="progress-bar-label">{label}</p>
        <p className="progress-bar-count">
          {current}/{total}
        </p>
      </div>
      <div aria-hidden="true" className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
