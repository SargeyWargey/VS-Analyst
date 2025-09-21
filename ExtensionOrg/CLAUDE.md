# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation generator project for creating a VS Code extension that integrates with Claude Code Pro. The project focuses on automating technical documentation generation through folder analysis and template-based content creation.

### Core Architecture

The project follows a hybrid architecture design:

1. **VS Code Extension Layer**: User interface and VS Code integration
2. **Business Logic Layer**: Document generation, template processing, folder analysis
3. **Integration Layer**: Claude Code integration via slash commands and MCP server
4. **Infrastructure Layer**: Configuration, logging, error handling

### Key Components

- **FolderAnalyzerService**: Analyzes project structure, extracts code patterns, functions, and dependencies
- **TemplateManagerService**: Handles template loading, variable substitution, and processing
- **ClaudeIntegratorService**: Manages Claude Code Pro integration via both slash commands and MCP server
- **DocumentationGeneratorExtension**: Main extension entry point and orchestration

## File Structure

```
AllInOne/
├── docs/                            # Project documentation
│   ├── Documentation-Generator-PRD.md    # Product Requirements Document
│   ├── Documentation-Generator-Design.md # Technical Design Document
│   └── Extension-Implementation-Checklist.md # Implementation roadmap
├── extension/                       # VS Code extension implementation
│   ├── src/                        # TypeScript source code
│   ├── mcp-server/                 # MCP server implementation
│   ├── package.json                # Extension manifest and dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   └── ...                         # Other extension files
├── Archive/                        # Archived documentation and analysis
├── .claude/                        # Claude Code configuration
└── CLAUDE.md                       # This file
```

## Key Documentation Files

- **docs/Documentation-Generator-PRD.md**: Complete product requirements with user stories, functional requirements, and success metrics
- **docs/Documentation-Generator-Design.md**: Technical architecture, component specifications, data models, and implementation details
- **docs/Extension-Implementation-Checklist.md**: Phase-by-phase implementation plan with concrete deliverables

## Project Goals

The project aims to create a VS Code extension that:
- Generates documentation from code analysis (Help docs, PRDs, Technical specs)
- Integrates seamlessly with Claude Code Pro (no external API costs)
- Supports custom templates and team collaboration
- Provides 60% reduction in documentation creation time

## Integration Approach

The extension uses a dual integration strategy with Claude Code Pro:
1. **Slash Commands**: Dynamic command generation for specific documentation tasks
2. **MCP Server**: Real-time communication bridge for resource provision

## Implementation Status

The project is in **active development** with significant progress made:

### ✅ Completed Components
- **VS Code Extension Scaffold**: Basic extension structure with commands, views, and configuration
- **Core Architecture**: All main service classes implemented (40+ TypeScript files)
- **MCP Server Setup**: Package configuration and protocol documentation complete
- **UI Components**: Status bar, dialog helpers, progress management, and sidebar provider
- **Command System**: Slash command generation and execution framework
- **Template System**: Template management, validation, and processing infrastructure
- **Documentation Generators**: Specialized generators for PRD, technical specs, help docs, and meeting summaries
- **Folder Analysis**: Code pattern extraction and dependency analysis
- **Configuration Management**: Extension settings and user preferences
- **Testing Framework**: Jest unit testing setup with test files

### 🚧 In Progress
- **Template Directory**: Default templates not yet created
- **MCP Server Implementation**: Protocol handlers and resource providers need completion
- **Integration Testing**: VS Code extension testing and Claude Code Pro integration
- **Error Handling**: Graceful degradation and comprehensive error management

### 📋 Remaining Tasks
- Implement default documentation templates
- Complete MCP server resource handlers
- Add comprehensive error handling
- Perform end-to-end testing with Claude Code Pro
- Documentation and user guides

**Current Status**: ~70% complete - Core functionality implemented, integration and polish remaining.

## Development Commands

The extension implementation includes the following commands (run from the `extension/` directory):

- `npm run compile` - Compile TypeScript source code
- `npm run watch` - Watch mode compilation
- `npm run lint` - Run ESLint code quality checks
- `npm run test` - Run VS Code extension tests
- `npm run test:unit` - Run unit tests with Jest
- `npm run format` - Format code with Prettier