function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
const names: Readonly<Record<string, string>> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
};
export function escapeHtml(text: string): string {
  strictText(text);
  return text.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&apos;',
  );
}
export function decodeReferences(text: string): string {
  strictText(text, 131072);
  let out = '';
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '&') {
      out += text[i];
      continue;
    }
    const end = text.indexOf(';', i + 1);
    if (end < 0 || end - i > 12) throw new RangeError('Invalid reference');
    const token = text.slice(i + 1, end);
    if (Object.hasOwn(names, token)) out += names[token];
    else {
      if (!/^#(?:[0-9]{1,7}|x[0-9a-fA-F]{1,6})$/.test(token))
        throw new RangeError('Unknown reference');
      const cp = token[1] === 'x' ? parseInt(token.slice(2), 16) : Number(token.slice(1));
      if (cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) throw new RangeError('Invalid scalar');
      out += String.fromCodePoint(cp);
    }
    i = end;
  }
  return out;
}
