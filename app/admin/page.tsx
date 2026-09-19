"use client";

import { FormEvent, useState } from "react";

export default function AdminPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setStatus("جاري التحقق من بيانات الدخول...");

    try {
      /*
       * لا نرسل كلمة المرور نفسها.
       * نرسل فقط هل تم إدخال كلمة مرور أم لا.
       */
      const response = await fetch(
        "/api/security/access",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            identifier:
              identifier.trim(),

            passwordPresent:
              password.length > 0,

            website,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          "Request failed",
        );
      }

      /*
       * تنظيف كلمة المرور من الذاكرة
       * بعد انتهاء الطلب.
       */
      setPassword("");

      setStatus(
        "جاري التحقق من الحساب، يرجى الانتظار...",
      );
    } catch {
      setStatus(
        "تعذر إكمال عملية تسجيل الدخول حاليًا.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#070b12] text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize:
              "42px 42px",
          }}
        />
      </div>

      <div className="relative min-h-screen flex">
        {/* ================================================= */}
        {/* Desktop Sidebar */}
        {/* ================================================= */}

        <aside className="hidden w-[280px] shrink-0 border-l border-white/8 bg-[#0b111a]/95 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="border-b border-white/8 px-7 py-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src="/logo.png"
                  alt="مناسباتي"
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div>
                <div className="text-lg font-black">
                  مناسباتي
                </div>

                <div className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-slate-600">
                  ADMINISTRATION SYSTEM
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6">
            <div className="mb-3 px-3 text-[10px] font-black tracking-[0.18em] text-slate-600">
              الإدارة
            </div>

            <div className="space-y-1.5">
              <SidebarItem
                icon="▦"
                label="لوحة التحكم"
                active
              />

              <SidebarItem
                icon="◫"
                label="الحجوزات"
              />

              <SidebarItem
                icon="⌂"
                label="القاعات"
              />

              <SidebarItem
                icon="◉"
                label="المستخدمون"
              />

              <SidebarItem
                icon="◌"
                label="الإشعارات"
              />
            </div>

            <div className="my-7 h-px bg-white/6" />

            <div className="mb-3 px-3 text-[10px] font-black tracking-[0.18em] text-slate-600">
              النظام
            </div>

            <div className="space-y-1.5">
              <SidebarItem
                icon="⚙"
                label="الإعدادات"
              />

              <SidebarItem
                icon="◈"
                label="سجل النظام"
              />
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.05] p-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                </span>

                <div>
                  <div className="text-xs font-black text-emerald-300">
                    النظام متصل
                  </div>

                  <div className="mt-1 text-[10px] text-slate-500">
                    Secure connection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ================================================= */}
        {/* Main */}
        {/* ================================================= */}

        <section className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="border-b border-white/8 bg-[#0a1018]/85 backdrop-blur-xl">
            <div className="flex min-h-[78px] items-center justify-between px-5 py-4 sm:px-8">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  النظام الإداري
                </div>

                <div className="mt-1 text-lg font-black sm:text-xl">
                  تسجيل الدخول
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 sm:flex">
                  <span className="text-[11px] text-slate-500">
                    حالة النظام
                  </span>

                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-sm text-slate-400">
                  🔔
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
            <div className="w-full max-w-6xl">
              {/* Mobile brand */}
              <div className="mb-8 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <img
                      src="/logo.png"
                      alt="مناسباتي"
                      className="h-8 w-8 object-contain"
                    />
                  </div>

                  <div>
                    <div className="text-base font-black">
                      مناسباتي
                    </div>

                    <div className="text-[9px] font-bold tracking-wider text-slate-600">
                      ADMIN SYSTEM
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.05fr_460px] lg:items-center">
                {/* Information */}
                <div className="hidden lg:block">
                  <div className="max-w-xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/15 bg-sky-400/[0.06] px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,.8)]" />

                      <span className="text-[11px] font-black tracking-wide text-sky-300">
                        ADMIN CONTROL CENTER
                      </span>
                    </div>

                    <h1 className="text-4xl font-black leading-[1.15] xl:text-5xl">
                      إدارة منصة
                      <span className="block bg-gradient-to-l from-sky-300 to-cyan-400 bg-clip-text text-transparent">
                        مناسباتي
                      </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400">
                      الوصول إلى النظام الإداري المركزي
                      لإدارة القاعات والحجوزات والمستخدمين
                      والخدمات المرتبطة بمنصة مناسباتي.
                    </p>

                    <div className="mt-10 grid max-w-lg grid-cols-2 gap-3">
                      <InfoCard
                        title="حماية النظام"
                        value="مفعّلة"
                        icon="◈"
                      />

                      <InfoCard
                        title="الاتصال"
                        value="آمن"
                        icon="⌁"
                      />

                      <InfoCard
                        title="الخادم"
                        value="Online"
                        icon="◉"
                      />

                      <InfoCard
                        title="الوصول"
                        value="Restricted"
                        icon="◆"
                      />
                    </div>
                  </div>
                </div>

                {/* Login */}
                <div className="w-full">
                  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0d141e]/95 shadow-[0_35px_100px_rgba(0,0,0,.45)] backdrop-blur-2xl">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-sky-400/80 to-transparent" />

                    <div className="p-6 sm:p-8">
                      {/* Heading */}
                      <div className="mb-8">
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/15 bg-sky-400/[0.08] text-xl">
                            🔐
                          </div>

                          <div className="rounded-lg border border-emerald-400/10 bg-emerald-400/[0.05] px-2.5 py-1.5 text-[9px] font-black text-emerald-300">
                            SECURE LOGIN
                          </div>
                        </div>

                        <h2 className="text-2xl font-black">
                          مرحبًا بعودتك
                        </h2>

                        <p className="mt-2 text-xs leading-6 text-slate-500">
                          أدخل بيانات الحساب للوصول إلى لوحة التحكم.
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        {/* Identifier */}
                        <div>
                          <label
                            htmlFor="identifier"
                            className="mb-2.5 block text-xs font-black text-slate-300"
                          >
                            البريد الإلكتروني أو اسم المستخدم
                          </label>

                          <div className="relative">
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                              ◉
                            </span>

                            <input
                              id="identifier"
                              name="identifier"
                              type="text"
                              autoComplete="username"
                              value={identifier}
                              onChange={(event) =>
                                setIdentifier(
                                  event.target.value,
                                )
                              }
                              maxLength={200}
                              required
                              placeholder="أدخل بيانات الدخول"
                              className="h-14 w-full rounded-2xl border border-white/8 bg-[#080d14] pr-11 pl-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-sky-400/30 focus:bg-[#0a111a] focus:ring-4 focus:ring-sky-400/5"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div>
                          <label
                            htmlFor="password"
                            className="mb-2.5 block text-xs font-black text-slate-300"
                          >
                            كلمة المرور
                          </label>

                          <div className="relative">
                            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                              ●
                            </span>

                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              value={password}
                              onChange={(event) =>
                                setPassword(
                                  event.target.value,
                                )
                              }
                              maxLength={500}
                              required
                              placeholder="أدخل كلمة المرور"
                              className="h-14 w-full rounded-2xl border border-white/8 bg-[#080d14] pr-11 pl-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-sky-400/30 focus:bg-[#0a111a] focus:ring-4 focus:ring-sky-400/5"
                            />
                          </div>
                        </div>

                        {/* Hidden field */}
                        <div
                          aria-hidden="true"
                          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                        >
                          <label htmlFor="website">
                            Website
                          </label>

                          <input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(event) =>
                              setWebsite(
                                event.target.value,
                              )
                            }
                          />
                        </div>

                        {/* Security info */}
                        <div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/10 text-xs text-emerald-300">
                              ✓
                            </span>

                            <span className="text-[10px] font-bold text-slate-500">
                              جلسة آمنة
                            </span>
                          </div>

                          <span className="text-[9px] font-bold tracking-wider text-slate-700">
                            HTTPS
                          </span>
                        </div>

                        {/* Button */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-l from-sky-500 to-cyan-400 font-black text-white shadow-[0_12px_30px_rgba(14,165,233,.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(14,165,233,.25)] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {loading ? (
                              <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                جاري التحقق...
                              </>
                            ) : (
                              <>
                                تسجيل الدخول

                                <span className="text-lg transition-transform group-hover:-translate-x-1">
                                  ←
                                </span>
                              </>
                            )}
                          </span>

                          <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                        </button>
                      </form>

                      {/* Status */}
                      {status && (
                        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-sky-400/10 bg-sky-400/[0.04] px-4 py-3.5">
                          <span className="mt-0.5 text-xs text-sky-300">
                            ●
                          </span>

                          <p className="text-[11px] font-semibold leading-6 text-slate-400">
                            {status}
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-7 flex items-center justify-between border-t border-white/6 pt-5">
                        <span className="text-[9px] font-bold text-slate-700">
                          Munasabati Admin
                        </span>

                        <span className="text-[9px] font-bold text-slate-700">
                          v1.0
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-[10px] font-semibold text-slate-700">
                      هذه المنطقة مخصصة للمستخدمين المصرح لهم
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-white/6 bg-[#080d14]/60">
            <div className="flex min-h-[48px] items-center justify-center px-5 text-center">
              <span className="text-[9px] font-semibold text-slate-700">
                © 2026 Munasabati — Administration Control Center
              </span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "flex h-12 items-center gap-3 rounded-xl px-4 transition",
        active
          ? "border border-sky-400/10 bg-sky-400/[0.07] text-sky-300"
          : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300",
      ].join(" ")}
    >
      <span className="w-5 text-center text-sm">
        {icon}
      </span>

      <span className="text-xs font-bold">
        {label}
      </span>
    </div>
  );
}

function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-white/7 bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] font-bold text-slate-600">
          {title}
        </span>

        <span className="text-xs text-slate-600">
          {icon}
        </span>
      </div>

      <div className="text-xs font-black text-slate-300">
        {value}
      </div>
    </div>
  );
}