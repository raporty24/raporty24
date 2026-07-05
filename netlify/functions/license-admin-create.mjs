import { response, parseBody, checkAdmin, normalizeLicenseKey, normalizeNip, normalizeProduct, storageKeyForLicense, getLicenseStore } from "./license-lib.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return response(200, { ok: true });
  if (event.httpMethod !== "POST") return response(405, { ok: false, error: "METHOD_NOT_ALLOWED" });
  try {
    if (!checkAdmin(event)) return response(401, { ok: false, error: "UNAUTHORIZED_ADMIN" });
    const body = await parseBody(event);
    const licenseKey = normalizeLicenseKey(body.license_key);
    if (!licenseKey) return response(400, { ok: false, error: "LICENSE_KEY_REQUIRED" });
    const now = new Date().toISOString();
    const license = {
      status: body.status || "active",
      product: normalizeProduct(body.product),
      customer: String(body.customer || ""),
      nip: normalizeNip(body.nip),
      max_devices: Number(body.max_devices || 1),
      expires_at: body.expires_at || null,
      offline_days: Number(body.offline_days || 7),
      note: String(body.note || ""),
      license_key_tail: licenseKey.slice(-9),
      devices: [],
      created_at: now,
      updated_at: now
    };
    const store = getLicenseStore();
    await store.setJSON(storageKeyForLicense(licenseKey), license);
    return response(200, { ok: true, message: "LICENSE_CREATED", product: license.product, license_key_tail: license.license_key_tail, customer: license.customer, nip: license.nip, max_devices: license.max_devices, expires_at: license.expires_at });
  } catch (err) {
    return response(500, { ok: false, error: "SERVER_ERROR", details: String(err.message || err) });
  }
}
