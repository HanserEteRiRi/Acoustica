import CryptoJS from "crypto-js";

export function hashID(songName: string, artistName: string): string {
  const input = `${songName}-${artistName}`;
  const hash = CryptoJS.SHA256(input).toString();
  return hash;
}
