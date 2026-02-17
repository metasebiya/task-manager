# Spec-Driven Task Manager Constitution

## Core Principles

### I. Spec-Driven Development (SDD)
The API/Model specification is the single source of truth.
- **Rule**: Create `src/specs/schema.ts` using Zod before writing any implementation code.
- **Rule**: All implementation types must be inferred from the Zod schema.
- **Rule**: UI and Database are implementation details; the Spec is the Contract.

### II. Clean Architecture
Strict separation of concerns is enforced.
- **/types**: Specifications and Zod schemas.
- **/services**: Business logic and data fetching.
- **/components**: Atomic UI components.
- **/app/api**: Clean controllers that call services.

## Technology Stack

### Frontend & State
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS, Lucide React (Modern, minimalist dark/light mode)
- **State Management**: TanStack Query (Server state), React Context (Client state if needed)

### Backend & Validation
- **API**: Next.js Route Handlers
- **Validation**: Zod (Runtime), TypeScript (Build-time)

## Development Workflow

1. **Define the Spec**: Update `src/specs/schema.ts`.
2. **API Design**: Implement Route Handlers with mocked latency (500ms).
3. **Service Layer**: Implement logical services to handle data fetching/mutation.
4. **UI Implementation**: Build components and pages using the services.

## Code Quality Standards

- **Strict Typing**: `no any` usage. Types inferred from Spec.
- **Error Handling**: Functional error handling (return data/error objects).
- **Git Workflow**: Descriptive commits for each logical block.
