<script setup lang="ts">
/**
 * TaskInput Component
 * Allows users to add new tasks with validation
 * 
 * @emits add - Emitted when a valid task is submitted with the task text
 */
import { ref } from 'vue'
import { useQuasar } from 'quasar'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'TaskInput'
})

// Define emits with proper TypeScript typing
const emit = defineEmits<{
  /**
   * Emitted when a new task is added
   * @param text - The trimmed task description
   */
  add: [text: string]
}>()

const $q = useQuasar()

// Local state for input value
const taskText = ref<string>('')

/**
 * Handle form submission
 * Validates input is not empty and emits add event
 */
const handleSubmit = (): void => {
  const text = taskText.value.trim()
  
  // Guard clause: validate input is not empty
  if (!text) {
    $q.notify({
      type: 'warning',
      message: 'Please enter a task name',
      icon: 'warning'
    })
    return
  }
  
  emit('add', text)
  taskText.value = ''
  
  $q.notify({
    type: 'positive',
    message: 'Task added successfully!',
    icon: 'check_circle'
  })
}
</script>

<template>
  <q-form 
    @submit.prevent="handleSubmit" 
    class="task-input-form"
    aria-label="Add new task form"
  >
    <div class="input-wrapper">
      <q-input
        id="task-input"
        name="taskText"
        v-model="taskText"
        placeholder="What needs to be done?"
        outlined
        dark
        dense
        class="task-input"
        autofocus
        aria-label="Task description"
        maxlength="200"
        autocomplete="off"
      >
        <template #prepend>
          <q-icon name="add_task" color="primary" />
        </template>
      </q-input>
      
      <q-btn
        type="submit"
        color="primary"
        icon="add"
        label="Add Task"
        class="add-btn"
        unelevated
        no-caps
        aria-label="Add new task"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.task-input-form {
  width: 100%;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.task-input {
  flex: 1;
  
  :deep(.q-field__control) {
    background: rgba(49, 50, 68, 0.8);
    border-radius: 12px;
    
    &::before {
      border-color: rgba(99, 102, 241, 0.3);
    }
    
    &:hover::before {
      border-color: rgba(99, 102, 241, 0.5);
    }
  }
  
  :deep(.q-field--focused .q-field__control) {
    &::before {
      border-color: #6366f1;
    }
  }
  
  :deep(.q-field__native) {
    color: #cdd6f4;
    font-family: 'JetBrains Mono', monospace;
    
    &::placeholder {
      color: #6c7086;
    }
  }
}

.add-btn {
  border-radius: 12px;
  padding: 0 24px;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }
}
</style>
