<script setup lang="ts">
/**
 * TaskFilters Component
 * Navigation tabs for filtering tasks by status
 * Uses Vue Router for navigation between filter views
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TaskFilter } from '@/types/task'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'TaskFilters'
})

// Get current route for active tab highlighting
const route = useRoute()
const router = useRouter()

/**
 * Filter option interface for type safety
 */
interface FilterOption {
  label: string
  value: TaskFilter
  icon: string
}

/**
 * Define filter options with proper typing
 * Mutable array required by QBtnToggle component
 */
const FILTER_OPTIONS: FilterOption[] = [
  { label: 'All', value: 'all', icon: 'list' },
  { label: 'Pending', value: 'pending', icon: 'pending_actions' },
  { label: 'Completed', value: 'completed', icon: 'task_alt' }
]

/**
 * Get current active filter from route
 * Provides two-way binding for QBtnToggle
 */
const activeFilter = computed<TaskFilter>({
  get: (): TaskFilter => {
    return (route.meta.filter as TaskFilter) || 'all'
  },
  set: (value: TaskFilter): void => {
    router.push(`/${value}`)
  }
})
</script>

<template>
  <nav class="task-filters" aria-label="Task filter navigation">
    <q-btn-toggle
      v-model="activeFilter"
      toggle-color="primary"
      color="dark"
      text-color="grey-5"
      no-caps
      unelevated
      spread
      class="filter-toggle"
      :options="FILTER_OPTIONS"
      aria-label="Filter tasks by status"
    />
  </nav>
</template>

<style lang="scss" scoped>
.task-filters {
  width: 100%;
}

.filter-toggle {
  width: 100%;
  background: rgba(49, 50, 68, 0.6);
  border-radius: 12px;
  padding: 4px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  
  :deep(.q-btn) {
    border-radius: 8px !important;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(99, 102, 241, 0.2);
    }
  }
}
</style>
