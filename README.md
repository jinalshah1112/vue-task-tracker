# TaskFlow 📋

A modern Task Tracker single-page application built with **Vue 3**, **Quasar Framework**, **TypeScript**, and **Pinia**.

![Vue 3](https://img.shields.io/badge/Vue-3.4-4FC08D?style=flat-square&logo=vue.js)
![Quasar](https://img.shields.io/badge/Quasar-2.17-1976D2?style=flat-square&logo=quasar)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Pinia](https://img.shields.io/badge/Pinia-2.2-FFD859?style=flat-square)

## ✨ Features

- ➕ **Add Tasks** - Create new tasks with validation
- ✅ **Toggle Completion** - Mark tasks as completed or pending
- 🗑️ **Delete Tasks** - Remove individual tasks with confirmation
- 🔍 **Filter Tasks** - View All, Completed, or Pending tasks
- 📊 **Task Statistics** - See total, completed, and pending counts
- 💾 **LocalStorage Persistence** - Tasks persist across browser sessions
- 🎨 **Beautiful UI** - Modern dark theme with smooth animations

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | Frontend framework with Composition API |
| Quasar Framework | UI component library |
| TypeScript | Type-safe JavaScript |
| Pinia | State management |
| Vue Router | Client-side routing |
| SCSS | Styling with variables and nesting |
| Vite | Build tool and dev server |

## 📁 Project Structure

```
taskflow/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── main.scss           # Global styles
│   │       └── quasar-variables.scss # Quasar theme
│   ├── components/
│   │   ├── TaskInput.vue           # Add task form
│   │   ├── TaskItem.vue            # Single task display
│   │   ├── TaskList.vue            # Task list container
│   │   ├── TaskStats.vue           # Statistics display
│   │   └── TaskFilters.vue         # Filter navigation
│   ├── layouts/
│   │   └── MainLayout.vue          # App layout wrapper
│   ├── pages/
│   │   └── TasksPage.vue           # Main tasks page
│   ├── router/
│   │   └── index.ts                # Vue Router config
│   ├── stores/
│   │   └── taskStore.ts            # Pinia task store
│   ├── types/
│   │   └── task.ts                 # TypeScript interfaces
│   ├── App.vue                     # Root component
│   ├── main.ts                     # App entry point
│   └── env.d.ts                    # Type declarations
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:9000
   ```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/all` |
| `/all` | Shows all tasks |
| `/completed` | Shows completed tasks only |
| `/pending` | Shows pending tasks only |

## 🔧 Key Implementation Details

### State Management (Pinia)

The task store (`src/stores/taskStore.ts`) manages:
- Task CRUD operations
- LocalStorage persistence using Quasar's LocalStorage plugin
- Computed statistics for task counts
- Filtered task getters

### Component Architecture

- **Props & Emits**: Components use TypeScript-typed props and emits
- **Composition API**: All components use `<script setup>` syntax
- **Separation of Concerns**: Each component has a single responsibility

### Styling

- SCSS modules with scoped styles
- Quasar utility classes for rapid development
- CSS animations for enhanced UX
- Catppuccin-inspired dark theme

## 📸 Screenshots

### All Tasks View
The main dashboard showing all tasks with statistics.

### Completed Tasks
Filter view showing only completed tasks.

### Pending Tasks
Filter view showing only pending tasks.

## 📝 License

MIT License - feel free to use this project for learning or as a starting point for your own projects.

---

Built with ❤️ using Vue 3 & Quasar Framework

