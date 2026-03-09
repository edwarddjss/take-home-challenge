function normalizeCode(value: string) {
  return value.trim();
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createAccessToken(accessCode: string) {
  const payload = new TextEncoder().encode(`deck:${normalizeCode(accessCode)}`);
  const digest = await crypto.subtle.digest("SHA-256", payload);
  return toHex(digest);
}

export function isAccessCodeMatch(input: string, accessCode: string | undefined) {
  if (!accessCode) return false;
  return normalizeCode(input) === normalizeCode(accessCode);
}

export async function isAuthorizedAccessToken(
  token: string | undefined,
  accessCode: string | undefined,
) {
  if (!token || !accessCode) return false;
  return token === (await createAccessToken(accessCode));
}
