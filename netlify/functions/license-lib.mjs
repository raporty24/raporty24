import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

export const STORE_NAME = "ksef-licenses";

export function headers(status = 200) {
  return { statusCode: status, headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-secret",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  }};
}
export function response(status, body) { return { ...headers(status), body: JSON.stringify(body) }; }
export function normalizeLicenseKey(value) { return String(value || "").trim().toUpperCase().replace(/\s+/g, "").replace(/[^A-Z0-9-]/g, ""); }
export function normalizeNip(value) { return String(value || "").replace(/\D/g, ""); }
export function sha256(value) { return crypto.createHash("sha256").update(String(value), "utf8").digest("hex"); }
export function requireEnv(name) { const value = process.env[name]; if (!value) throw new Error(`Missing environment variable: ${name}`); return value; }
export function licenseHash(licenseKey) { return sha256(`${requireEnv("LICENSE_SALT")}:license:${normalizeLicenseKey(licenseKey)}`); }
export function machineHash(machineId) { return sha256(`${requireEnv("LICENSE_SALT")}:machine:${String(machineId || "").trim()}`); }
export function storageKeyForLicense(licenseKey) { return `licenses/${licenseHash(licenseKey)}.json`; }
export function getLicenseStore() { return getStore({ name: STORE_NAME, consistency: "strong" }); }
export async function parseBody(event) { if (!event.body) return {}; try { return JSON.parse(event.body); } catch { throw new Error("Nieprawidłowy JSON w body requestu."); } }
export function isExpired(expiresAt) { if (!expiresAt) return false; const today = new Date(); const expires = new Date(`${expiresAt}T23:59:59Z`); return Number.isFinite(expires.getTime()) && today > expires; }
export function sanitizePublicLicense(license) { return { status: license.status, customer: license.customer || "", nip: license.nip || "", max_devices: license.max_devices || 1, expires_at: license.expires_at || null, device_count: Array.isArray(license.devices) ? license.devices.length : 0, offline_days: license.offline_days || 7 }; }
export function checkAdmin(event) { const expected = requireEnv("ADMIN_SECRET"); const actual = event.headers["x-admin-secret"] || event.headers["X-Admin-Secret"]; return actual && actual === expected; }
