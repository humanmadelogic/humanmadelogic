'use client';

import { useState, type ReactNode } from 'react';
import { CopyRichText } from '@/lib/hml/copyRichText';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import {
  AVC_MARKET_OPTIONS,
  validateAiVisibilityCheck,
  type AiVisibilityCheckErrors,
  type AiVisibilityCheckFields,
} from '@/lib/aiVisibilityCheck';

const copy = loadCopyMap('ai-visibility-check.json');
const TOPIC = copy['AVC-FORM-TOPIC'] || 'Free AI visibility check';

const fieldClass = (invalid: boolean) =>
  [
    'w-full min-h-12 rounded-[10px] border bg-paper px-3.5 text-base tracking-tight text-obsidian sm:text-[15px]',
    'placeholder:text-slate transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-obsidian/70 focus:ring-offset-2 focus:ring-offset-paper',
    invalid
      ? 'border-[#b4442e] focus:ring-[#b4442e]/70'
      : 'border-obsidian/20 hover:border-obsidian/40 focus:border-obsidian/50',
  ].join(' ');

function emptyFields(): AiVisibilityCheckFields {
  return {
    name: '',
    email: '',
    brand: '',
    websiteUrl: '',
    markets: [],
    cityOrArea: '',
    competitors: '',
    priority: '',
    seeds: '',
    source: '',
    gbpUrl: '',
    topic: TOPIC,
    servicesFollowUpOptIn: false,
  };
}

