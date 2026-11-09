/** Word units for headings outside home v2/v3 display scopes. */
export function HeadingWords({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="hml-word">
          {word}
          {index < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </>
  );
}
