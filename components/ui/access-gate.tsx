"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAccessCode } from "@/app/actions/access";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";

type AccessGateProps = {
  nextPath: string;
};

export function AccessGate({ nextPath }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(false);
    setIsLoading(true);

    const result = await verifyAccessCode(code);

    if (result.success) {
      router.push(nextPath);
      router.refresh();
      return;
    }

    setError(true);
    setIsLoading(false);
  }

  return (
    <section className="access-gate-card">
      <div className="access-gate-brand">
        <div className="top-nav-logo">
          <div className="top-nav-logo-inner" />
        </div>
        <span className="top-nav-name">deck</span>
      </div>
      <h1 className="access-gate-title">Enter code to access site</h1>
      <form className="access-gate-form" onSubmit={handleSubmit}>
        <div className="field-stack">
          <FieldLabel htmlFor="access-code">Access code</FieldLabel>
          <TextField
            autoFocus
            id="access-code"
            onChange={(event) => setCode(event.target.value)}
            placeholder="Secret passcode"
            type="password"
            value={code}
          />
        </div>
        {error ? <p className="access-gate-error">Incorrect access code.</p> : null}
        <Button disabled={isLoading || !code.trim()} type="submit" variant="primary">
          {isLoading ? "Verifying..." : "Enter"}
        </Button>
      </form>
    </section>
  );
}
