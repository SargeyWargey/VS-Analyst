# VS Code Extension + Claude Code Pro Integration
## Folder-Based Documentation Generation System

## Executive Summary
This document outlines a VS Code extension that provides GUI-based documentation generation by integrating with Claude Code Pro through custom slash commands and MCP servers. The system allows users to select folders, click buttons, and generate context-aware documentation without API calls.

## Integration Feasibility Analysis

### ✅ FEASIBLE: Non-API Integration Approaches

**1. Custom Slash Commands Integration**
- Claude Code supports custom commands in `.claude/commands/`
- Commands can accept arguments and execute with folder context
- VS Code extension can generate and trigger these commands programmatically

**2. MCP Server Integration**
- Create custom MCP server that communicates with VS Code extension
- Use stdio transport for local communication
- Expose selected folder context as MCP resources

**3. File System Bridge Approach**
- Extension writes context files to temporary locations
- Claude Code reads context through custom commands
- Clean, separation of concerns

## System Architecture

### Core Components

```
VS Code Extension (Frontend)
├── UI Components
│   ├── Folder Selection Tree
│   ├── Documentation Type Buttons
│   └── Template Management Panel
├── Context Processors
│   ├── Folder Analyzer
│   ├── File Content Aggregator
│   └── Template Renderer
└── Claude Integration Layer
    ├── Command Generator
    ├── MCP Server Communication
    └── Result Handler

Claude Code Pro (Backend)
├── Custom Slash Commands
│   ├── /generate-help-docs
│   ├── /create-prd
│   └── /make-spec
├── MCP Server
│   ├── Context Resource Provider
│   └── Template Resource Provider
└── Steering Documents
    ├── Documentation Templates
    └── Generation Guidelines
```

### User Experience Flow

1. **Folder Selection**: User right-clicks folder in VS Code Explorer
2. **Action Selection**: Extension shows context menu with documentation options
3. **Template Selection**: User chooses from available templates (or uses default)
4. **Context Building**: Extension analyzes folder contents
5. **Command Generation**: Extension creates custom slash command with context
6. **Claude Execution**: Command triggers Claude Code Pro with full context
7. **Result Integration**: Generated documentation appears in VS Code

## Technical Implementation Strategy

### Option 1: Custom Slash Commands (Recommended)

**How it Works:**
```typescript
// Extension generates dynamic command
const command = `
---
description: Generate help documentation for ${folderName}
---
Generate comprehensive help documentation for the selected folder based on the following context:

**Folder:** ${selectedFolder}
**Template:** ${selectedTemplate}
**Files Context:**
${fileContents}

Use the template structure from .claude/templates/${templateName}.md
`;

// Write to .claude/commands/temp-generate-docs.md
await writeCommandFile(command);

// Execute in Claude Code terminal
await executeInTerminal('/temp-generate-docs');
```

**Advantages:**
- Direct integration with Claude Code Pro
- No API requirements
- Uses existing Claude Code infrastructure
- Full context passing capability

### Option 2: MCP Server Integration

**How it Works:**
```typescript
// VS Code Extension creates MCP server
class DocumentationMCPServer {
  async getSelectedFolderContext(folderId: string) {
    return {
      path: selectedFolder,
      files: analyzedFiles,
      template: selectedTemplate
    };
  }
}

// Claude Code accesses via MCP
// @extension:context://selected-folder
```

**Advantages:**
- Persistent connection
- Real-time context updates
- Cleaner separation of concerns

### Option 3: Hybrid Approach (Best of Both)

Combine both methods for maximum flexibility and robustness.

## Extension UI Design

### Sidebar Panel Structure
```
📁 Documentation Generator
├── 🎯 Quick Actions
│   ├── [Generate Help Docs]
│   ├── [Create PRD]
│   ├── [Make Spec]
│   └── [Meeting Summary]
├── 📝 Templates
│   ├── Help Documentation
│   ├── PRD Template
│   ├── Technical Spec
│   └── [+ Add Custom]
├── ⚙️ Settings
│   ├── Default Output Folder
│   ├── Template Directory
│   └── Claude Integration
└── 📊 Recent Generations
    ├── api-docs.md (2 hours ago)
    └── user-guide.md (yesterday)
```

