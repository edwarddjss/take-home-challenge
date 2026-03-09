"use client";

import { useSyncExternalStore } from "react";
import type { GeneratedDeck } from "@/types/ai";

const storageKey = "deck:saved-decks";

export type SavedDeckEntry = {
  deck: GeneratedDeck;
  id: string;
  savedAt: string;
};

let savedDecks: SavedDeckEntry[] = loadFromStorage();

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function persistToStorage() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(savedDecks));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

function loadFromStorage(): SavedDeckEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as SavedDeckEntry[]) : [];
  } catch {
    return [];
  }
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
  persistToStorage();
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
  persistToStorage();
  emitChange();
}
