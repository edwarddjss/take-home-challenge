"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/top-nav";
import { ProgressBar } from "@/components/ui/progress-bar";
import { earlyRevealMessage, minimumRevealDelayMs, ratingBeforeRevealMessage } from "@/constants/study-session";
import { ConfidenceActions } from "@/features/study-session/confidence-actions";
import { StudySessionCard } from "@/features/study-session/study-session-card";
import { StudySessionComplete } from "@/features/study-session/study-session-complete";
import type { GeneratedDeck } from "@/types/ai";
import type { Confidence, SessionAnswer } from "@/types/session";

type StudySessionScreenProps = {
  deck: GeneratedDeck;
  getNow?: () => number;
  minimumRevealMs?: number;
  onClose: () => void;
};

export function StudySessionScreen({
  deck,
  getNow = Date.now,
  minimumRevealMs = minimumRevealDelayMs,
  onClose,
}: StudySessionScreenProps) {
  const [answers, setAnswers] = useState<SessionAnswer[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [cardStartedAt, setCardStartedAt] = useState(() => getNow());
  const [sessionComplete, setSessionComplete] = useState(false);
  const currentCard = deck.cards[currentCardIndex];
  const currentStep = sessionComplete ? deck.cards.length : Math.min(answers.length + 1, deck.cards.length);
  const closeButton = (
    <button aria-label="Close study session" className="study-close-button" onClick={onClose} type="button">
      ×
    </button>
  );

  function startNextCard() {
    setAnswerRevealed(false);
    setMessage(null);
    setCardStartedAt(getNow());
  }

  function handleReveal() {
    if (answerRevealed) {
      return;
    }

    if (getNow() - cardStartedAt < minimumRevealMs) {
      setMessage(earlyRevealMessage);
      return;
    }

    setAnswerRevealed(true);
    setMessage(null);
  }

  function handleConfidence(confidence: Confidence) {
    if (!answerRevealed) {
      if (confidence === "blank") {
        setAnswerRevealed(true);
        setMessage(null);
        return;
      }

      setMessage(ratingBeforeRevealMessage);
      return;
    }

    setAnswers((current) => [...current, { cardPosition: currentCard.position, confidence }]);

    if (currentCardIndex === deck.cards.length - 1) {
      setSessionComplete(true);
      setMessage(null);
      return;
    }

    setCurrentCardIndex((current) => current + 1);
    startNextCard();
  }

  if (sessionComplete) {
    return (
      <main className="screen-shell screen-shell-study">
        <div className="screen-frame">
          <TopNav rightSlot={closeButton} />
          <section className="study-shell">
            <ProgressBar current={deck.cards.length} label="Current session" total={deck.cards.length} />
            <StudySessionComplete cardCount={deck.cardCount} onClose={onClose} />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="screen-shell screen-shell-study">
      <div className="screen-frame">
        <TopNav rightSlot={closeButton} />
        <section className="study-shell">
          <ProgressBar current={currentStep} label="Current session" total={deck.cards.length} />
          <StudySessionCard answer={currentCard.answer} answerRevealed={answerRevealed} onReveal={handleReveal} question={currentCard.question} />
          {message ? <p className="study-message">{message}</p> : null}
          <ConfidenceActions
            answerRevealed={answerRevealed}
            onSelect={handleConfidence}
          />
          <div aria-hidden="true" className="study-dots">
            <span className="study-dot study-dot-active" />
            <span className="study-dot" />
            <span className="study-dot" />
          </div>
        </section>
      </div>
    </main>
  );
}
