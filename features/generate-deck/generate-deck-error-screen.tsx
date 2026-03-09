import { Button } from "@/components/ui/button";

type GenerateDeckErrorScreenProps = {
  errorMessage: string | null;
  onRetry: () => void;
};

export function GenerateDeckErrorScreen({
  errorMessage,
  onRetry,
}: GenerateDeckErrorScreenProps) {
  return (
    <section className="screen-panel">
      <div className="form-stack">
        <p className="field-label">Generation failed</p>
        <p className="field-help">{errorMessage}</p>
        <Button onClick={onRetry} type="button">
          Try again
        </Button>
      </div>
    </section>
  );
}
