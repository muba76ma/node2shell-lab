# Node2Shell Exposure Lab (CVE-2026-111497)

Educational lab demonstrating the Node.js Brotli decoder out-of-bounds write
vulnerability (CVSS 9.2), triggerable via automatic request decompression.

## Vulnerability Summary
- **CVE:** CVE-2026-111497 ("Node2Shell")
- **Affected:** Node.js 22.x, 24.x, 26.x before Oct 21 2026 patches
- **Fixed:** 22.23.4 / 24.22.1 / 26.12.1
- **Vector:** `Content-Encoding: br` on any endpoint using `express.json()`
  or `fetch()` — decompression happens before route logic runs.

## Lab Files
- `server.js` — vulnerable Express API (auto Brotli decompression)
- `exploit-test.js` — placeholder for DoS payload testing

## Runtime Notes
This repo was built in Termux. **Node.js 26.3.1 was installed**,
which does NOT reproduce the crash. To reproduce, run a vulnerable
runtime in an isolated container/VM:
  node:22.23.3  or  node:24.22.0

## Safety
- Local-only. Never test against systems you don't own.
- Run inside Docker/VM with no host access.

## Mitigations
1. Patch runtime to fixed version above.
2. Strip `Content-Encoding: br` at reverse proxy if patch is delayed.
3. Add `npm audit` to CI.
