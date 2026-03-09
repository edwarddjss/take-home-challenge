export const minimumRevealDelayMs = 4000;

export const earlyRevealMessage =
  "Try your best first. If you are blank, tap Blank to reveal the answer.";

export const ratingBeforeRevealMessage =
  "Reveal the answer before choosing that rating.";

export const confidenceOptions = [
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
] as const;
