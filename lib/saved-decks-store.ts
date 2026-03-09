"use client";

import { useSyncExternalStore } from "react";
import type { GeneratedDeck } from "@/types/ai";

export type SavedDeckEntry = {
  deck: GeneratedDeck;
  id: string;
  savedAt: string;
};

let savedDecks: SavedDeckEntry[] = [];

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function createSavedDeckId(deck: GeneratedDeck): string {
  return `${deck.topic.trim().toLowerCase()}-${deck.difficulty}`;
}

export function saveGeneratedDeck(deck: GeneratedDeck) {
  const id = createSavedDeckId(deck);
  const nextEntry: SavedDeckEntry = {
    deck,
    id,
    savedAt: new Date().toISOString(),
  };

  savedDecks = [nextEntry, ...savedDecks.filter((entry) => entry.id !== id)];
  emitChange();
}

export function getSavedDeckById(id: string) {
  return savedDecks.find((entry) => entry.id === id) ?? null;
}

export function isDeckSaved(deck: GeneratedDeck) {
  const id = createSavedDeckId(deck);
  return savedDecks.some((entry) => entry.id === id);
}

export function getSavedDecksSnapshot() {
  return savedDecks;
}

export function subscribeToSavedDecks(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSavedDecks() {
  return useSyncExternalStore(
    subscribeToSavedDecks,
    getSavedDecksSnapshot,
    getSavedDecksSnapshot,
  );
}

export function resetSavedDecks() {
  savedDecks = [];
  emitChange();
}
