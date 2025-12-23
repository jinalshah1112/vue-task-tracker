<script setup lang="ts">
/**
 * Root App Component
 * Provides the main layout wrapper for the application
 */
import MainLayout from './layouts/MainLayout.vue'
</script>

<template>
  <MainLayout />
</template>

<style lang="scss">
// Global styles applied at app level
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}
</style>

