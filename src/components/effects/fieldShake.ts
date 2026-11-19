const activeShakes = new WeakMap<Element, Animation>();

export function stopFieldShake(field: Element) {
  activeShakes.get(field)?.cancel();
  activeShakes.delete(field);
}

export function shakeInvalidFields(
  form: HTMLFormElement | null,
  fields: string[],
) {
  if (!form || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (const name of fields) {
    const field = form.elements.namedItem(name);
    if (!(field instanceof HTMLElement)) continue;
    stopFieldShake(field);
    activeShakes.set(
      field,
      field.animate(
        [0, -10, 10, -8, 8, -4, 4, 0].map((offset) => ({
          translate: `${offset}px 0`,
        })),
        { duration: 450, easing: "ease-in-out" },
      ),
    );
  }
}
