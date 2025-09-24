import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { stat } from "fs";

const rawKey = process.env.ENCRYPTION_SECRET!;
const key = Buffer.from(rawKey, "base64");
const algorithm = "aes-256-cbc";

export function encrypt(text: string) {
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(encrypted: string) {
  try {
    const [ivHex, dataHex] = encrypted.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(dataHex, "hex");

    if (!ivHex || !dataHex) {
      throw new Error("Invalid Worker ID");
    }
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return { status: true, response: decrypted.toString("utf8") };
  } catch (error) {
    return {
      status: false,
      response: "Unable to fetch Worker ID.",
    };
  }
}
