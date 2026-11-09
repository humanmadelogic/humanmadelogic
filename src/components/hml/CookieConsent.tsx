'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  acceptAll,
  readConsent,
  rejectNonEssential,
  savePreferences,
  type ConsentState,
} from '@/lib/cookie-consent';

export function CookieConsent() {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const sync = useCallback(() => {
    const state = readConsent();
    setConsent(state);
    setAnalytics(state.analytics);
    setMarketing(state.marketing);
  }, []);

  useEffect(() => {
    sync();
    const onChange = () => sync();
    window.addEventListener('hml-consent-change', onChange);
    return () => window.removeEventListener('hml-consent-change', onChange);
  }, [sync]);

  useEffect(() => {
    if (!manageOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [manageOpen]);

  if (consent === null) return null;

  const showBanner = !consent.decided;

  const closeManage = () => {
    setManageOpen(false);
    dialogRef.current?.close();
  };

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="pointer-events-auto fixed inset-x-0 bottom-0 z-[70] border-t border-obsidian/15 bg-paper/95 p-5 shadow-[0_-12px_40px_-16px_rgba(21,21,21,0.35)] backdrop-blur-md sm:p-6"
        >
          <div className="mx-auto flex max-w-editorial flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[62ch]">
              <h2 id={titleId} className="text-[18px] font-medium tracking-[-0.02em]">
                Cookies and privacy
              </h2>
              <p className="mt-2 text-[15px] leading-[1.6] text-slate">
                We use essential cookies to run the site. Analytics and marketing tools load only if you allow them. See
                our{' '}
                <Link href="/cookies" className="underline underline-offset-4">
                  Cookie policy
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="underline underline-offset-4">
                  Privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setManageOpen(true)}
                className="inline-flex h-11 items-center rounded-full border border-obsidian/20 px-5 text-[14px] transition-colors hover:border-obsidian/45"
              >
                Manage options
              </button>
              <button
                type="button"
                onClick={() => setConsent(rejectNonEssential())}
                className="inline-flex h-11 items-center rounded-full border border-obsidian/20 px-5 text-[14px] transition-colors hover:border-obsidian/45"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => setConsent(acceptAll())}
                className="inline-flex h-11 items-center rounded-full bg-obsidian px-5 text-[14px] font-medium text-paper transition-colors hover:bg-obsidian/85"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {!showBanner && (
        <button
          type="button"
          onClick={() => setManageOpen(true)}
          className="pointer-events-auto fixed bottom-4 left-4 z-[60] rounded-full border border-obsidian/15 bg-paper/90 px-4 py-2 text-[13px] text-slate shadow-md backdrop-blur hover:text-obsidian"
        >
          Cookie settings
        </button>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={`${titleId}-manage`}
        className="max-h-[90vh] w-[min(520px,calc(100vw-2rem))] rounded-[16px] border border-obsidian/15 bg-paper p-0 text-obsidian shadow-2xl backdrop:bg-obsidian/40 open:flex open:flex-col"
        onClose={() => setManageOpen(false)}
      >
        <div className="flex max-h-[90vh] flex-col">
          <div className="border-b border-obsidian/10 px-6 py-5">
            <h2 id={`${titleId}-manage`} className="text-[20px] tracking-[-0.02em]">
              Cookie preferences
            </h2>
            <p className="mt-2 text-[14px] leading-[1.55] text-slate">
              Essential cookies are always on. Choose whether we may load analytics or marketing technologies.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <fieldset className="space-y-6 border-0 p-0">
              <legend className="sr-only">Cookie categories</legend>

              <div className="rounded-[12px] border border-obsidian/10 p-4">
                <p className="text-[15px] font-medium">Strictly necessary</p>
                <p className="mt-1 text-[14px] text-slate">Required for security, consent storage and core site features.</p>
                <p className="mt-2 text-[13px] text-slate">Always active</p>
              </div>

              <label className="flex cursor-pointer gap-4 rounded-[12px] border border-obsidian/10 p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-obsidian"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
                <span>
                  <span className="block text-[15px] font-medium">Analytics</span>
                  <span className="mt-1 block text-[14px] text-slate">
                    Helps us understand traffic and improve the site. Loaded only after you opt in.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer gap-4 rounded-[12px] border border-obsidian/10 p-4">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-obsidian"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                />
                <span>
                  <span className="block text-[15px] font-medium">Marketing</span>
                  <span className="mt-1 block text-[14px] text-slate">
                    Reserved for future pixels or remarketing tags. Not loaded until you opt in.
                  </span>
                </span>
              </label>
            </fieldset>
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t border-obsidian/10 px-6 py-4">
            <button
              type="button"
              onClick={closeManage}
              className="inline-flex h-10 items-center rounded-full border border-obsidian/20 px-4 text-[14px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setConsent(rejectNonEssential());
                closeManage();
              }}
              className="inline-flex h-10 items-center rounded-full border border-obsidian/20 px-4 text-[14px]"
            >
              Reject non-essential
            </button>
            <button
              type="button"
              onClick={() => {
                setConsent(savePreferences(analytics, marketing));
                closeManage();
              }}
              className="inline-flex h-10 items-center rounded-full bg-obsidian px-4 text-[14px] font-medium text-paper"
            >
              Save preferences
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
