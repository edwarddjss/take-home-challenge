import {
    getSavedDeckById,
    resetSavedDecks,
    saveGeneratedDeck,
} from "@/lib/saved-decks-store";
import type { GeneratedDeck } from "@/types/ai";

const deck: GeneratedDeck = {
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
};

describe("saved-decks-store localStorage", () => {
    beforeEach(() => {
        resetSavedDecks();
        localStorage.clear();
    });

    it("persists a saved deck to localStorage", () => {
        saveGeneratedDeck(deck);

        const raw = localStorage.getItem("deck:saved-decks");
        expect(raw).not.toBeNull();

        const parsed = JSON.parse(raw!) as unknown[];
        expect(parsed).toHaveLength(1);
    });

    it("clears localStorage on reset", () => {
        saveGeneratedDeck(deck);
        resetSavedDecks();

        const raw = localStorage.getItem("deck:saved-decks");
        const parsed = JSON.parse(raw!) as unknown[];
        expect(parsed).toHaveLength(0);
    });

    it("finds a deck by id after save", () => {
        saveGeneratedDeck(deck);

        const entry = getSavedDeckById("civics-medium");
        expect(entry).not.toBeNull();
        expect(entry!.deck.topic).toBe("Civics");
    });
});
