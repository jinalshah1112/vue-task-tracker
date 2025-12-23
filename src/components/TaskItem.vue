<script setup lang="ts">
/**
 * TaskItem Component
 * Displays a single task with toggle and delete actions
 * 
 * @props task - The task object to display
 * @emits toggle - Emitted when task completion is toggled
 * @emits delete - Emitted when task deletion is requested
 */
import { computed } from 'vue'
import type { Task } from '@/types/task'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'TaskItem'
})

// Define props with proper TypeScript interface
interface Props {
  /** The task object to display */
  task: Task
}

const props = defineProps<Props>()

// Define emits with named tuple syntax (Vue 3.3+)
const emit = defineEmits<{
  /** Emitted when task completion status is toggled */
  toggle: [id: string]
  /** Emitted when task deletion is requested */
  delete: [id: string]
}>()

/**
 * Format the creation date for display
 * Uses US locale with short month format
 */
const formattedDate = computed<string>(() => {
  const date = new Date(props.task.createdAt)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

/**
 * Handle task completion toggle
 * Emits toggle event with task ID
 */
const handleToggle = (): void => {
  emit('toggle', props.task.id)
}

/**
 * Handle task deletion
 * Emits delete event with task ID
 */
const handleDelete = (): void => {
  emit('delete', props.task.id)
}
</script>

<template>
  <q-card
    class="task-item"
    :class="{ completed: task.completed }"
    flat
    :aria-label="`Task: ${task.text}, ${task.completed ? 'completed' : 'pending'}`"
  >
    <q-card-section class="task-content">
      <!-- Checkbox for completion -->
      <q-checkbox
        :id="`task-checkbox-${task.id}`"
        :name="`task-${task.id}`"
        :model-value="task.completed"
        @update:model-value="handleToggle"
        color="positive"
        keep-color
        class="task-checkbox"
        :aria-label="`Mark task '${task.text}' as ${task.completed ? 'pending' : 'completed'}`"
      >
        <template #default>
          <div class="task-info">
            <span class="task-text">{{ task.text }}</span>
            <span class="task-date">{{ formattedDate }}</span>
          </div>
        </template>
      </q-checkbox>
      
      <!-- Delete button -->
      <q-btn
        flat
        round
        dense
        icon="delete_outline"
        color="negative"
        class="delete-btn"
        :aria-label="`Delete task: ${task.text}`"
        @click="handleDelete"
      >
        <q-tooltip>Delete task</q-tooltip>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.task-item {
  background: rgba(49, 50, 68, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.2s ease;
  animation: fadeIn 0.3s ease-out;
  
  &:hover {
    background: rgba(49, 50, 68, 0.9);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateX(4px);
    
    .delete-btn {
      opacity: 1;
    }
  }
  
  &.completed {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.2);
    
    .task-text {
      text-decoration: line-through;
      color: #6c7086;
    }
    
    .task-checkbox {
      :deep(.q-checkbox__inner) {
        color: #22c55e;
      }
    }
  }
}

.task-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.task-checkbox {
  flex: 1;
  
  :deep(.q-checkbox__label) {
    width: 100%;
  }
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
}

.task-text {
  color: #cdd6f4;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.task-date {
  color: #6c7086;
  font-size: 0.75rem;
  font-family: 'Space Grotesk', sans-serif;
}

.delete-btn {
  opacity: 0.5;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    background: rgba(239, 68, 68, 0.2);
  }
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
</style>
