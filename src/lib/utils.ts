// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function disableDarkReader() {
  if (typeof window === 'undefined') return;
  
  // Remove Dark Reader styles
  const elements = document.querySelectorAll(
    '[data-darkreader-mode], [data-darkreader-scheme]'
  );
  elements.forEach(element => {
    element.removeAttribute('data-darkreader-mode');
    element.removeAttribute('data-darkreader-scheme');
  });

  const styledElements = document.querySelectorAll(
    '[data-darkreader-inline-bgcolor], [data-darkreader-inline-color], [data-darkreader-inline-border], [data-darkreader-inline-stroke]'
  );
  styledElements.forEach(element => {
    element.removeAttribute('data-darkreader-inline-bgcolor');
    element.removeAttribute('data-darkreader-inline-color');
    element.removeAttribute('data-darkreader-inline-border');
    element.removeAttribute('data-darkreader-inline-stroke');
  });
}