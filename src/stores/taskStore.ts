/**
 * Task Store
 * Manages all task-related state and operations
 * Uses Pinia for state management and Quasar LocalStorage for persistence
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { LocalStorage, Notify } from 'quasar'
import type { Task, TaskFilter, TaskStats } from '@/types/task'

/** LocalStorage key for persisting tasks */
const STORAGE_KEY = 'taskflow-tasks'

/**
 * Generates a unique ID for new tasks
 * Uses timestamp + random string for uniqueness
 * @returns Unique task ID string
 */
const generateId = (): string => {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Validates that a value is a valid Task array
 * @param data - Data to validate
 * @returns Boolean indicating if data is valid Task[]
 */
const isValidTaskArray = (data: unknown): data is Task[] => {
  if (!Array.isArray(data)) return false
  
  return data.every((item): item is Task => {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.text === 'string' &&
      typeof item.completed === 'boolean' &&
      typeof item.createdAt === 'number'
    )
  })
}

/**
 * Task Store - Manages all task-related state and operations
 */
export const useTaskStore = defineStore('tasks', () => {
  // State: List of all tasks
  const tasks = ref<Task[]>(loadTasksFromStorage())

  /**
   * Load tasks from localStorage on initialization
   * Includes validation and error handling
   * @returns Array of tasks or empty array on error
   */
  function loadTasksFromStorage(): Task[] {
    try {
      // Get stored data - Quasar's LocalStorage returns the parsed JSON
      const stored = LocalStorage.getItem(STORAGE_KEY) as Task[] | null
      
      if (stored === null) {
        return []
      }
      
      if (!isValidTaskArray(stored)) {
        // eslint-disable-next-line no-console
        console.warn('[TaskStore] Invalid data in localStorage, resetting tasks')
        LocalStorage.remove(STORAGE_KEY)
        return []
      }
      
      return stored
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[TaskStore] Error loading tasks from storage:', error)
      return []
    }
  }

  /**
   * Save current tasks to localStorage
   * Includes error handling with user notification
   */
  function saveTasksToStorage(): void {
    try {
      LocalStorage.set(STORAGE_KEY, tasks.value)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[TaskStore] Error saving tasks to storage:', error)
      Notify.create({
        type: 'negative',
        message: 'Failed to save tasks. Storage might be full.',
        icon: 'error'
      })
    }
  }

  /**
   * Computed: Get statistics about tasks
   * Returns reactive stats object
   */
  const stats = computed<TaskStats>(() => ({
    total: tasks.value.length,
    completed: tasks.value.filter(task => task.completed).length,
    pending: tasks.value.filter(task => !task.completed).length
  }))

  /**
   * Get filtered tasks based on filter type
   * @param filter - The filter type to apply
   * @returns Filtered array of tasks
   */
  function getFilteredTasks(filter: TaskFilter): Task[] {
    switch (filter) {
      case 'completed':
        return tasks.value.filter(task => task.completed)
      case 'pending':
        return tasks.value.filter(task => !task.completed)
      case 'all':
      default:
        return tasks.value
    }
  }

  /**
   * Add a new task
   * @param text - The task description (will be trimmed)
   * @returns The newly created task
   * @throws Error if text is empty after trimming
   */
  function addTask(text: string): Task {
    const trimmedText = text.trim()
    
    if (!trimmedText) {
      throw new Error('Task text cannot be empty')
    }
    
    const newTask: Task = {
      id: generateId(),
      text: trimmedText,
      completed: false,
      createdAt: Date.now()
    }
    
    tasks.value.unshift(newTask)
    saveTasksToStorage()
    
    return newTask
  }

  /**
   * Toggle the completed status of a task
   * @param id - The task ID to toggle
   * @returns Boolean indicating if task was found and toggled
   */
  function toggleTask(id: string): boolean {
    const task = tasks.value.find(t => t.id === id)
    
    if (!task) {
      // eslint-disable-next-line no-console
      console.warn(`[TaskStore] Task with id "${id}" not found`)
      return false
    }
    
    task.completed = !task.completed
    saveTasksToStorage()
    return true
  }

  /**
   * Delete a task by ID
   * @param id - The task ID to delete
   * @returns Boolean indicating if task was found and deleted
   */
  function deleteTask(id: string): boolean {
    const index = tasks.value.findIndex(t => t.id === id)
    
    if (index === -1) {
      // eslint-disable-next-line no-console
      console.warn(`[TaskStore] Task with id "${id}" not found`)
      return false
    }
    
    tasks.value.splice(index, 1)
    saveTasksToStorage()
    return true
  }

  /**
   * Clear all completed tasks
   * @returns Number of tasks cleared
   */
  function clearCompleted(): number {
    const completedCount = tasks.value.filter(t => t.completed).length
    tasks.value = tasks.value.filter(t => !t.completed)
    saveTasksToStorage()
    return completedCount
  }

  /**
   * Update task text
   * @param id - The task ID to update
   * @param text - The new task text (will be trimmed)
   * @returns Boolean indicating if task was found and updated
   */
  function updateTask(id: string, text: string): boolean {
    const task = tasks.value.find(t => t.id === id)
    
    if (!task) {
      // eslint-disable-next-line no-console
      console.warn(`[TaskStore] Task with id "${id}" not found`)
      return false
    }
    
    const trimmedText = text.trim()
    if (!trimmedText) {
      // eslint-disable-next-line no-console
      console.warn('[TaskStore] Cannot update task with empty text')
      return false
    }
    
    task.text = trimmedText
    saveTasksToStorage()
    return true
  }

  return {
    // State
    tasks,
    // Computed
    stats,
    // Actions
    getFilteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    updateTask
  }
})
