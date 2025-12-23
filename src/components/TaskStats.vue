<script setup lang="ts">
/**
 * TaskStats Component
 * Displays task statistics including total, completed, and pending counts
 * Provides action to clear all completed tasks
 * 
 * @props stats - Task statistics object containing counts
 * @emits clearCompleted - Emitted when user wants to clear completed tasks
 */
import type { TaskStats } from '@/types/task'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'TaskStats'
})

// Define props interface
interface Props {
  /** Task statistics object */
  stats: TaskStats
}

// Use withDefaults for proper default values
const props = withDefaults(defineProps<Props>(), {
  stats: () => ({ total: 0, completed: 0, pending: 0 })
})

// Define emits with named tuple syntax
const emit = defineEmits<{
  /** Emitted when clear completed button is clicked */
  clearCompleted: []
}>()

/**
 * Stats card configuration for consistent rendering
 */
const STAT_CARDS = [
  { key: 'total', label: 'Total', icon: 'format_list_bulleted', cssClass: 'total' },
  { key: 'pending', label: 'Pending', icon: 'pending_actions', cssClass: 'pending' },
  { key: 'completed', label: 'Done', icon: 'task_alt', cssClass: 'completed' }
] as const

/**
 * Check if there are completed tasks to clear
 */
const hasCompletedTasks = (): boolean => props.stats.completed > 0

/**
 * Handle clear completed button click
 */
const handleClearCompleted = (): void => {
  emit('clearCompleted')
}
</script>

<template>
  <div class="task-stats" role="region" aria-label="Task statistics">
    <!-- Stats cards -->
    <div class="stats-grid">
      <div 
        v-for="card in STAT_CARDS"
        :key="card.key"
        class="stat-card"
        :class="card.cssClass"
        role="status"
        :aria-label="`${props.stats[card.key]} ${card.label.toLowerCase()} tasks`"
      >
        <q-icon :name="card.icon" size="24px" aria-hidden="true" />
        <div class="stat-info">
          <span class="stat-value">{{ props.stats[card.key] }}</span>
          <span class="stat-label">{{ card.label }}</span>
        </div>
      </div>
    </div>
    
    <!-- Clear completed button -->
    <q-btn
      v-if="hasCompletedTasks()"
      flat
      dense
      no-caps
      color="negative"
      icon="delete_sweep"
      label="Clear completed"
      class="clear-btn"
      aria-label="Clear all completed tasks"
      @click="handleClearCompleted"
    />
  </div>
</template>

<style lang="scss" scoped>
.task-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(49, 50, 68, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(49, 50, 68, 0.8);
  }
  
  &.total {
    color: #6366f1;
    border-color: rgba(99, 102, 241, 0.2);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    }
  }
  
  &.pending {
    color: #f59e0b;
    border-color: rgba(245, 158, 11, 0.2);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
    }
  }
  
  &.completed {
    color: #22c55e;
    border-color: rgba(34, 197, 94, 0.2);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
    }
  }
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #a6adc8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.clear-btn {
  align-self: flex-start;
  border-radius: 8px;
  font-family: 'Space Grotesk', sans-serif;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
