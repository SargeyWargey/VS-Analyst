# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the **VS-Analyst Standalone IDE Project** - a comprehensive solution that transforms VS Code into a purpose-built IDE for analysts and technical documentation professionals.

## Development Philosophy

**CRITICAL: NO MOCK DATA OR SIMULATED TEMPLATES**

This project prioritizes doing things right the first time. When implementing features:

- **NO MOCK DATA**: Use real data structures, real file analysis, and real content extraction
- **NO SIMULATED TEMPLATES**: Implement actual template loading, processing, and generation systems
- **NO PLACEHOLDER IMPLEMENTATIONS**: Build complete, production-ready functionality from the start
- **REAL INTEGRATION**: Implement genuine VS Code service integration, not simplified approximations

The goal is to build a robust, enterprise-ready IDE with authentic documentation intelligence capabilities. Take the time to implement proper architectures and real functionality rather than shortcuts or temporary solutions.

### Project Components

1. **VS-Analyst Standalone IDE** - The primary deliverable: a VS Code fork with native documentation intelligence
2. **Documentation Generator Extension** (`ExtensionOrg/`) - Source code and architecture to be integrated into the standalone IDE
3. **VS Code Source** (`vscode/`) - VS Code 1.105.0 fork serving as the foundation for the standalone IDE

## Primary Goal: VS-Analyst Standalone IDE

The main objective is to create **VS-Analyst**, a standalone integrated development environment that embeds documentation intelligence directly into the VS Code core, rather than as an extension. This provides:

- **Native Documentation Experience**: Documentation features built into the core IDE
- **Enterprise Deployment**: Standalone application without extension management overhead
- **Superior Performance**: Direct access to VS Code services and language servers
- **Analyst-Focused Workflow**: Purpose-built for solution architects, business analysts, and technical writers

## Migration Strategy: Extension to Native Integration

The project involves migrating the existing VS Code extension architecture into native VS Code features:

### Target Architecture

The VS-Analyst standalone IDE will integrate documentation features using a native architecture:

1. **VS Code Core Layer**: Modified VS Code with embedded documentation services
2. **Documentation Intelligence Layer**: Native folder analysis, template management, and document generation
3. **Enterprise Integration Layer**: Built-in Claude Code Pro integration and team collaboration features
4. **Analyst UI Layer**: Custom sidebar panels, enhanced menus, and specialized workflows

### Migration Approach

**Phase 1**: Extract extension services and integrate into VS Code core modules
**Phase 2**: Replace extension UI components with native VS Code workbench integration
**Phase 3**: Enhance performance through direct language server access
**Phase 4**: Add enterprise features and custom branding

### Key Components

- **FolderAnalyzerService**: Analyzes project structure, extracts code patterns, functions, and dependencies
- **TemplateManagerService**: Handles template loading, variable substitution, and processing
- **ClaudeIntegratorService**: Manages Claude Code Pro integration via both slash commands and MCP server
- **DocumentationGeneratorExtension**: Main extension entry point and orchestration

## File Structure

```
VS-Analyst/
├── VS-Analyst-Standalone-PRD.md     # Product Requirements Document for standalone IDE
├── CLAUDE.md                        # This file - project guidance
├── ExtensionOrg/                    # Source extension code for migration
│   ├── extension/                   # Extension implementation to be integrated
│   │   ├── src/                     # TypeScript source code
│   │   │   ├── commands/            # Slash command generators → migrate to VS Code commands
│   │   │   ├── generators/          # Document type generators → migrate to core services
│   │   │   ├── mcp/                 # MCP server implementation → integrate as native service
│   │   │   ├── providers/           # VS Code providers → migrate to workbench integration
│   │   │   ├── templates/           # Template management → migrate to core feature
│   │   │   ├── ui/                  # UI components → migrate to workbench UI
│   │   │   └── utils/               # Utility services → migrate to core utilities
│   │   └── package.json             # Dependencies for integration reference
│   └── docs/                        # Legacy documentation (reference only)
└── vscode/                          # VS Code 1.105.0 fork - PRIMARY DEVELOPMENT TARGET
    ├── src/                         # VS Code TypeScript source - INTEGRATION TARGET
    │   ├── vs/workbench/            # Target for UI integration
    │   ├── vs/platform/             # Target for service integration
    │   └── vs/base/                 # Target for utility integration
    ├── extensions/                  # Built-in extensions area
    ├── build/                       # Build configuration and scripts
    ├── test/                        # VS Code tests
    └── package.json                 # VS Code build configuration
```

