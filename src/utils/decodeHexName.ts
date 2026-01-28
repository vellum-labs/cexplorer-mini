export const decodeHexName = (name: string): string | null => {
  try {
    if (/^[0-9a-fA-F]+$/.test(name) && name.length % 2 === 0) {
      const bytes = name.match(/.{2}/g)?.map(b => parseInt(b, 16)) ?? [];
      const decoded = String.fromCharCode(...bytes);
      if (/^[\x20-\x7E]+$/.test(decoded)) {
        return decoded;
      }
    }
  } catch {
    return null;
  }
  return null;
};
