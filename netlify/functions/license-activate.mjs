import { response, parseBody, normalizeLicenseKey, normalizeNip, machineHash, storageKeyForLicense, getLicenseStore, isExpired, sanitizePublicLicense } from "./license-lib.mjs";
export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return response(200, { ok: true });
  if (event.httpMethod !== "POST") return response(405, { ok: false, error: "METHOD_NOT_ALLOWED" });
  try {
    const body = await parseBody(event);
    const licenseKey = normalizeLicenseKey(body.license_key);
    const machineId = String(body.machine_id || "").trim();
    const nip = normalizeNip(body.nip);
    const appVersion = String(body.app_version || "");
    if (!licenseKey) return response(400, { ok: false, error: "LICENSE_KEY_REQUIRED" });
    if (!machineId) return response(400, { ok: false, error: "MACHINE_ID_REQUIRED" });
    const store = getLicenseStore();
    const key = storageKeyForLicense(licenseKey);
    const license = await store.get(key, { type: "json" });
    if (!license) return response(404, { ok: false, error: "LICENSE_NOT_FOUND" });
    if (license.status !== "active") return response(403, { ok: false, error: "LICENSE_INACTIVE" });
    if (isExpired(license.expires_at)) return response(403, { ok: false, error: "LICENSE_EXPIRED", expires_at: license.expires_at });
    if (license.nip && nip && license.nip !== nip) return response(403, { ok: false, error: "NIP_MISMATCH", expected_nip: license.nip });
    const deviceId = machineHash(machineId);
    const now = new Date().toISOString();
    license.devices = Array.isArray(license.devices) ? license.devices : [];
    const existing = license.devices.find(d => d.device_id === deviceId);
    if (existing) { existing.last_seen_at = now; existing.app_version = appVersion; }
    else {
      const maxDevices = Number(license.max_devices || 1);
      if (license.devices.length >= maxDevices) return response(403, { ok: false, error: "LIMIT_DEVICES_EXCEEDED", max_devices: maxDevices, device_count: license.devices.length });
      license.devices.push({ device_id: deviceId, activated_at: now, last_seen_at: now, app_version: appVersion });
    }
    license.updated_at = now;
    await store.setJSON(key, license);
    return response(200, { ok: true, message: "LICENSE_ACTIVE", license: sanitizePublicLicense(license) });
  } catch (err) { return response(500, { ok: false, error: "SERVER_ERROR", details: String(err.message || err) }); }
}
