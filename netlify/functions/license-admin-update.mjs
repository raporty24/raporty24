import {
  response,
  parseBody,
  checkAdmin,
  normalizeLicenseKey,
  normalizeNip,
  normalizeProduct,
  storageKeyForLicense,
  getLicenseStore
} from "./license-lib.mjs";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return response(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return response(405, {
      ok: false,
      error: "METHOD_NOT_ALLOWED"
    });
  }

  try {
    if (!checkAdmin(event)) {
      return response(401, {
        ok: false,
        error: "UNAUTHORIZED_ADMIN"
      });
    }

    const body = await parseBody(event);
    const licenseKey = normalizeLicenseKey(body.license_key);

    if (!licenseKey) {
      return response(400, {
        ok: false,
        error: "LICENSE_KEY_REQUIRED"
      });
    }

    const store = getLicenseStore();
    const key = storageKeyForLicense(licenseKey);

    const license = await store.get(key, {
      type: "json"
    });

    if (!license) {
      return response(404, {
        ok: false,
        error: "LICENSE_NOT_FOUND"
      });
    }

    // Zmieniamy tylko pola podane w zapytaniu.
    // Nie kasujemy devices ani created_at.

    if (Object.prototype.hasOwnProperty.call(body, "status")) {
      license.status =
        String(body.status || "").trim() || license.status;
    }

    if (Object.prototype.hasOwnProperty.call(body, "product")) {
      license.product = normalizeProduct(body.product);
    }

    if (Object.prototype.hasOwnProperty.call(body, "customer")) {
      license.customer = String(body.customer || "");
    }

    if (Object.prototype.hasOwnProperty.call(body, "nip")) {
      license.nip = normalizeNip(body.nip);
    }

    if (Object.prototype.hasOwnProperty.call(body, "max_devices")) {
      const maxDevices = Number(body.max_devices);

      if (!Number.isFinite(maxDevices) || maxDevices < 1) {
        return response(400, {
          ok: false,
          error: "INVALID_MAX_DEVICES"
        });
      }

      license.max_devices = Math.floor(maxDevices);
    }

    if (Object.prototype.hasOwnProperty.call(body, "expires_at")) {
      const expiresAt = body.expires_at;

      // null albo pusty string = licencja bez daty końcowej
      if (expiresAt === null || expiresAt === "") {
        license.expires_at = null;
      } else {
        const value = String(expiresAt).trim();

        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return response(400, {
            ok: false,
            error: "INVALID_EXPIRES_AT",
            details: "Użyj formatu YYYY-MM-DD."
          });
        }

        license.expires_at = value;
      }
    }

    if (Object.prototype.hasOwnProperty.call(body, "offline_days")) {
      const offlineDays = Number(body.offline_days);

      if (
        !Number.isFinite(offlineDays) ||
        offlineDays < 0 ||
        offlineDays > 365
      ) {
        return response(400, {
          ok: false,
          error: "INVALID_OFFLINE_DAYS"
        });
      }

      license.offline_days = Math.floor(offlineDays);
    }

    if (Object.prototype.hasOwnProperty.call(body, "note")) {
      license.note = String(body.note || "");
    }

    license.updated_at = new Date().toISOString();

    await store.setJSON(key, license);

    return response(200, {
      ok: true,
      message: "LICENSE_UPDATED",
      license: {
        status: license.status,
        product: license.product,
        customer: license.customer,
        nip: license.nip,
        max_devices: license.max_devices,
        expires_at: license.expires_at,
        offline_days: license.offline_days,
        device_count: Array.isArray(license.devices)
          ? license.devices.length
          : 0,
        note: license.note || "",
        updated_at: license.updated_at
      }
    });
  } catch (err) {
    return response(500, {
      ok: false,
      error: "SERVER_ERROR",
      details: String(err.message || err)
    });
  }
}