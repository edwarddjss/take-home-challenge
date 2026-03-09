import { SavedDeckDetailScreen } from "@/features/saved-decks/saved-deck-detail-screen";

type DeckDetailPageProps = {
  params: Promise<{ deckId: string }>;
};

export default async function DeckDetailPage({
  params,
}: DeckDetailPageProps) {
  const { deckId } = await params;

  return <SavedDeckDetailScreen deckId={deckId} />;
}
