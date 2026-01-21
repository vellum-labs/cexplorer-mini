export const normalizeHash = (hash: string | null | undefined): string => {
  if (!hash) return "";

  if (hash.startsWith("\\x")) {
    return hash.slice(2);
  }

  if (hash.startsWith("0x")) {
    return hash.slice(2);
  }

  return hash;
};
