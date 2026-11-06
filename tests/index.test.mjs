import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('five escapes', () => {
  assert.equal(api.escapeHtml('&<>"\''), '&amp;&lt;&gt;&quot;&apos;');
});
test('numeric scalars', () => {
  assert.equal(api.decodeReferences('&#65;&#x1F600;'), 'A😀');
});
test('single pass', () => {
  assert.equal(api.decodeReferences('&amp;lt;'), '&lt;');
});
test('roundtrip', () => {
  for (const x of ['', 'plain', '<a title="x">&</a>', "O'Reilly"])
    assert.equal(api.decodeReferences(api.escapeHtml(x)), x);
});
test('invalid references', () => {
  for (const x of ['&copy;', '&', '&#xD800;', '&#1114112;', '&constructor;'])
    assert.throws(() => api.decodeReferences(x));
});
test('types and budgets', () => {
  assert.throws(() => api.escapeHtml(1));
  assert.throws(() => api.escapeHtml('a'.repeat(16385)));
});
