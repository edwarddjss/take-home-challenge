import { render, screen } from "@testing-library/react";
import { SavedDecksScreen } from "@/features/saved-decks/saved-decks-screen";
import { resetSavedDecks, saveGeneratedDeck } from "@/lib/saved-decks-store";

describe("SavedDecksScreen", () => {
  beforeEach(() => {
    resetSavedDecks();
  });

  it("shows an empty state when there are no saved decks", () => {
    render(<SavedDecksScreen />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Saved decks" }),
    ).toBeInTheDocument();
    expect(screen.getByText("No saved decks yet.")).toBeInTheDocument();
  });

  it("renders generated decks that were saved in memory", () => {
    saveGeneratedDeck({
      topic: "Civics",
      title: "Civics - Medium",
      difficulty: "medium",
      cardCount: 5,
      cards: [
        {
          question: "What is separation of powers?",
          answer: "Division of government authority.",
          position: 0,
        },
      ],
      source: { provider: "openai", model: "gpt-4.1-nano" },
    });

    render(<SavedDecksScreen />);

    expect(screen.getByText("Civics - Medium")).toBeInTheDocument();
    expect(screen.getByText(/5 cards/)).toBeInTheDocument();
  });
});
