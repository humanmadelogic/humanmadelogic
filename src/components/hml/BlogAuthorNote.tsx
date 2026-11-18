import Link from 'next/link';
import { ROWAN_BLAKE_AUTHOR_NOTE } from '@/lib/hml/rowanBlakeBio';

const PEN_NAME = 'Rowan Blake';

/** Visible author note with the first pen-name mention linked to the guides bio anchor. */
export function BlogAuthorNote() {
  const note = ROWAN_BLAKE_AUTHOR_NOTE;

  const idx = note.indexOf(PEN_NAME);
  if (idx === -1) return <p>{note}</p>;

  return (
    <p>
      {note.slice(0, idx)}
      <Link
        href="/guides#rowan-blake"
        className="underline decoration-obsidian/25 underline-offset-2"
      >
        {PEN_NAME}
      </Link>
      {note.slice(idx + PEN_NAME.length)}
    </p>
  );
}