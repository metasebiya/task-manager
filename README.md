# Spec-Driven Task Manager

A robust, spec-driven Task Manager application built with **Next.js 14+** (App Router), **TypeScript**, **Tailwind CSS**, and **Zod**.

This project follows a strict **Spec-Driven Development (SDD)** methodology where the Zod schema acts as the single source of truth for both the API contract and frontend types.

![Task Manager Preview](https://placehold.co/1200x600/e0e7ff/4f46e5?text=Task+Manager+Preview)

## ✨ Features

-   **Full CRUD**: Create, Read, Update, and Delete tasks seamlessly.
-   **Spec-Driven Architecture**: Types and API validation derived directly from Zod schemas.
-   **Optimistic UI**: Instant feedback on interactions using **TanStack Query**.
-   **Responsive Design**: Modern UI built with Tailwind CSS and Lucide React icons.
-   **Task Filtering**: Filter tasks by status (All, Todo, Done).
-   **Form Validation**: Robust client-side validation using **React Hook Form** + **Zod**.
-   **In-Memory Store**: Mock backend with simulated latency for realistic development testing.

## 🛠 Tech Stack

-   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Validation & Schema**: [Zod](https://zod.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [clsx](https://github.com/lukeed/clsx)
-   **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
-   **Forms**: [React Hook Form](https://react-hook-form.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/task-manager.git
    cd task-manager
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

The project follows a clean architecture separating concerns:

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/tasks/        # Backend API endpoints (GET, POST, PUT, DELETE)
│   └── page.tsx          # Main Dashboard Page
├── components/           # Reusable UI components (TaskForm, TaskList, TaskItem)
├── services/             # Business logic and API fetchers
│   ├── store.ts          # In-memory mock database
│   └── task.service.ts   # Client-side service layer
├── specs/                # Single Source of Truth
│   └── schema.ts         # Zod schemas defining the Data Model
└── types/                # Inferred TypeScript types
    └── index.ts          # Types exported from Zod schemas
```

## 🧠 Spec-Driven Development (SDD) Workflow

1.  **Define the Spec**: All changes start in `src/specs/schema.ts`.
2.  **Infer Types**: TypeScript interfaces are automatically derived in `src/types/index.ts`.
3.  **Implement API**: Backend handlers validate incoming data against the Zod schema.
4.  **Build UI**: Frontend forms use the same Zod schema for validation, ensuring end-to-end type safety.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
