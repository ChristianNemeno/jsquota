---
name: codegen-review
description: Step-by-step code generation with user code review before each file write. Records are batched per feature.
---

## When to use

Any task involving new file creation or edits to existing files.

## Workflow

### 1. Plan
User and assistant agree on which files to create/modify and their contents.

### 2. Propose
Assistant presents the full file contents with a brief explanation of what it does.

### 3. Review
User approves, requests changes, or rejects the proposal.

### 4. Write
Assistant writes the file only after receiving explicit approval.

### 5. Repeat
Back to step 2 for the next file.

### 6. Record
After the entire feature is complete, assistant writes a summary entry to `records/`.

## Rules

- No code is written without explicit user approval.
- The user reviews every file individually before it is written.
- Records are batched per feature, not per file.
