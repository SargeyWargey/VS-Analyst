# Create Default Templates Implementation Steps

## Overview

The VS Code Documentation Generator extension currently has empty templates directory and falls back to basic templates when generating documentation. This document outlines the steps to create comprehensive default templates for all supported documentation types.

## Current State Analysis

### Template System Status
- **Template Manager**: ✅ Fully implemented (`TemplateManager.ts`)
- **Template Validation**: ✅ Implemented (`TemplateValidator.ts`)
- **Template Directory**: ❌ Empty (`/extension/templates/`)
- **Fallback Mechanism**: ✅ Working (basic templates generated when missing)

### Required Template Types
Based on the generator implementations, we need templates for:
1. **Help Documentation** (`help-template.md`)
2. **Product Requirements Document** (`prd-template.md`)
3. **Technical Specification** (`technical-template.md`)
4. **Meeting Summary** (`meeting-template.md`)

## Implementation Steps

### Step 1: Create Template Directory Structure
**Location**: `extension/templates/`

Create the following directory structure:
```
templates/
├── help-template.md
├── prd-template.md
├── technical-template.md
├── meeting-template.md
└── README.md
```

### Step 2: Implement Help Documentation Template
**File**: `extension/templates/help-template.md`

Create a comprehensive help documentation template with:
- **Frontmatter**: Template metadata with variables
- **Content Structure**: Getting started, API reference, examples, troubleshooting, FAQ
- **Variables**: Project name, description, installation steps, usage examples

**Required Variables**:
- `projectName` (string, required)
- `projectDescription` (string, required)
- `installationSteps` (array, optional)
- `mainFeatures` (array, required)
- `apiEndpoints` (array, optional)
- `commonIssues` (array, optional)
- `contactInfo` (string, optional)

### Step 3: Implement PRD Template
**File**: `extension/templates/prd-template.md`

Create a product requirements document template with:
- **Frontmatter**: PRD-specific metadata
- **Content Structure**: Overview, user stories, acceptance criteria, success metrics, timeline
- **Variables**: Product details, stakeholders, requirements, metrics

**Required Variables**:
- `productName` (string, required)
- `productVision` (string, required)
- `targetAudience` (array, required)
- `businessGoals` (array, required)
- `userStories` (array, optional)
- `acceptanceCriteria` (array, optional)
- `successMetrics` (array, optional)
- `timeline` (string, optional)
- `stakeholders` (array, optional)

### Step 4: Implement Technical Specification Template
**File**: `extension/templates/technical-template.md`

Create a technical specification template with:
- **Frontmatter**: Technical documentation metadata
- **Content Structure**: Architecture, API specs, database schema, deployment, testing
- **Variables**: System architecture, technologies, APIs, database design

**Required Variables**:
- `systemName` (string, required)
- `architectureType` (select: ["microservices", "monolith", "serverless"], required)
- `technologies` (array, required)
- `apiEndpoints` (array, optional)
- `databaseTables` (array, optional)
- `deploymentStrategy` (string, optional)
- `testingApproach` (string, optional)
- `securityRequirements` (array, optional)

### Step 5: Implement Meeting Summary Template
**File**: `extension/templates/meeting-template.md`

Create a meeting summary template with:
- **Frontmatter**: Meeting-specific metadata
- **Content Structure**: Meeting details, agenda, decisions, action items, follow-ups
- **Variables**: Meeting information, participants, outcomes

**Required Variables**:
- `meetingTitle` (string, required)
- `meetingDate` (date, required)
- `participants` (array, required)
- `meetingType` (select: ["planning", "review", "standup", "retrospective"], required)
- `duration` (string, optional)
- `agenda` (array, optional)
- `decisions` (array, optional)
- `actionItems` (array, optional)
- `nextSteps` (array, optional)

### Step 6: Template Frontmatter Format
Each template must include YAML frontmatter with the following structure:

```yaml
---
name: "Template Name"
description: "Template description"
category: "documentation|planning|technical|meeting"
version: "1.0.0"
author: "Documentation Generator"
tags: ["tag1", "tag2"]
variables:
  - name: "variableName"
    type: "string|number|boolean|date|array|select"
    required: true|false
    description: "Variable description"
    default: "default value"
    options: ["option1", "option2"] # for select type
    validation:
      minLength: 1
      maxLength: 100
      pattern: "regex pattern"
---
```

### Step 7: Variable Processing Implementation
**Files to modify**:
- `extension/src/templates/TemplateManager.ts` (variable substitution)
- `extension/src/generators/*.ts` (pass analysis data as variables)

**Variable Substitution**:
- Basic variables: `{{variableName}}`
- Array iteration: `{{#array}}...{{/array}}`
- Conditional content: `{{#if condition}}...{{/if}}`
- Analysis data: `{{analysis.projectName}}`, `{{analysis.dependencies}}`

### Step 8: Update Template Manager Integration
**File**: `extension/src/templates/TemplateManager.ts`

Ensure the following methods work with new templates:
- `loadTemplate(templateType: string)` - Load template by type
- `processTemplate(content: string, variables: object)` - Variable substitution
- `validateTemplate(template: Template)` - Validate template structure
- `getTemplateVariables(templateType: string)` - Extract required variables

### Step 9: Update Generator Services
**Files**: `extension/src/generators/*.ts`