## Development Commands

### VS-Analyst Development (run from `vscode/` - Primary Development)

- `npm run compile` - Compile VS Code with integrated documentation features
- `npm run watch` - Watch mode for full VS-Analyst development
- `npm run watch-client` - Watch mode for core VS Code client modifications
- `npm run watch-extensions` - Watch mode for built-in documentation features
- `npm run eslint` - Run ESLint on modified VS Code source
- `npm run smoketest` - Run smoke tests including documentation features
- `npm run test-node` - Run Node.js unit tests
- `npm run test-browser` - Run browser unit tests
- `npm run test-extension` - Run integrated documentation feature tests

### Extension Analysis (run from `ExtensionOrg/extension/` - Reference Only)

- `npm run compile` - Compile extension source for migration analysis
- `npm run lint` - Analyze extension code quality for migration
- `npm run test:unit` - Run existing unit tests for migration reference

## Project Status

### VS-Analyst Standalone IDE Project
- **Status**: 0% complete - Ready to begin VS Code integration
- **Foundation**: VS Code 1.105.0 fork available and buildable
- **Source Material**: Complete extension codebase (~70% implemented) ready for migration
- **Documentation**: Comprehensive PRD and architecture planning completed

### Extension Codebase (Migration Source)
- **Status**: ~70% complete - Provides solid foundation for VS Code integration
- **Architecture**: 40+ TypeScript files with layered service architecture
- **Features Available for Migration**:
  - Multiple document generators (Help Docs, PRDs, Tech Specs, Meeting Summaries)
  - Smart folder analysis and code pattern extraction
  - Template-based generation with variable substitution
  - VS Code UI components (sidebar, context menus, commands)
  - Configuration management and user preferences
  - Claude Code Pro integration framework

### Next Steps for VS-Analyst Development
1. **Environment Setup**: Configure VS Code build system for custom modifications
2. **Service Migration**: Extract extension services into VS Code core modules
3. **UI Integration**: Migrate extension UI components to native workbench integration
4. **Testing Framework**: Establish testing for integrated documentation features
5. **Performance Optimization**: Leverage direct VS Code service access for enhanced performance

## VS-Analyst Architecture Integration

### Extension to VS Code Core Migration Map

**Extension Components** → **VS Code Integration Targets**
- `@/commands/*` (Slash command generators) → `src/vs/workbench/contrib/*/common/commands`
- `@/generators/*` (Document generators) → `src/vs/platform/documentation/common/generators`
- `@/mcp/*` (MCP server) → `src/vs/platform/documentation/node/mcpService`
- `@/providers/*` (VS Code providers) → `src/vs/workbench/contrib/documentation/browser/providers`
- `@/templates/*` (Template management) → `src/vs/platform/documentation/common/templates`
- `@/ui/*` (UI components) → `src/vs/workbench/contrib/documentation/browser/ui`
- `@/utils/*` (Utility services) → `src/vs/platform/documentation/common/services`

### Native VS Code Integration Benefits

1. **Performance**: Direct access to language servers and file system services
2. **UI Integration**: Native workbench panels and menu integration
3. **Configuration**: Built-in settings and preferences management
4. **Extension API**: Access to internal VS Code APIs not available to extensions
5. **Enterprise Features**: Native support for enterprise deployment and configuration

### Claude Code Pro Integration Strategy

The standalone IDE will maintain seamless Claude Code Pro integration through:
1. **Native MCP Service**: Built-in MCP server for real-time communication
2. **Integrated Command System**: Documentation commands as part of VS Code's native command palette
3. **Workspace Integration**: Deep integration with VS Code's workspace and project management
4. **Context Sharing**: Enhanced context sharing through direct access to language services