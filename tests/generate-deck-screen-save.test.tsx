import { fireEvent, render, screen } from "@testing-library/react";
import { GenerateDeckScreen } from "@/features/generate-deck/generate-deck-screen";
import { getSavedDecksSnapshot, resetSavedDecks } from "@/lib/saved-decks-store";

describe("GenerateDeckScreen save flow", () => {
  beforeEach(() => {
    resetSavedDecks();
  });

  it("only saves a deck when the user clicks save deck", async () => {
    render(
      <GenerateDeckScreen
        minimumLoadingMs={0}
        requestDeck={async () => ({
          topic: "Civics",
          title: "Civics - Medium",
          difficulty: "medium",
          cardCount: 5,
          cards: [
            { question: "What is due process?", answer: "Fair legal procedure.", position: 0 },
            { question: "What is federalism?", answer: "Shared power across levels.", position: 1 },
            { question: "What is the Constitution?", answer: "Foundational law.", position: 2 },
            { question: "What is judicial review?", answer: "Court review of laws.", position: 3 },
            { question: "What is separation of powers?", answer: "Division of branches.", position: 4 },
          ],
          source: { provider: "openai", model: "gpt-4.1-nano" },
        })}
      />,
    );

    fireEvent.change(screen.getByLabelText("What do you want to learn?"), {
      target: { value: "Civics" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate deck" }));

    await screen.findByRole("heading", { level: 1, name: "Civics - Medium" });

    expect(getSavedDecksSnapshot()).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Save deck" }));

    expect(getSavedDecksSnapshot()).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Saved" })).toBeDisabled();
  });
});
