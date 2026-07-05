import { response, checkAdmin, getLicenseStore, DEFAULT_PRODUCT } from "./license-lib.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return response(200, { ok: true });
  if (event.httpMethod !== "POST") return response(405, { ok: false, error: "METHOD_NOT_ALLOWED" });
  try {
    if (!checkAdmin(event)) return response(401, { ok: false, error: "UNAUTHORIZED_ADMIN" });
    const store = getLicenseStore();
    const { blobs } = await store.list({ prefix: "licenses/" });
    const licenses = [];
    for (const blob of blobs) {
      const item = await store.get(blob.key, { type: "json" });
      if (item) licenses.push({
        key: blob.key,
        product: item.product || DEFAULT_PRODUCT,
        status: item.status,
        customer: item.customer,
        nip: item.nip,
        max_devices: item.max_devices,
        expires_at: item.expires_at,
        device_count: Array.isArray(item.devices) ? item.devices.length : 0,
        devices: (item.devices || []).map(d => ({ device_id_tail: String(d.device_id || "").slice(-8), activated_at: d.activated_at, last_seen_at: d.last_seen_at, app_version: d.app_version })),
        note: item.note || ""
      });
    }
    return response(200, { ok: true, licenses });
  } catch (err) { return response(500, { ok: false, error: "SERVER_ERROR", details: String(err.message || err) }); }
}
