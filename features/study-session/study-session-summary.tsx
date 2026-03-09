import { Button } from "@/components/ui/button";
import type { SessionSummary } from "@/types/session";

type StudySessionSummaryProps = {
  onBackToDeck: () => void;
  onGenerateNewDeck: () => void;
  summary: SessionSummary;
};

export function StudySessionSummary({
  onBackToDeck,
  onGenerateNewDeck,
  summary,
}: StudySessionSummaryProps) {
  return (
    <section className="summary-shell">
      <p className="summary-pill">Session complete</p>
      <div className="summary-copy">
        <h1 className="summary-title">Great session!</h1>
        <p className="summary-description">
          You reviewed {summary.reviewedCards} cards this round.
        </p>
      </div>

      <div className="summary-count-grid">
        <article className="summary-count-card summary-count-card-blank">
          <p className="summary-count-label">Blank</p>
          <p className="summary-count-value">{summary.blank}</p>
        </article>
        <article className="summary-count-card summary-count-card-wobbly">
          <p className="summary-count-label">Wobbly</p>
          <p className="summary-count-value">{summary.wobbly}</p>
        </article>
        <article className="summary-count-card summary-count-card-locked">
          <p className="summary-count-label">Locked</p>
          <p className="summary-count-value">{summary.locked}</p>
        </article>
      </div>

      <section className="summary-breakdown-card">
        <h2 className="summary-breakdown-title">Session breakdown</h2>
        <div className="summary-metric">
          <div className="summary-metric-header">
            <p className="summary-metric-label">Confidence score</p>
            <p className="summary-metric-value">{summary.confidenceScore}%</p>
          </div>
          <div aria-hidden="true" className="summary-metric-track">
            <div
              className="summary-metric-fill summary-metric-fill-primary"
              style={{ width: `${summary.confidenceScore}%` }}
            />
          </div>
        </div>
        <div className="summary-metric">
          <div className="summary-metric-header">
            <p className="summary-metric-label">Strong recall</p>
            <p className="summary-metric-value">{summary.strongRecallRate}%</p>
          </div>
          <div aria-hidden="true" className="summary-metric-track">
            <div
              className="summary-metric-fill summary-metric-fill-secondary"
              style={{ width: `${summary.strongRecallRate}%` }}
            />
          </div>
        </div>
      </section>

      <div className="summary-actions">
        <Button onClick={onGenerateNewDeck} type="button">
          Generate new deck
        </Button>
        <Button onClick={onBackToDeck} type="button" variant="option">
          Back to deck
        </Button>
      </div>
    </section>
  );
}
