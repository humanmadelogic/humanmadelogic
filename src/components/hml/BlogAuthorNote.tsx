import Link from 'next/link';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';

const PEN_NAME = 'Rowan Blake';

/** Visible author note with the first pen-name mention linked to the guides bio anchor. */
export function BlogAuthorNote() {
  const note = loadCopyMap('blog-hub.json')['BLOG-AUTHOR-NOTE'];
  if (!note) return null;

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