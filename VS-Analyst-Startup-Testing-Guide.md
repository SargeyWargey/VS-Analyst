# VS-Analyst Startup & Testing Guide

This quickstart walks you through preparing the VS-Analyst IDE fork, building it, launching a self-host instance, and validating core documentation features.

## 1. Prerequisites
Ensure the following tools are installed and on your path:
- Node.js 18.15.0+
- npm 9.0.0+
- Python 3.x
- Git

> Tip: if you have recently switched Node versions, run `npm rebuild` before compiling.

## 2. Install Dependencies
```bash
cd /Users/mbp14/Development/Projects/VS-Analyst/vscode
npm install
npm run postinstall
```

## 3. Build the Workbench
Perform a clean TypeScript build before launching:
```bash
npm run compile
```

For active development you can keep the compiler running with:
```bash
npm run watch
```

## 4. Launch VS-Analyst IDE
The project runs inside the sandbox, so keep runtime state in the workspace:
```bash
./scripts/code.sh \
  --new-window \
  --enable-proposed-api \
  --user-data-dir ./tmp-user-data \
  --extensions-dir ./tmp-extensions
```
- Add a workspace path at the end of the command to open a specific project.
- Delete `./tmp-user-data` or `./tmp-extensions` if you need a fresh profile.

## 5. Smoke Test Checklist
1. **Documentation Activity** – Open the book icon in the Activity Bar; confirm the Documentation, Analysis, and Generation views render.
2. **Generator Cards** – In the Generation view verify the four generator cards (PRD, Technical Spec, Help Docs, Meeting Summary) load.
3. **Batch Mode** – Toggle *Batch Mode*, use Select All, then Generate Selected. Confirm progress bars appear under Active Generations.
4. **History Panel** – Complete at least one generation and confirm it appears in Generation History with status and duration.
5. **Analysis Status** – Trigger `VS-Analyst: Analyze Current Workspace` from the Command Palette and ensure the status bar entry updates during the run.

Record any errors shown in the developer tools console (`Help → Toggle Developer Tools`) along with reproduction steps.

## 6. CLI Test Coverage
Run the available automated checks when time permits:
```bash
npm run eslint            # Lint the codebase
npm run eslint -- --fix   # Auto-fix lint issues
npx tsc --noEmit          # Type-check without emitting output
npm run test              # Unit tests
npm run test-integration  # Integration tests
```

## 7. Troubleshooting
- **Missing module / bare specifier errors**: rerun `npm run compile` to regenerate the out folder.
- **Launch fails with EPERM in ~/.vscode-oss-dev**: double-check you are using the workspace-local `--user-data-dir`/`--extensions-dir` flags above.
- **Stalled compilation**: remove `out/` and rerun `npm run compile`. The command is safe inside the repo root.

Capture terminal logs and console traces for any unresolved issue and attach them to the corresponding task in `VS-Analyst-Task-List.md`.