### Context Menu Integration
```
Right-click on folder → "Generate Documentation"
├── 📚 Help Documentation
├── 📋 PRD Document
├── 🔧 Technical Specification
├── 📖 User Guide
└── ⚙️ Custom Template...
```

## Template Management System

### Template Structure
```yaml
# .claude/templates/help-documentation.md
---
name: "Help Documentation"
description: "User-friendly help documentation"
output_format: "markdown"
sections:
  - overview
  - getting_started
  - features
  - troubleshooting
  - faq
---

# ${folder_name} Help Documentation

## Overview
${generate_overview_from_context}

## Getting Started
${generate_getting_started_steps}

## Features
${analyze_and_list_features}

## Troubleshooting
${generate_common_issues}

## FAQ
${generate_frequently_asked_questions}
```

### Template Variables
- `${folder_name}`: Selected folder name
- `${file_list}`: List of relevant files
- `${code_context}`: Analyzed code content
- `${existing_docs}`: Found documentation
- `${generated_*}`: AI-generated sections

## Configuration System

### Extension Settings
```json
{
  "documentationGenerator": {
    "templatesPath": ".claude/templates",
    "outputPath": "./docs/generated",
    "claudeIntegration": {
      "method": "slash-commands", // or "mcp-server"
      "commandPrefix": "doc-gen"
    },
    "analysis": {
      "maxFileSize": "1MB",
      "excludePatterns": ["*.log", "node_modules"]
    }
  }
}
```

### Claude Code Configuration
```json
{
  "mcpServers": {
    "documentation-generator": {
      "command": "node",
      "args": ["./vscode-extension-mcp-server.js"],
      "env": {
        "VSCODE_WORKSPACE": "${workspaceFolder}"
      }
    }
  }
}
```

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Create VS Code extension scaffold
- [ ] Implement folder selection UI
- [ ] Build basic template system
- [ ] Create simple slash command integration

### Phase 2: Core Features (Week 3-4)
- [ ] Advanced context analysis
- [ ] Template variable substitution
- [ ] MCP server implementation
- [ ] Help documentation generator

### Phase 3: Enhancement (Week 5-6)
- [ ] PRD and spec generators
- [ ] Advanced template editor
- [ ] Settings management UI
- [ ] Error handling and validation

### Phase 4: Polish (Week 7-8)
- [ ] Performance optimization
- [ ] Documentation and tutorials
- [ ] Team testing and feedback
- [ ] Marketplace preparation

## Example Usage Scenarios

### Scenario 1: API Documentation
1. Developer selects `/src/api` folder
2. Clicks "Generate Help Docs" button
3. Extension analyzes route files, controllers, models
4. Generates comprehensive API documentation
5. Output saved to `/docs/api-help.md`

### Scenario 2: Feature PRD
1. PM selects `/features/user-profiles` folder
2. Clicks "Create PRD" button
3. Extension analyzes implementation files, tests, existing docs
4. Generates PRD with requirements, acceptance criteria, dependencies
5. Output formatted according to company PRD template

### Scenario 3: Component Documentation
1. Developer selects UI component folder
2. Clicks "User Guide" button
3. Extension analyzes component props, examples, stories
4. Generates user-friendly component documentation
5. Includes usage examples and best practices

## Benefits Summary

### For Individual Users
- ✅ One-click documentation generation
- ✅ Consistent formatting across all docs
- ✅ Context-aware content creation
- ✅ No API setup or costs

### For Teams
- ✅ Standardized documentation processes
- ✅ Shared template library
- ✅ Faster onboarding for new team members
- ✅ Improved documentation quality and consistency

### Technical Benefits
- ✅ No external dependencies
- ✅ Works with existing Claude Code Pro subscriptions
- ✅ Integrates seamlessly with VS Code workflow
- ✅ Extensible and customizable architecture

## Next Steps

1. **Validation**: Confirm technical approach with simple prototype
2. **Design**: Create detailed UI mockups and user flows
3. **Development**: Start with Phase 1 implementation
4. **Testing**: Validate with real-world documentation scenarios
5. **Deployment**: Package and distribute to team

This approach provides the GUI-driven, template-based system you're looking for while leveraging your existing Claude Code Pro investment without requiring API integration.