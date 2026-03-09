import { CardListItem } from "@/components/ui/card-list-item";
import { CardPreviewPanel } from "@/components/ui/card-preview-panel";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import type { GeneratedDeck } from "@/types/ai";

const cardLabels = [
  "Fundamental concept",
  "Execution context",
  "Comparison",
  "Performance",
  "Best practices",
];

type GenerateDeckPreviewScreenProps = {
  deck: GeneratedDeck;
  onRegenerate: () => void;
  onStartStudying: () => void;
};

export function GenerateDeckPreviewScreen({
  deck,
  onRegenerate,
  onStartStudying,
}: GenerateDeckPreviewScreenProps) {
  return (
    <section className="preview-shell">
      <header className="preview-header">
        <h1 className="preview-title">{deck.title}</h1>
        <div className="preview-subtitle">
          <StatusPill>{deck.cardCount} cards</StatusPill>
          <p className="preview-description">
            Master the fundamentals of {deck.topic}
          </p>
        </div>
      </header>

      <div className="preview-actions">
        <Button className="preview-primary-action" onClick={onStartStudying} type="button">
          <span aria-hidden="true" className="preview-button-icon">
            ▷
          </span>
          Start studying
        </Button>
        <Button onClick={onRegenerate} type="button" variant="option">
          <span aria-hidden="true" className="preview-button-icon">
            ↻
          </span>
          Regenerate deck
        </Button>
      </div>

      <CardPreviewPanel>
        <div className="preview-list">
          {deck.cards.map((card, index) => (
            <CardListItem
              key={`${card.question}-${index}`}
              index={index}
              label={cardLabels[index] ?? "Study card"}
              question={card.question}
            />
          ))}
        </div>
      </CardPreviewPanel>

      <footer className="preview-footer">
        <span className="preview-footer-label">Recent cards</span>
      </footer>
    </section>
  );
}
