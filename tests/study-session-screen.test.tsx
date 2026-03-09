import { fireEvent, render, screen } from "@testing-library/react";
import { StudySessionScreen } from "@/features/study-session/study-session-screen";
import type { GeneratedDeck } from "@/types/ai";

const deck: GeneratedDeck = {
  topic: "Pastel Brutalism",
  title: "Pastel Brutalism",
  difficulty: "medium",
  cardCount: 5,
  cards: [
    {
      answer: "Raw structure mixed with approachable softness.",
      position: 0,
      question: "What is the core principle of Pastel Brutalism?",
    },
    {
      answer: "Rounded corners and softer colors.",
      position: 1,
      question: "What makes it feel softer than hard brutalism?",
    },
    {
      answer: "Bold structure with gentler surfaces.",
      position: 2,
      question: "Why does it still feel intentional?",
    },
    {
      answer: "To balance edge with approachability.",
      position: 3,
      question: "Why use soft borders?",
    },
    {
      answer: "A minimal visual system.",
      position: 4,
      question: "What ties the interface together?",
    },
  ],
  source: { provider: "openai", model: "gpt-4.1-nano" },
};

describe("StudySessionScreen", () => {
  it("prevents immediate reveal and allows blank to reveal the answer", () => {
    const now = 0;

    render(
      <StudySessionScreen
        deck={deck}
        getNow={() => now}
        minimumRevealMs={4000}
        onClose={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Reveal answer" }));

    expect(
      screen.getByText(
        "Try your best first. If you are blank, tap Blank to reveal the answer.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Raw structure mixed with approachable softness."),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Blank" }));

    expect(
      screen.getByText("Raw structure mixed with approachable softness."),
    ).toBeInTheDocument();
  });

  it("advances to the next card after a confidence choice once the answer is revealed", () => {
    let now = 0;

    render(
      <StudySessionScreen
        deck={deck}
        getNow={() => now}
        minimumRevealMs={4000}
        onClose={() => {}}
      />,
    );

    now = 4000;
    fireEvent.click(screen.getByRole("button", { name: "Reveal answer" }));
    fireEvent.click(screen.getByRole("button", { name: "Locked" }));

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "What makes it feel softer than hard brutalism?",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("2/5")).toBeInTheDocument();
  });
});
