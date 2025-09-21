# VS-Analyst IDE Testing Guide

This document provides all the commands needed to build, run, and test the VS-Analyst standalone IDE with the new Document Generation Dashboard.

## Prerequisites

Before testing, ensure you have the following installed:
- Node.js (version 18.15.0 or later)
- npm (version 9.0.0 or later)
- Python 3.x (for some build tools)
- Git

## Environment Setup

### 1. Navigate to the VS Code Directory
```bash
cd /Users/mbp14/Development/Projects/VS-Analyst/vscode
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Build Dependencies
```bash
npm run postinstall
```

## Building the Application

### 1. Clean Build (Recommended for first-time setup)
```bash
npm run compile
```

### 2. Watch Mode for Development
```bash
npm run watch
```

### 3. Compile Client Only
```bash
npm run compile-client
```

### 4. Compile Extensions Only
```bash
npm run compile-extensions
```

## Running the Application

### 1. Launch VS-Analyst IDE (Development Mode)
```bash
./scripts/code.sh --new-window --enable-proposed-api
```

### 2. Launch with Specific Workspace
```bash
./scripts/code.sh --new-window --enable-proposed-api /path/to/test/workspace
```

### 3. Launch with Debug Logging
```bash
./scripts/code.sh --new-window --enable-proposed-api --log debug
```

### 4. Launch with Extensions Disabled (Clean Test)
```bash
./scripts/code.sh --new-window --enable-proposed-api --disable-extensions
```

## Testing the Document Generation Dashboard

### 1. Open the Documentation Panel
1. Launch VS-Analyst IDE
2. Open the Activity Bar (left sidebar)
3. Click on the "Documentation" icon (book icon)
4. The Documentation panel should open with three sub-panels:
   - Documentation (main view)
   - Analysis (project analysis)
   - Generation (new dashboard)

### 2. Test Generator Selection
1. Navigate to the "Generation" tab in the Documentation panel
2. Verify all 4 generators are displayed:
   - Product Requirements Document (📋, Business)
   - Technical Specification (🔧, Technical)
   - Help Documentation (📖, Technical)
   - Meeting Summary (📝, Collaboration)
3. Click on each generator card to start individual generation

### 3. Test Batch Generation
1. Enable "Batch Mode" checkbox in the Generation dashboard
2. Verify selection checkboxes appear on generator cards
3. Test selection controls:
   ```
   - Click "Select All" button
   - Click "Clear" button
   - Manually select/deselect individual generators
   ```
4. With generators selected, click "Generate Selected"
5. Verify batch generation starts for all selected generators

### 4. Test Progress Tracking
1. Start any generation (individual or batch)
2. Verify progress appears in "Active Generations" section
3. Test progress features:
   - Progress bar updates
   - Percentage display
   - Status icons (🔄 for running, ⚠️ for retrying)
   - Cancel button functionality

### 5. Test Error Handling and Retry
1. Start a generation and immediately cancel it
2. Verify job appears as "cancelled" in history
3. Simulate errors by checking the browser console for any retry attempts
4. Verify retry indicators and retry count display

### 6. Test Generation History
1. Complete several generations (successful and cancelled)
2. Verify history displays in "Generation History" section
3. Test history management:
   ```
   - Click refresh button (🔄)
   - Click export button (📋) - should copy CSV to clipboard
   - Click "Clear" button - should clear finished jobs only
   ```
4. Verify status icons and duration display

## Code Quality and Linting

### 1. Run ESLint
```bash
npm run eslint
```

### 2. Fix ESLint Issues
```bash
npm run eslint -- --fix
```

### 3. Type Checking
```bash
npx tsc --noEmit
```

## Testing Commands

### 1. Run Unit Tests
```bash
npm run test
```

### 2. Run Integration Tests
```bash
npm run test-integration
```

### 3. Run Smoke Tests
```bash
npm run smoketest
```

### 4. Run Browser Tests
```bash
npm run test-browser
```

### 5. Run Node Tests
```bash
npm run test-node
```

### 6. Run Extension Tests
```bash
npm run test-extension
```

## Development Workflow

### 1. Start Development Session
```bash
# Terminal 1: Start watch mode
npm run watch

# Terminal 2: Launch application
./scripts/code.sh --new-window --enable-proposed-api
```

### 2. Test Documentation Features
```bash
# Open a test workspace with code
./scripts/code.sh --new-window /path/to/test/project

