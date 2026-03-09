import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { GenerateDeckScreen } from "@/features/generate-deck/generate-deck-screen";
import { getSavedDecksSnapshot, resetSavedDecks } from "@/lib/saved-decks-store";

describe("GenerateDeckScreen", () => {
  beforeEach(() => {
    resetSavedDecks();
  });

  it("renders the initial form controls", () => {
    render(<GenerateDeckScreen />);

    expect(screen.getByLabelText("What do you want to learn?")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Generate deck" })).toBeInTheDocument();
  });

  it("transitions from form to loading to preview after deck generation", async () => {
    render(
      <GenerateDeckScreen
        minimumLoadingMs={0}
        requestDeck={async () => ({
          topic: "JavaScript Closures",
          title: "JavaScript Closures - Medium",
          difficulty: "medium",
          cardCount: 5,
          cards: [
            { question: "What is a lexical environment?", answer: "A scope object.", position: 0 },
            { question: "How do closures capture variables?", answer: "By reference.", position: 1 },
            { question: "Difference between scope and closure?", answer: "One is a rule, one is a mechanism.", position: 2 },
            { question: "Can closures cause memory leaks?", answer: "Sometimes.", position: 3 },
            { question: "Common patterns using closures?", answer: "Encapsulation and factories.", position: 4 },
          ],
          source: { provider: "openai", model: "gpt-4.1-nano" },
        })}
      />,
    );

    fireEvent.change(screen.getByLabelText("What do you want to learn?"), {
      target: { value: "JavaScript Closures" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate deck" }));

    expect(screen.getByText("Generating your deck...")).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { level: 1, name: "JavaScript Closures - Medium" }),
      ).toBeInTheDocument(),
    );

    expect(screen.getByRole("button", { name: "Start studying" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save deck" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Regenerate deck" })).toBeInTheDocument();
    expect(screen.getByText("5 cards")).toBeInTheDocument();
    expect(getSavedDecksSnapshot()).toHaveLength(0);
  });

  it("returns to the form with the current values preserved when regenerate deck is pressed", async () => {
    render(
      <GenerateDeckScreen
        minimumLoadingMs={0}
        requestDeck={async () => ({
          topic: "Civil War",
          title: "Civil War - Easy",
          difficulty: "easy",
          cardCount: 10,
          cards: [
            { question: "When did the American Civil War begin and end?", answer: "1861 to 1865.", position: 0 },
            { question: "What was the main issue that caused the Civil War?", answer: "Slavery.", position: 1 },
            { question: "Who was the President of the Confederate States?", answer: "Jefferson Davis.", position: 2 },
            { question: "Who was the President of the United States during the Civil War?", answer: "Abraham Lincoln.", position: 3 },
            { question: "What was the significance of the Battle of Gettysburg?", answer: "Turning point.", position: 4 },
            { question: "What nation was fighting against the Union?", answer: "The Confederacy was not a nation recognized as such.", position: 5 },
            { question: "Which amendment abolished slavery?", answer: "The Thirteenth Amendment.", position: 6 },
            { question: "What was the Emancipation Proclamation?", answer: "Order declaring enslaved people free in rebelling states.", position: 7 },
            { question: "What were the Union and Confederacy?", answer: "The two opposing sides.", position: 8 },
            { question: "Why is the Civil War still studied today?", answer: "It shaped modern U.S. history.", position: 9 },
          ],
          source: { provider: "openai", model: "gpt-4.1-nano" },
        })}
      />,
    );

    fireEvent.change(screen.getByLabelText("What do you want to learn?"), {
      target: { value: "Civil War" },
    });
    fireEvent.click(screen.getByRole("button", { name: "easy" }));
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "Generate deck" }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { level: 1, name: "Civil War - Easy" }),
      ).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByRole("button", { name: "Regenerate deck" }));

    expect(screen.getByLabelText("What do you want to learn?")).toHaveValue("Civil War");
    expect(screen.getByRole("button", { name: "easy" })).toHaveAttribute("data-active", "true");
    expect(screen.getByRole("button", { name: "5" })).toHaveAttribute("data-active", "true");
  });

  it("opens the study session from the preview screen", async () => {
    render(
      <GenerateDeckScreen
        minimumLoadingMs={0}
        requestDeck={async () => ({
          topic: "Civil War",
          title: "Civil War - Easy",
          difficulty: "easy",
          cardCount: 5,
          cards: [
            { question: "When did the American Civil War begin and end?", answer: "1861 to 1865.", position: 0 },
            { question: "What was the main issue that caused the Civil War?", answer: "Slavery.", position: 1 },
            { question: "Who was the President of the Confederate States?", answer: "Jefferson Davis.", position: 2 },
            { question: "Who was the President of the United States during the Civil War?", answer: "Abraham Lincoln.", position: 3 },
            { question: "What was the significance of the Battle of Gettysburg?", answer: "Turning point.", position: 4 },
          ],
          source: { provider: "openai", model: "gpt-4.1-nano" },
        })}
      />,
    );

    fireEvent.change(screen.getByLabelText("What do you want to learn?"), {
      target: { value: "Civil War" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Generate deck" }));

    await screen.findByRole("heading", { level: 1, name: "Civil War - Easy" });

    fireEvent.click(screen.getByRole("button", { name: "Start studying" }));

    expect(screen.getByText("Current session")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "When did the American Civil War begin and end?",
      }),
    ).toBeInTheDocument();
  });
});
