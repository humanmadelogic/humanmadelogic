/** Keep keyboard focus inside an open overlay (e.g. mobile nav). */
export function trapFocus(container: HTMLElement) {
  const selector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  const getFocusable = () =>
    Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
    );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const nodes = getFocusable();
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', onKeyDown);
  const nodes = getFocusable();
  nodes[0]?.focus();

  return () => container.removeEventListener('keydown', onKeyDown);
}