Update each generator to:
- Map `FolderContext` data to template variables
- Provide default values for optional variables
- Handle missing template gracefully
- Pass analysis results as template variables

**Example Integration**:
```typescript
const templateVariables = {
  projectName: analysisResult.name,
  projectDescription: analysisResult.summary,
  mainFeatures: this.extractFeatures(analysisResult),
  dependencies: analysisResult.dependencies.map(dep => dep.packageName),
  // ... other mapped variables
};

const content = await this.templateManager.processTemplate(template.content, templateVariables);
```

### Step 10: Template Testing
**File**: `extension/src/test/template-integration.test.ts`

Create tests for:
- Template loading and validation
- Variable substitution
- Content generation with real data
- Error handling for missing variables
- All template types generation

### Step 11: Template Documentation
**File**: `extension/templates/README.md`

Create documentation covering:
- Template structure and format
- Available variables for each template type
- Customization guidelines
- Creating new templates
- Variable types and validation rules

## Template Content Specifications

### Help Documentation Template Structure
```markdown
# {{projectName}} - User Guide

## Overview
{{projectDescription}}

## Getting Started
{{#installationSteps}}
1. {{.}}
{{/installationSteps}}

## Features
{{#mainFeatures}}
- **{{name}}**: {{description}}
{{/mainFeatures}}

## API Reference
{{#apiEndpoints}}
### {{method}} {{endpoint}}
{{description}}
{{/apiEndpoints}}

## Troubleshooting
{{#commonIssues}}
### {{issue}}
{{solution}}
{{/commonIssues}}

## FAQ
{{#faq}}
**Q: {{question}}**
A: {{answer}}
{{/faq}}
```

### PRD Template Structure
```markdown
# {{productName}} - Product Requirements Document

## Product Vision
{{productVision}}

## Target Audience
{{#targetAudience}}
- {{.}}
{{/targetAudience}}

## Business Goals
{{#businessGoals}}
- {{.}}
{{/businessGoals}}

## User Stories
{{#userStories}}
### {{title}}
**As a** {{role}}
**I want** {{want}}
**So that** {{benefit}}

**Acceptance Criteria:**
{{#acceptanceCriteria}}
- {{.}}
{{/acceptanceCriteria}}
{{/userStories}}

## Success Metrics
{{#successMetrics}}
- {{metric}}: {{target}}
{{/successMetrics}}
```

### Technical Specification Template Structure
```markdown
# {{systemName}} - Technical Specification

## Architecture Overview
**Type**: {{architectureType}}

## Technology Stack
{{#technologies}}
- **{{category}}**: {{technology}}
{{/technologies}}

## API Specification
{{#apiEndpoints}}
### {{method}} {{endpoint}}
{{description}}

**Request:**
```json
{{requestExample}}
```

**Response:**
```json
{{responseExample}}
```
{{/apiEndpoints}}

## Database Schema
{{#databaseTables}}
### {{tableName}}
{{description}}

| Column | Type | Description |
|--------|------|-------------|
{{#columns}}
| {{name}} | {{type}} | {{description}} |
{{/columns}}
{{/databaseTables}}
```

### Meeting Summary Template Structure
```markdown
# {{meetingTitle}}

**Date**: {{meetingDate}}
**Duration**: {{duration}}
**Type**: {{meetingType}}

## Participants
{{#participants}}
- {{name}} ({{role}})
{{/participants}}

## Agenda
{{#agenda}}
1. {{.}}
{{/agenda}}

## Decisions Made
{{#decisions}}
- **{{decision}}**: {{rationale}}
{{/decisions}}

## Action Items
{{#actionItems}}
- [ ] {{task}} ({{assignee}} - {{dueDate}})
{{/actionItems}}

## Next Steps
{{#nextSteps}}
- {{.}}
{{/nextSteps}}
```

## Expected Outcomes

After implementation:
- ✅ Four comprehensive default templates available
- ✅ Rich variable system with validation
- ✅ Analysis data automatically mapped to template variables
- ✅ Professional, consistent documentation output
- ✅ Template customization capabilities
- ✅ Fallback handling for missing templates

## Verification Checklist

- [ ] Template files created in correct directory
- [ ] Valid YAML frontmatter in all templates
- [ ] All required variables defined with proper types
- [ ] Template content uses variable substitution syntax
- [ ] TemplateManager loads templates successfully
- [ ] Generator services map analysis data to variables
- [ ] Variable validation working correctly
- [ ] Generated documentation follows template structure
- [ ] Error handling for missing/invalid variables
- [ ] Template documentation complete

## Next Steps After Implementation

1. **Enhanced Templates**: Add more specialized templates (API docs, deployment guides)
2. **Template Marketplace**: Enable sharing and downloading community templates
3. **Template Editor**: Create VS Code UI for template editing and preview
4. **Variable Intelligence**: Auto-suggest variables based on project analysis
5. **Template Versioning**: Support template updates and backwards compatibility

## Template File Priority

**High Priority** (implement first):
1. `help-template.md` - Most commonly used
2. `prd-template.md` - Business stakeholder value

**Medium Priority**:
3. `technical-template.md` - Developer documentation

**Low Priority**:
4. `meeting-template.md` - Specialized use case

This prioritization allows for incremental implementation and testing.