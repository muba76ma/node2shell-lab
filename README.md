# Node2Shell Lab 🛡️⚡

A sandbox lab for the Node.js **Brotli decoder out-of-bounds write**
(**CVE-2026-111497**, CVSS 9.2), demonstrating how a runtime-level flaw
becomes exploitable through ordinary Express request handling.

---

## 🏗️ Project Structure

```text
node2shell-lab/
├── .gitignore          # Excludes node_modules and local artifacts
├── package.json        # Metadata + express dependency
├── package-lock.json   # Reproducible install lockfile
├── server.js           # Vulnerable Express API (auto Brotli decompression)
├── exploit-test.js     # Placeholder for DoS payload testing
└── README.md           # Lab documentation and CVE context
Field Value
CVE CVE-2026-111497 ("Node2Shell")
Class Out-of-bounds write (memory corruption)
CVSS 9.2 (Critical)
Affected Node.js 22.x / 24.x / 26.x before Oct 21 2026 patches
Fixed 22.23.4 / 24.22.1 / 26.12.1
Vector Content-Encoding: br on any endpoint using express.json() or fetch()git clone https://github.com/muba76ma/node2shell-lab.git
cd node2shell-lab
npm install
node server.js
docker run --rm -it -p 3000:3000 -v "$PWD":/app -w /app \
  node:24.22.0 sh -c "npm install && node server.js"
Good — the README and file layout look right. I notice LICENSE isn't in the ls output, so the license heredoc either didn't run or you haven't executed that second block yet. Let's verify and finish.

1. Check current git state

```bash
cd ~/node2shell-lab
git status
git log --oneline
```

Two likely outcomes:

· README.md shows as modified → the first cat worked, but commit/push hasn't run yet.
· git log has no new commit → nothing was committed.

2. Check if LICENSE exists

```bash
ls -la | grep -i license
# empty output = not created
```

3. Finish both in one shot

Paste this whole block — it's idempotent (safe to re-run even if README already exists):

```bash
cd ~/node2shell-lab

# README (overwrite — safe, content is identical)
cat > README.md <<'EOF'
# Node2Shell Lab 🛡️⚡

A sandbox lab for the Node.js **Brotli decoder out-of-bounds write**
(**CVE-2026-111497**, CVSS 9.2), demonstrating how a runtime-level flaw
becomes exploitable through ordinary Express request handling.

---

## 🏗️ Project Structure

```text
node2shell-lab/
├── .gitignore          # Excludes node_modules and local artifacts
├── package.json        # Metadata + express dependency
├── package-lock.json   # Reproducible install lockfile
├── server.js           # Vulnerable Express API (auto Brotli decompression)
├── exploit-test.js     # Placeholder for DoS payload testing
└── README.md           # Lab documentation and CVE context
```

🔍 CVE Context

Field Value
CVE CVE-2026-111497 ("Node2Shell")
Class Out-of-bounds write (memory corruption)
CVSS 9.2 (Critical)
Affected Node.js 22.x / 24.x / 26.x before Oct 21 2026 patches
Fixed 22.23.4 / 24.22.1 / 26.12.1
Vector Content-Encoding: br on any endpoint using express.json() or fetch()

Why it's dangerous: the Brotli decoder runs before route logic.
A malformed compressed body triggers memory corruption without the
developer ever calling a decompression API directly.

⚙️ Quick Start

```bash
git clone https://github.com/muba76ma/node2shell-lab.git
cd node2shell-lab
npm install
node server.js
```

API listens on http://127.0.0.1:3000.

🧪 Runtime Note

This repo was authored in Termux, which installed Node.js 26.3.1 —
outside the vulnerable range for this lab's design. To reproduce the crash
end-to-end, run a vulnerable runtime in an isolated container/VM:

```bash
docker run --rm -it -p 3000:3000 -v "$PWD":/app -w /app \
  node:24.22.0 sh -c "npm install && node server.js"
```

🛡️ Mitigations

1. Patch runtime to a fixed version (see table above).
2. Strip Content-Encoding: br at the reverse proxy if patching is delayed.
3. Add npm audit to CI for transitive dependency drift.
4. Never test against systems you do not own.

🛠️ Toolchain

· Runtime: Node.js / JavaScript (CommonJS)
· Framework: Express 5
· Environment: Termux (aarch64), POSIX shell, Git

Author: Barki Mustapha

📜 License

MIT — see LICENSE.
