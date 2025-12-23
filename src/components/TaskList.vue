<script setup lang="ts">
/**
 * TaskList Component
 * Displays a list of tasks based on the current filter
 * Shows appropriate empty state message when no tasks match filter
 * 
 * @props tasks - Array of tasks to display
 * @props filter - Current filter type for empty state messaging
 * @emits toggle - Emitted when a task's completion is toggled
 * @emits delete - Emitted when a task deletion is requested
 */
import { computed } from 'vue'
import type { Task, TaskFilter } from '@/types/task'
import TaskItem from './TaskItem.vue'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'TaskList'
})

// Define props interface
interface Props {
  /** Array of tasks to display */
  tasks: Task[]
  /** Current active filter for empty state messaging */
  filter: TaskFilter
}

const props = withDefaults(defineProps<Props>(), {
  tasks: () => [],
  filter: 'all'
})

// Define emits with named tuple syntax
const emit = defineEmits<{
  /** Emitted when task completion status is toggled */
  toggle: [id: string]
  /** Emitted when task deletion is requested */
  delete: [id: string]
}>()

/**
 * Empty state message configuration based on current filter
 */
const EMPTY_MESSAGES: Record<TaskFilter, { message: string; icon: string }> = {
  completed: { message: 'No completed tasks yet', icon: 'check_circle_outline' },
  pending: { message: 'All tasks are complete! 🎉', icon: 'celebration' },
  all: { message: 'No tasks yet. Add one above!', icon: 'inbox' }
} as const

/**
 * Get empty state message based on current filter
 */
const emptyMessage = computed<string>(() => {
  return EMPTY_MESSAGES[props.filter].message
})

/**
 * Get empty state icon based on current filter
 */
const emptyIcon = computed<string>(() => {
  return EMPTY_MESSAGES[props.filter].icon
})

/**
 * Check if task list is empty
 */
const isEmpty = computed<boolean>(() => props.tasks.length === 0)
</script>

<template>
  <div class="task-list" role="region" aria-label="Task list">
    <!-- Task items with transition animations -->
    <TransitionGroup 
      name="list" 
      tag="div" 
      class="tasks-container"
      role="list"
    >
      <TaskItem
        v-for="task in props.tasks"
        :key="task.id"
        :task="task"
        role="listitem"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </TransitionGroup>
    
    <!-- Empty state -->
    <div 
      v-if="isEmpty" 
      class="empty-state"
      role="status"
      aria-live="polite"
    >
      <q-icon :name="emptyIcon" size="64px" color="grey-6" aria-hidden="true" />
      <p class="empty-message">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-list {
  width: 100%;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.empty-message {
  margin-top: 16px;
  color: #6c7086;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
}

// List transition animations
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
