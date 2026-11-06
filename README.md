# @lp-labs/html-character-references

Five HTML character escapes and strict scalar numeric references.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/html-character-references
```

## Working example

```js
import { escapeHtml, decodeReferences } from '@lp-labs/html-character-references';
if (decodeReferences(escapeHtml('<b>')) !== '<b>') throw new Error('Reference');
```

CommonJS: `const api = require('@lp-labs/html-character-references')`.

## Behavior, customization and limits

escapeHtml escapes &,<,>,double quote and apostrophe as amp,lt,gt,quot,apos. decodeReferences supports only those five names plus decimal/hex Unicode scalar references,all terminated by semicolon; unknown/bare ampersands and invalid scalars throw. Single pass,not recursive. Input escape<=16384 UTF16 units,decode<=131072. Raw text is preserved including UTF16; numeric surrogates prohibited. Not an HTML parser or sanitizer,does not make URLs/CSS/scripts safe. O(n)time/storage.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function escapeHtml(text: string): string;
export declare function decodeReferences(text: string): string;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
