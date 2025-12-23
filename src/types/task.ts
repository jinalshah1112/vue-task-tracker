/**
 * Task Types
 * Centralized type definitions for the TaskFlow application
 */

/**
 * Task interface defining the structure of a task item
 */
export interface Task {
  /** Unique identifier for the task */
  id: string
  /** The task description/name (max 200 characters) */
  text: string
  /** Whether the task is completed */
  completed: boolean
  /** Timestamp when the task was created (Unix milliseconds) */
  createdAt: number
}

/**
 * Filter types for task list views
 * - 'all': Show all tasks
 * - 'completed': Show only completed tasks
 * - 'pending': Show only pending tasks
 */
export type TaskFilter = 'all' | 'completed' | 'pending'

/**
 * Task statistics for display in TaskStats component
 */
export interface TaskStats {
  /** Total number of tasks */
  total: number
  /** Number of completed tasks */
  completed: number
  /** Number of pending tasks */
  pending: number
}

/**
 * Route meta interface for type-safe route metadata
 * Used with Vue Router for filter-based navigation
 */
export interface TaskRouteMeta {
  /** Current filter type for the route */
  filter: TaskFilter
  /** Page title to display */
  title: string
}
