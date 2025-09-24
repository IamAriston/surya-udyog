"use server";
import { decrypt, encrypt } from "../crypto";

export async function encryptUserId(userId: string) {
  return encrypt(userId);
}

export async function decryptUserId(encryptedUserId: string) {
  return decrypt(encryptedUserId);
}
