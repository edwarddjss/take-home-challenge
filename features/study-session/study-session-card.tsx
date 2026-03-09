import { Button } from "@/components/ui/button";

type StudySessionCardProps = {
  answer: string;
  answerRevealed: boolean;
  onReveal: () => void;
  question: string;
};

export function StudySessionCard({
  answer,
  answerRevealed,
  onReveal,
  question,
}: StudySessionCardProps) {
  return (
    <section className="study-card">
      <span aria-hidden="true" className="study-card-quote">
        “
      </span>
      <div className="study-card-copy">
        <h1 className="study-card-question">{question}</h1>
        {answerRevealed ? (
          <p className="study-card-answer">{answer}</p>
        ) : (
          <p className="study-card-prompt">Think through your answer first.</p>
        )}
      </div>
      <div className="study-card-actions">
        {answerRevealed ? (
          <p className="study-card-face">Answer</p>
        ) : (
          <>
            <Button className="study-reveal-button" onClick={onReveal} type="button">
              Reveal answer
            </Button>
            <p className="study-card-face">Front of card</p>
          </>
        )}
      </div>
    </section>
  );
}
