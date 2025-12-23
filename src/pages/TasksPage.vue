<script setup lang="ts">
/**
 * TasksPage Component
 * Main page displaying task management functionality
 * Handles all task operations and connects components to the store
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskFilter } from '@/types/task'

// Components
import TaskInput from '@/components/TaskInput.vue'
import TaskList from '@/components/TaskList.vue'
import TaskStats from '@/components/TaskStats.vue'
import TaskFilters from '@/components/TaskFilters.vue'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'TasksPage'
})

const $q = useQuasar()
const route = useRoute()
const taskStore = useTaskStore()

/**
 * Get current filter from route meta
 * Defaults to 'all' if not specified
 */
const currentFilter = computed<TaskFilter>(() => {
  return (route.meta.filter as TaskFilter) ?? 'all'
})

/**
 * Get filtered tasks based on current route
 * Uses store's getFilteredTasks method
 */
const filteredTasks = computed(() => {
  return taskStore.getFilteredTasks(currentFilter.value)
})

/**
 * Get page title based on current filter
 * Defaults to 'All Tasks' if not specified
 */
const pageTitle = computed<string>(() => {
  return (route.meta.title as string) ?? 'All Tasks'
})

/**
 * Get icon name based on current filter
 */
const filterIcon = computed<string>(() => {
  switch (currentFilter.value) {
    case 'completed':
      return 'task_alt'
    case 'pending':
      return 'pending_actions'
    default:
      return 'list'
  }
})

/**
 * Handle adding a new task
 * @param text - The task description from TaskInput
 */
const handleAddTask = (text: string): void => {
  taskStore.addTask(text)
}

/**
 * Handle toggling task completion
 * @param id - The task ID to toggle
 */
const handleToggleTask = (id: string): void => {
  taskStore.toggleTask(id)
}

/**
 * Handle deleting a task with confirmation dialog
 * @param id - The task ID to delete
 */
const handleDeleteTask = (id: string): void => {
  $q.dialog({
    title: 'Delete Task',
    message: 'Are you sure you want to delete this task?',
    cancel: {
      label: 'Cancel',
      flat: true
    },
    ok: {
      label: 'Delete',
      color: 'negative'
    },
    persistent: true,
    dark: true
  }).onOk(() => {
    taskStore.deleteTask(id)
    $q.notify({
      type: 'info',
      message: 'Task deleted',
      icon: 'delete'
    })
  })
}

/**
 * Handle clearing all completed tasks with confirmation dialog
 */
const handleClearCompleted = (): void => {
  const completedCount = taskStore.stats.completed
  
  if (completedCount === 0) {
    return
  }
  
  $q.dialog({
    title: 'Clear Completed',
    message: `Remove all ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`,
    cancel: {
      label: 'Cancel',
      flat: true
    },
    ok: {
      label: 'Clear',
      color: 'negative'
    },
    persistent: true,
    dark: true
  }).onOk(() => {
    taskStore.clearCompleted()
    $q.notify({
      type: 'info',
      message: 'Completed tasks cleared',
      icon: 'delete_sweep'
    })
  })
}
</script>

<template>
  <q-page class="tasks-page">
    <div class="page-container">
      <!-- Stats Section -->
      <section class="stats-section" aria-label="Task statistics">
        <TaskStats
          :stats="taskStore.stats"
          @clear-completed="handleClearCompleted"
        />
      </section>

      <!-- Input Section -->
      <section class="input-section" aria-label="Add new task">
        <TaskInput @add="handleAddTask" />
      </section>

      <!-- Filters Section -->
      <section class="filters-section" aria-label="Task filters">
        <TaskFilters />
      </section>

      <!-- Page Title -->
      <h2 class="section-title">
        <q-icon
          :name="filterIcon"
          size="24px"
          class="title-icon"
          aria-hidden="true"
        />
        {{ pageTitle }}
        <q-badge
          color="primary"
          :label="filteredTasks.length"
          class="count-badge"
          :aria-label="`${filteredTasks.length} tasks`"
        />
      </h2>

      <!-- Task List Section -->
      <section class="list-section" aria-label="Task list">
        <TaskList
          :tasks="filteredTasks"
          :filter="currentFilter"
          @toggle="handleToggleTask"
          @delete="handleDeleteTask"
        />
      </section>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.tasks-page {
  padding: 24px;
  min-height: calc(100vh - 120px);
}

.page-container {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-section {
  animation: fadeIn 0.3s ease-out;
}

.input-section {
  animation: fadeIn 0.3s ease-out 0.1s both;
}

.filters-section {
  animation: fadeIn 0.3s ease-out 0.2s both;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #cdd6f4;
  animation: fadeIn 0.3s ease-out 0.3s both;
}

.title-icon {
  color: #6366f1;
}

.count-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

.list-section {
  animation: fadeIn 0.3s ease-out 0.4s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .tasks-page {
    padding: 16px;
  }
  
  .page-container {
    gap: 16px;
  }
}
</style>
