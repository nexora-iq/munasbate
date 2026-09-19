import { createClient } from "@supabase/supabase-js";
import type { Config, Context } from "@netlify/functions";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing SUPABASE_URL environment variable",
  );
}

if (!supabaseSecretKey) {
  throw new Error(
    "Missing SUPABASE_SECRET_KEY environment variable",
  );
}

const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);

function cleanText(
  value: unknown,
  maxLength = 500,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value
    .replace(
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
      "",
    )
    .trim();

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, maxLength);
}

function cleanIdentifier(
  value: unknown,
): string | null {
  return cleanText(value, 200);
}

function roundGeoCoordinate(
  value: unknown,
): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return Math.round(value * 10000) / 10000;
}

function detectIpVersion(
  ip: string,
): number | null {
  if (ip.includes(":")) {
    return 6;
  }

  if (
    /^\d{1,3}(\.\d{1,3}){3}$/.test(ip)
  ) {
    return 4;
  }

  return null;
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        "content-type":
          "application/json; charset=utf-8",
        "cache-control": "no-store",
        "x-content-type-options": "nosniff",
      },
    },
  );
}

export default async (
  request: Request,
  context: Context,
): Promise<Response> => {
  /*
   * هذا المسار يقبل POST فقط.
   */
  if (request.method !== "POST") {
    return jsonResponse(
      {
        ok: false,
        message: "Method not allowed",
      },
      405,
    );
  }

  let body: Record<string, unknown> = {};

  try {
    const parsed = await request.json();

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      body = parsed as Record<string, unknown>;
    }
  } catch {
    body = {};
  }

  /*
   * ----------------------------------------------------------
   * بيانات الإدخال
   * ----------------------------------------------------------
   */

  const identifier = cleanIdentifier(
    body.identifier,
  );

  /*
   * لا نستقبل كلمة المرور نفسها.
   * فقط نسجل هل كان هناك إدخال.
   */
  const passwordPresent =
    body.passwordPresent === true;

  /*
   * الحقل المخفي.
   */
  const decoyFieldValue = cleanText(
    body.website,
    200,
  );

  /*
   * ----------------------------------------------------------
   * IP الحقيقي من Netlify Context
   * ----------------------------------------------------------
   *
   * هذا هو المصدر الأساسي للـIP.
   */
  const ipAddress =
    cleanText(context.ip, 100);

  if (!ipAddress) {
    return jsonResponse({
      ok: true,
    });
  }

  const ipVersion =
    detectIpVersion(ipAddress);

  /*
   * ----------------------------------------------------------
   * بيانات الطلب والمتصفح
   * ----------------------------------------------------------
   */

  const userAgent = cleanText(
    request.headers.get("user-agent"),
    1000,
  );

  const acceptLanguage = cleanText(
    request.headers.get("accept-language"),
    300,
  );

  const referer = cleanText(
    request.headers.get("referer"),
    1000,
  );

  const host = cleanText(
    request.headers.get("host"),
    300,
  );

  const forwardedProto = cleanText(
    request.headers.get("x-forwarded-proto"),
    50,
  );

  /*
   * سلسلة البروكسيات إن كانت موجودة.
   *
   * لا نعتمد عليها لتحديد هوية العميل.
   * الـIP المعتمد يبقى context.ip.
   */
  const forwardedForChain = cleanText(
    request.headers.get("x-forwarded-for"),
    2000,
  );

  /*
   * بعض البروكسيات قد تضيف هذه الرؤوس.
   * نسجل فقط وجودها/قيمتها التشخيصية،
   * وليس على أساس أنها مصدر موثوق لهوية المستخدم.
   */
  const realIpHeader = cleanText(
    request.headers.get("x-real-ip"),
    200,
  );

  const cfConnectingIp = cleanText(
    request.headers.get("cf-connecting-ip"),
    200,
  );

  const trueClientIp = cleanText(
    request.headers.get("true-client-ip"),
    200,
  );

  const requestUrl = cleanText(
    request.url,
    1500,
  );

  const requestId = cleanText(
    context.requestId,
    100,
  );

  const pathname =
    new URL(request.url).pathname;

  /*
   * ----------------------------------------------------------
   * الموقع التقريبي - Netlify GeoIP
   * ----------------------------------------------------------
   *
   * لا نستخدم GPS.
   */
  const country =
    cleanText(
      context.geo?.country?.name,
      150,
    );

  const countryCode =
    cleanText(
      context.geo?.country?.code,
      20,
    );

  const city =
    cleanText(
      context.geo?.city,
      150,
    );

  const region =
    cleanText(
      context.geo?.subdivision?.name,
      150,
    );

  const regionCode =
    cleanText(
      context.geo?.subdivision?.code,
      30,
    );

  const timezone =
    cleanText(
      context.geo?.timezone,
      100,
    );

  const postalCode =
    cleanText(
      context.geo?.postalCode,
      40,
    );

  /*
   * نخزن الإحداثيات بشكل تقريبي إلى 4 منازل عشرية.
   */
  const geoLatitude =
    roundGeoCoordinate(
      context.geo?.latitude,
    );

  const geoLongitude =
    roundGeoCoordinate(
      context.geo?.longitude,
    );

  /*
   * منطقة تشغيل Netlify،
   * وهي منطقة السيرفر وليست موقع الزائر.
   */
  const serverRegion =
    cleanText(
      context.server?.region,
      100,
    );

  /*
   * هل توجد رؤوس بروكسي تشخيصية؟
   */
  const proxyHeadersPresent =
    !!forwardedForChain ||
    !!realIpHeader ||
    !!cfConnectingIp ||
    !!trueClientIp;

  /*
   * ----------------------------------------------------------
   * تصنيف الحدث
   * ----------------------------------------------------------
   */

  const eventType =
    decoyFieldValue
      ? "suspicious_access"
      : "admin_access";

  /*
   * ----------------------------------------------------------
   * حماية من الإغراق السريع
   * ----------------------------------------------------------
   */

  try {
    const cutoff = new Date(
      Date.now() - 5 * 60 * 1000,
    ).toISOString();

    const { count, error: rateError } =
      await supabaseAdmin
        .from("security_access_events")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq(
          "ip_address",
          ipAddress,
        )
        .gte(
          "created_at",
          cutoff,
        );

    if (!rateError && (count ?? 0) >= 20) {
      return jsonResponse({
        ok: true,
      });
    }
  } catch {
    /*
     * فشل فحص الحد لا يمنع تسجيل الحدث.
     */
  }

  /*
   * ----------------------------------------------------------
   * Metadata
   * ----------------------------------------------------------
   */

  const metadata = {
    geo_available:
      !!context.geo,

    geo_latitude:
      geoLatitude,

    geo_longitude:
      geoLongitude,

    postal_code:
      postalCode,

    ip_version:
      ipVersion,

    server_region:
      serverRegion,

    proxy_headers_present:
      proxyHeadersPresent,

    query:
      new URL(request.url).search || null,

    pathname,

    netlify_request_id:
      requestId,

    password_present:
      passwordPresent,

    decoy_field_present:
      !!decoyFieldValue,

    /*
     * قيم تشخيصية فقط.
     * لا نستخدمها بدلاً من context.ip.
     */
    real_ip_header:
      realIpHeader,

    cf_connecting_ip:
      cfConnectingIp,

    true_client_ip:
      trueClientIp,
  };

  /*
   * ----------------------------------------------------------
   * تسجيل الحدث
   * ----------------------------------------------------------
   */

  const { error } =
    await supabaseAdmin
      .from("security_access_events")
      .insert({
        event_type:
          eventType,

        ip_address:
          ipAddress,

        country,
        country_code:
          countryCode,

        city,
        region,
        region_code:
          regionCode,

        timezone,

        forwarded_for_chain:
          forwardedForChain,

        geo_latitude:
          geoLatitude,

        geo_longitude:
          geoLongitude,

        postal_code:
          postalCode,

        ip_version:
          ipVersion,

        server_region:
          serverRegion,

        proxy_headers_present:
          proxyHeadersPresent,

        user_agent:
          userAgent,

        accept_language:
          acceptLanguage,

        referer,

        host,

        forwarded_proto:
          forwardedProto,

        path:
          pathname,

        method:
          request.method,

        request_url:
          requestUrl,

        request_id:
          requestId,

        attempted_identifier:
          identifier,

        password_present:
          passwordPresent,

        decoy_field_present:
          !!decoyFieldValue,

        metadata,
      });

  /*
   * لا نكشف خطأ قاعدة البيانات للزائر.
   */
  if (error) {
    console.error(
      "Security event storage failed",
      error.message,
    );

    return jsonResponse({
      ok: true,
    });
  }

  return jsonResponse({
    ok: true,
  });
};

export const config: Config = {
  path: "/api/security/access",
  method: "POST",
};