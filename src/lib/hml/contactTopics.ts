import { contact } from '@/config/agency';

export type ContactTopic = (typeof contact.topics)[number];

export function contactHref(topic: ContactTopic): string {
  return `/contact?topic=${encodeURIComponent(topic)}`;
}

/** Preselect contact topic from `?topic=` when it matches a known option. */
export function resolveContactTopic(param: string | null | undefined): ContactTopic {
  const value = param?.trim();
  if (value && (contact.topics as readonly string[]).includes(value)) {
    return value as ContactTopic;
  }
  return contact.topics[0];
}
