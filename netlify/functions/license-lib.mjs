import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

export const STORE_NAME = "ksef-licenses";
export const DEFAULT_PRODUCT = "ksef_exporter_pro";

export function headers(status = 200) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-secret",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  };
}

export function response(status, body) {
  return {
    ...headers(status),
    body: JSON.stringify(body)
  };
}

export function normalizeLicenseKey(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z0-9-]/g, "");
}

export function normalizeNip(value) {
  return String(value || "").replace(/\D/g, "");
}

export function normalizeProduct(value) {
  return String(value || DEFAULT_PRODUCT)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || DEFAULT_PRODUCT;
}

export function sha256(value) {
  return crypto.createHash("sha256").update(String(value), "utf8").digest("hex");
}

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function licenseHash(licenseKey) {
  const salt = requireEnv("LICENSE_SALT");
  return sha256(`${salt}:license:${normalizeLicenseKey(licenseKey)}`);
}

export function machineHash(machineId) {
  const salt = requireEnv("LICENSE_SALT");
  return sha256(`${salt}:machine:${String(machineId || "").trim()}`);
}

export function storageKeyForLicense(licenseKey) {
  return `licenses/${licenseHash(licenseKey)}.json`;
}

export function getLicenseStore() {
  // W części konfiguracji Netlify Blobs ustawia siteID/token automatycznie.
  // Jeżeli automatyczna konfiguracja nie działa, używamy ręcznie ustawionych env:
  // BLOBS_SITE_ID oraz BLOBS_TOKEN.
  const siteID = process.env.BLOBS_SITE_ID || process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
  const token = process.env.BLOBS_TOKEN || process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;

  if (siteID && token) {
    return getStore(STORE_NAME, { siteID, token });
  }

  return getStore(STORE_NAME);
}

export async function parseBody(event) {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch {
    throw new Error("Nieprawidłowy JSON w body requestu.");
  }
}

export function isExpired(expiresAt) {
  if (!expiresAt) return false;
  const today = new Date();
  const expires = new Date(`${expiresAt}T23:59:59Z`);
  return Number.isFinite(expires.getTime()) && today > expires;
}

export function sanitizePublicLicense(license) {
  return {
    status: license.status,
    product: license.product || DEFAULT_PRODUCT,
    customer: license.customer || "",
    nip: license.nip || "",
    max_devices: license.max_devices || 1,
    expires_at: license.expires_at || null,
    device_count: Array.isArray(license.devices) ? license.devices.length : 0,
    offline_days: license.offline_days || 7
  };
}

export function checkAdmin(event) {
  const expected = requireEnv("ADMIN_SECRET");
  const actual = event.headers["x-admin-secret"] || event.headers["X-Admin-Secret"];
  return actual && actual === expected;
}

export function checkProduct(license, requestedProduct) {
  const licenseProduct = normalizeProduct(license.product || DEFAULT_PRODUCT);
  const product = normalizeProduct(requestedProduct || DEFAULT_PRODUCT);
  return licenseProduct === product;
}
