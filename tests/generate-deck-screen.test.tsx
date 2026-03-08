import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenerateDeckScreen } from "@/features/generate-deck/generate-deck-screen";

describe("GenerateDeckScreen", () => {
  it("renders only the first-screen controls and lets the user change them", async () => {
    const user = userEvent.setup();

    render(<GenerateDeckScreen />);

    expect(screen.getByText("Saved decks")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Deck" }),
    ).toBeInTheDocument();

    const topicInput = screen.getByLabelText("What do you want to learn?");
    const mediumButton = screen.getByRole("button", { name: "medium" });
    const hardButton = screen.getByRole("button", { name: "hard" });
    const tenCardsButton = screen.getByRole("button", { name: "10" });
    const fifteenCardsButton = screen.getByRole("button", { name: "15" });

    expect(topicInput).toHaveValue("");
    expect(mediumButton).toHaveAttribute("aria-pressed", "true");
    expect(tenCardsButton).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByText("AI generates a study deck from your topic."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Generate deck" }),
    ).toBeInTheDocument();

    await user.type(topicInput, "basic geography");
    await user.click(hardButton);
    await user.click(fifteenCardsButton);

    expect(topicInput).toHaveValue("basic geography");
    expect(mediumButton).toHaveAttribute("aria-pressed", "false");
    expect(hardButton).toHaveAttribute("aria-pressed", "true");
    expect(tenCardsButton).toHaveAttribute("aria-pressed", "false");
    expect(fifteenCardsButton).toHaveAttribute("aria-pressed", "true");
  });
});
