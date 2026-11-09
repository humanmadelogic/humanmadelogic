export type ConsentCategory = 'essential' | 'analytics' | 'marketing';

export type ConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
};

const STORAGE_KEY = 'hml-cookie-consent-v1';

const defaultState: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  decided: false,
};

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      decided: Boolean(parsed.decided),
    };
  } catch {
    return defaultState;
  }
}

export function writeConsent(state: Omit<ConsentState, 'essential'>): ConsentState {
  const next: ConsentState = { essential: true, analytics: state.analytics, marketing: state.marketing, decided: true };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('hml-consent-change', { detail: next }));
  }
  return next;
}

export function acceptAll(): ConsentState {
  return writeConsent({ analytics: true, marketing: true, decided: true });
}

export function rejectNonEssential(): ConsentState {
  return writeConsent({ analytics: false, marketing: false, decided: true });
}

export function savePreferences(analytics: boolean, marketing: boolean): ConsentState {
  return writeConsent({ analytics, marketing, decided: true });
}
