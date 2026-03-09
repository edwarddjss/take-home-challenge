import {
  createAccessToken,
  isAccessCodeMatch,
  isAuthorizedAccessToken,
} from "@/lib/access/access-auth";
import { describe, expect, it } from "vitest";

describe("access auth", () => {
  it("matches only the exact configured access code after trimming input", () => {
    expect(isAccessCodeMatch(" open-sesame ", "open-sesame")).toBe(true);
    expect(isAccessCodeMatch("wrong", "open-sesame")).toBe(false);
    expect(isAccessCodeMatch("anything", undefined)).toBe(false);
  });

  it("creates a stable token for the configured access code", async () => {
    const token = await createAccessToken("open-sesame");

    expect(token).toHaveLength(64);
    expect(token).toBe(await createAccessToken("open-sesame"));
  });

  it("authorizes only the expected token", async () => {
    const token = await createAccessToken("open-sesame");

    await expect(isAuthorizedAccessToken(token, "open-sesame")).resolves.toBe(true);
    await expect(isAuthorizedAccessToken("forged-token", "open-sesame")).resolves.toBe(false);
    await expect(isAuthorizedAccessToken(undefined, "open-sesame")).resolves.toBe(false);
  });
});
