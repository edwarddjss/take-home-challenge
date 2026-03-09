import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./styles/confidence-actions.css";
import "./styles/forms.css";
import "./styles/card-preview.css";
import "./styles/generate-deck.css";
import "./styles/generate-deck-loading.css";
import "./styles/generate-deck-preview.css";
import "./styles/navigation.css";
import "./styles/study-session.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deck",
  description: "Minimal AI-assisted flashcard study app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
