import { Button } from "@/components/ui/button";
import type { Confidence } from "@/types/session";

const confidenceOptions = [
  {
    confidence: "blank",
    hint: "Try again soon",
    icon: "☹",
    label: "Blank",
  },
  {
    confidence: "wobbly",
    hint: "Review tomorrow",
    icon: "◔",
    label: "Wobbly",
  },
  {
    confidence: "locked",
    hint: "Mastered",
    icon: "☺",
    label: "Locked",
  },
] satisfies {
  confidence: Confidence;
  hint: string;
  icon: string;
  label: string;
}[];

type ConfidenceActionsProps = {
  answerRevealed: boolean;
  onSelect: (confidence: Confidence) => void;
};

export function ConfidenceActions({
  answerRevealed,
  onSelect,
}: ConfidenceActionsProps) {
  return (
    <section className="confidence-block">
      <p className="confidence-heading">How well did you know this?</p>
      <div className="confidence-grid">
        {confidenceOptions.map((option) => (
          <Button
            aria-label={option.label}
            className={`confidence-card confidence-card-${option.confidence}`}
            key={option.confidence}
            onClick={() => onSelect(option.confidence)}
            type="button"
            variant="option"
          >
            <span aria-hidden="true" className="confidence-icon">
              {option.icon}
            </span>
            <span className="confidence-label">{option.label}</span>
            <span className="confidence-hint">
              {answerRevealed || option.confidence === "blank"
                ? option.hint
                : "Reveal first"}
            </span>
          </Button>
        ))}
      </div>
    </section>
  );
}
