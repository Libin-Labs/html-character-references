import { escapeHtml, decodeReferences } from '@lp-labs/html-character-references';
if (decodeReferences(escapeHtml('<b>')) !== '<b>') throw new Error('Reference');
// @ts-expect-error invalid argument must be rejected by declarations
escapeHtml(123);