export function AiVisibilityCheckForm() {
  const [values, setValues] = useState<AiVisibilityCheckFields>(() => emptyFields());
  const [errors, setErrors] = useState<AiVisibilityCheckErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof AiVisibilityCheckFields, boolean>>>({});
  const [companyFax, setCompanyFax] = useState('');
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const update = <K extends keyof AiVisibilityCheckFields>(key: K, value: AiVisibilityCheckFields[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateAiVisibilityCheck(next));
  };

  const blur = (key: keyof AiVisibilityCheckFields) => {
    setTouched((previous) => ({ ...previous, [key]: true }));
    setErrors(validateAiVisibilityCheck(values));
  };

  const toggleMarket = (market: string) => {
    const nextMarkets = values.markets.includes(market)
      ? values.markets.filter((m) => m !== market)
      : [...values.markets, market];
    update('markets', nextMarkets);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAiVisibilityCheck(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      brand: true,
      websiteUrl: true,
      markets: true,
      competitors: true,
      priority: true,
    });
    setServerError('');
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    try {
      const response = await fetch('/api/ai-visibility-check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, companyFax }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        errors?: AiVisibilityCheckErrors;
      };
      if (!response.ok || !payload.ok) {
        if (payload.errors) setErrors(payload.errors);
        setServerError(payload.error || 'We could not send that just now. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError('We could not send that just now. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="border border-obsidian/10 bg-paper px-6 py-10 sm:px-8">
        <span aria-hidden="true" className="inline-block h-[9px] w-[9px] rounded-full bg-signalYellow" />
        <h3 className="mt-6 text-[28px] leading-[1.08] tracking-[-0.04em] sm:text-[32px]">{copy['AVC-THANKS-TITLE']}</h3>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-slate">{copy['AVC-THANKS-BODY']}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <input
        type="text"
        name="company_fax"
        value={companyFax}
        onChange={(event) => setCompanyFax(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="pointer-events-none absolute left-[-9999px] h-px w-px opacity-0"
        aria-hidden="true"
      />

      <FormField label={copy['AVC-FORM-NAME']} id="avc-name" required error={errors.name}>
        <input
          id="avc-name"
          name="name"
          required
          autoComplete="name"
          className={fieldClass(Boolean(errors.name && touched.name))}
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          onBlur={() => blur('name')}
        />
      </FormField>

      <FormField label={copy['AVC-FORM-EMAIL']} id="avc-email" required error={errors.email}>
        <input
          id="avc-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={fieldClass(Boolean(errors.email && touched.email))}
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          onBlur={() => blur('email')}
        />
      </FormField>

      <FormField label={copy['AVC-FORM-BRAND']} id="avc-brand" required error={errors.brand}>
        <input
          id="avc-brand"
          name="brand"
          required
          autoComplete="organization"
          className={fieldClass(Boolean(errors.brand && touched.brand))}
          value={values.brand}
          onChange={(e) => update('brand', e.target.value)}
          onBlur={() => blur('brand')}
        />
      </FormField>

      <FormField label={copy['AVC-FORM-URL']} id="avc-url" required error={errors.websiteUrl}>
        <input
          id="avc-url"
          name="websiteUrl"
          type="url"
          required
          autoComplete="url"
          placeholder="https://"
          className={fieldClass(Boolean(errors.websiteUrl && touched.websiteUrl))}
          value={values.websiteUrl}
          onChange={(e) => update('websiteUrl', e.target.value)}
          onBlur={() => blur('websiteUrl')}
        />
      </FormField>

      <fieldset className="space-y-3">
        <legend className="text-[15px] font-medium text-obsidian">
          {copy['AVC-FORM-MARKETS']}
          <span className="text-slate"> (required)</span>
        </legend>
        <p className="text-[14px] leading-[1.55] text-slate">{copy['AVC-FORM-MARKETS-HELP']}</p>
        <div className="flex flex-wrap gap-3">
          {AVC_MARKET_OPTIONS.map((market) => (
            <label key={market} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[15px]">
              <input
                type="checkbox"
                checked={values.markets.includes(market)}
                onChange={() => toggleMarket(market)}
                className="h-4 w-4 rounded border-obsidian/30"
              />
              {market}
            </label>
          ))}
        </div>
        {errors.markets && touched.markets ? (
          <p className="text-[14px] text-[#b4442e]" role="alert">
            {errors.markets}
          </p>
        ) : null}
        <input
          id="avc-city"
          name="cityOrArea"
          placeholder="City or area (local businesses)"
          className={fieldClass(false)}
          value={values.cityOrArea}
          onChange={(e) => update('cityOrArea', e.target.value)}
        />
      </fieldset>

      <FormField
        label={copy['AVC-FORM-COMPETITORS']}
        id="avc-competitors"
        required
        help={copy['AVC-FORM-COMPETITORS-HELP']}
        error={errors.competitors}
      >
        <textarea
          id="avc-competitors"
          name="competitors"
          required
          rows={3}
          className={`${fieldClass(Boolean(errors.competitors && touched.competitors))} min-h-[88px] py-3`}
          value={values.competitors}
          onChange={(e) => update('competitors', e.target.value)}
          onBlur={() => blur('competitors')}
        />
      </FormField>

      <FormField label={copy['AVC-FORM-PRIORITY']} id="avc-priority" required error={errors.priority}>
        <textarea
          id="avc-priority"
          name="priority"
          required
          rows={3}
          className={`${fieldClass(Boolean(errors.priority && touched.priority))} min-h-[88px] py-3`}
          value={values.priority}
          onChange={(e) => update('priority', e.target.value)}
          onBlur={() => blur('priority')}
        />
      </FormField>

      <FormField label={copy['AVC-FORM-SEEDS']} id="avc-seeds" optional>
        <textarea
          id="avc-seeds"
          name="seeds"
          rows={2}
          className={`${fieldClass(false)} min-h-[72px] py-3`}
          value={values.seeds}
          onChange={(e) => update('seeds', e.target.value)}
        />
      </FormField>

      <FormField label={copy['AVC-FORM-SOURCE']} id="avc-source" optional>
        <input
          id="avc-source"
          name="source"
          className={fieldClass(false)}
          value={values.source}
          onChange={(e) => update('source', e.target.value)}
        />
      </FormField>

      <FormField
        label={copy['AVC-FORM-GBP']}
        id="avc-gbp"
        optional
        help={copy['AVC-FORM-GBP-HELP']}
        error={errors.gbpUrl}
      >
        <input
          id="avc-gbp"
          name="gbpUrl"
          type="url"
          className={fieldClass(Boolean(errors.gbpUrl))}
          value={values.gbpUrl}
          onChange={(e) => update('gbpUrl', e.target.value)}
        />
      </FormField>

      <input type="hidden" name="topic" value={values.topic} readOnly />

      <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[14px] leading-[1.55] text-slate">
        <input
          type="checkbox"
          checked={values.servicesFollowUpOptIn}
          onChange={(e) => update('servicesFollowUpOptIn', e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-obsidian/30"
        />
        <span>{copy['AVC-CONSENT-MKT']}</span>
      </label>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-obsidian px-6 text-[15px] font-medium text-paper transition-opacity disabled:opacity-60 sm:w-auto"
        >
          {pending ? 'Sending…' : copy['AVC-FORM-BTN']}
        </button>
        <CopyRichText
          className="mt-4 max-w-[62ch] text-[13px] leading-[1.55] text-slate"
          text={copy['AVC-CONSENT']}
        />
        {serverError ? (
          <p className="mt-4 text-[14px] text-[#b4442e]" role="alert">
            {serverError}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FormField({
  label,
  id,
  children,
  required,
  optional,
  help,
  error,
}: {
  label: string;
  id: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
  help?: string;
  error?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-[15px] font-medium text-obsidian">
        {label}
        {required ? <span className="font-normal text-slate"> (required)</span> : null}
        {optional ? <span className="font-normal text-slate"> (optional)</span> : null}
      </label>
      {help ? <p className="mb-2 text-[14px] leading-[1.55] text-slate">{help}</p> : null}
      {children}
      {error ? (
        <p className="mt-1.5 text-[14px] text-[#b4442e]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}