# The app should automatically:
# 1. Show Documentation panel in sidebar
# 2. Display Analysis view with project analysis
# 3. Show Generation dashboard with available generators
```

### 3. Debug Generation Issues
```bash
# Launch with debug logging
./scripts/code.sh --new-window --enable-proposed-api --log debug

# Check developer tools
# Press F12 or Cmd+Option+I to open DevTools
# Check Console for generation logs and errors
```

## Troubleshooting Commands

### 1. Clean and Rebuild
```bash
# Clean build artifacts
rm -rf out/
rm -rf node_modules/

# Reinstall and rebuild
npm install
npm run compile
```

### 2. Reset VS Code Settings
```bash
# Remove user settings (backup first!)
rm -rf ~/.vscode/
rm -rf ~/Library/Application\ Support/Code/
```

### 3. Check Build Status
```bash
# Verify compilation status
npm run compile 2>&1 | grep -E "(error|Error|ERROR)"

# Check for TypeScript errors
npx tsc --noEmit --project .
```

### 4. Debug Extension Loading
```bash
# Launch with extension host debugging
./scripts/code.sh --new-window --enable-proposed-api --extensionDevelopmentPath=/Users/mbp14/Development/Projects/VS-Analyst/vscode
```

## Test Scenarios

### Scenario 1: First-Time User Experience
```bash
# 1. Fresh build and launch
npm run compile
./scripts/code.sh --new-window --enable-proposed-api

# 2. Open Documentation panel
# 3. Verify welcome message and available generators
# 4. Generate a simple document (Meeting Summary)
# 5. Verify completion and history entry
```

### Scenario 2: Batch Generation Workflow
```bash
# 1. Launch with test workspace
./scripts/code.sh --new-window --enable-proposed-api /path/to/test/project

# 2. Enable batch mode
# 3. Select multiple generators
# 4. Start batch generation
# 5. Verify concurrent progress tracking
# 6. Check batch completion in history
```

### Scenario 3: Error Recovery Testing
```bash
# 1. Start generation
# 2. Cancel immediately (test cancellation)
# 3. Start another generation and let it "fail" (simulated)
# 4. Verify retry attempts and final failure handling
# 5. Check error display in history
```

### Scenario 4: Performance Testing
```bash
# 1. Start watch mode for performance monitoring
npm run watch

# 2. Launch application
./scripts/code.sh --new-window --enable-proposed-api --log trace

# 3. Run multiple batch generations
# 4. Monitor memory usage and performance
# 5. Check for memory leaks in DevTools
```

## Expected Results

### ✅ Successful Test Indicators
- Documentation panel loads without errors
- All 4 generators display correctly with proper categorization
- Batch mode enables/disables selection UI properly
- Progress tracking shows real-time updates
- History displays completed, failed, and cancelled jobs
- Export functionality copies CSV data to clipboard
- No console errors related to documentation features

### ❌ Common Issues to Watch For
- Generator cards not displaying (service injection issues)
- Progress not updating (event handling problems)
- Batch selection not working (UI state management)
- History not persisting (memory management)
- Export failing (clipboard API issues)

## Development Tips

### Hot Reload Workflow
```bash
# 1. Keep watch running
npm run watch

# 2. Make changes to documentation files
# 3. Reload window: Cmd+R (macOS) or Ctrl+R (Windows/Linux)
# 4. Test changes immediately
```

### Debugging Generation Issues
```bash
# 1. Open DevTools (F12)
# 2. Go to Console tab
# 3. Filter for "VS-Analyst" or "documentation" messages
# 4. Look for generation start/progress/completion logs
```

### Testing UI Changes
```bash
# 1. Modify generation dashboard styling
# 2. Reload VS-Analyst window
# 3. Verify changes in Documentation > Generation panel
# 4. Test responsiveness with different panel sizes
```

## Performance Monitoring

### Memory Usage
```bash
# 1. Open DevTools > Memory tab
# 2. Take heap snapshot before testing
# 3. Run generation tests
# 4. Take another snapshot
# 5. Compare for memory leaks
```

### Network Activity
```bash
# 1. Open DevTools > Network tab
# 2. Start generation
# 3. Monitor for unexpected network requests
# 4. Verify MCP communication patterns
```

This guide provides comprehensive testing coverage for the VS-Analyst IDE and the new Document Generation Dashboard functionality.