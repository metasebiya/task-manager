# Tasks: Task Manager CRUD

**Input**: Design documents from `.specify/specs/`
**Prerequisites**: task-manager-crud-plan.md, task-manager-crud.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Scaffold Next.js 14 app with TypeScript, Tailwind, ESLint
- [ ] T002 Install dependencies: `zod`, `@tanstack/react-query`, `lucide-react`, `clsx`, `tailwind-merge`
- [ ] T003 Configure TanStack Query Provider in `src/app/providers.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and Spec that MUST be complete before ANY user story can be implemented

- [ ] T004 Create Zod Schema in `src/specs/schema.ts` (Source of Truth)
- [ ] T005 Infer and export TypeScript types in `src/types/index.ts` (or derived from spec)
- [ ] T006 Implement Mock In-Memory Store with 500ms delay simulator in `src/services/store.ts` (or similar utility)

**Checkpoint**: Foundation ready - Schema and Store are available.

---

## Phase 3: User Story 1 - Create a Task (Priority: P1)

**Goal**: Users can create a new task using a form.

- [ ] T007 [US1] Create `createTask` function in `src/services/task.service.ts`
- [ ] T008 [US1] Implement `POST /api/tasks` route handler
- [ ] T009 [US1] Create `TaskForm` component with Zod validation
- [ ] T010 [US1] Integrate `useMutation` for creating tasks

---

## Phase 4: User Story 2 - View Tasks (Priority: P1)

**Goal**: Users can see a list of tasks filtered by status.

- [ ] T011 [US2] Create `getTasks` function in `src/services/task.service.ts`
- [ ] T012 [US2] Implement `GET /api/tasks` route handler (support query params if needed)
- [ ] T013 [US2] Create `TaskItem` component
- [ ] T014 [US2] Create `TaskList` component with fetching logic (`useQuery`)
- [ ] T015 [US2] Implement Dashboard Page `src/app/page.tsx` using `TaskList` and `TaskForm`

---

## Phase 5: User Story 3 - Update a Task (Priority: P2)

**Goal**: Users can update task details and status.

- [ ] T016 [US3] Create `updateTask` function in `src/services/task.service.ts`
- [ ] T017 [US3] Implement `PUT /api/tasks/[id]` route handler
- [ ] T018 [US3] Add "Edit" mode to `TaskForm` (or reuse for updates)
- [ ] T019 [US3] Implement Optimistic Updates for Status change

---

## Phase 6: User Story 4 - Delete a Task (Priority: P3)

**Goal**: Users can delete tasks.

- [ ] T020 [US4] Create `deleteTask` function in `src/services/task.service.ts`
- [ ] T021 [US4] Implement `DELETE /api/tasks/[id]` route handler
- [ ] T022 [US4] Add "Delete" button to `TaskItem` with confirmation (optional) and Optimistic Update

---
