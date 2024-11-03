// src/lib/utils.ts
export function disableDarkReader() {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    root.removeAttribute('data-darkreader-mode');
    root.removeAttribute('data-darkreader-scheme');
    const elements = document.querySelectorAll('[data-darkreader-inline-stroke]');
    elements.forEach((el) => {
      el.removeAttribute('data-darkreader-inline-stroke');
      el.removeAttribute('style');
    });
  }
}