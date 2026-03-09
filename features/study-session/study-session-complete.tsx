type StudySessionCompleteProps = {
  cardCount: number;
  onClose: () => void;
};

export function StudySessionComplete({
  cardCount,
  onClose,
}: StudySessionCompleteProps) {
  return (
    <section className="study-complete-card">
      <h1 className="study-complete-title">Session complete</h1>
      <p className="study-complete-copy">
        You reviewed all {cardCount} cards in this deck.
      </p>
      <button className="study-complete-button" onClick={onClose} type="button">
        Back to deck
      </button>
    </section>
  );
}
