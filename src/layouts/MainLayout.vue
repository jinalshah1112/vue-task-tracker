<script setup lang="ts">
/**
 * MainLayout Component
 * Provides the main application layout with header and content area
 * Used as the wrapper for all pages
 */
import { computed } from 'vue'

// Component name for Vue DevTools debugging
defineOptions({
  name: 'MainLayout'
})

/**
 * Get current year for footer copyright
 * Uses computed for reactivity (updates if year changes while app is open)
 */
const currentYear = computed<number>(() => new Date().getFullYear())
</script>

<template>
  <q-layout view="hHh lpR fFf" class="main-layout">
    <!-- Header -->
    <q-header elevated class="app-header">
      <q-toolbar class="header-toolbar">
        <div class="brand">
          <q-icon 
            name="track_changes" 
            size="32px" 
            color="primary" 
            class="brand-icon"
            aria-hidden="true"
          />
          <div class="brand-text">
            <h1 class="brand-title">TaskFlow</h1>
            <span class="brand-subtitle">Vue 3 Task Tracker</span>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Main content -->
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- Footer -->
    <q-footer class="app-footer">
      <div class="footer-content">
        <span>Built with</span>
        <q-icon 
          name="favorite" 
          color="negative" 
          size="16px" 
          class="heart-icon"
          aria-label="love"
        />
        <span>using Vue 3, Quasar & Pinia</span>
        <span class="divider" aria-hidden="true">•</span>
        <span>{{ currentYear }}</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  background: #1e1e2e;
}

.app-header {
  background: rgba(30, 30, 46, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.header-toolbar {
  max-width: 800px;
  margin: 0 auto;
  padding: 12px 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  animation: pulse 2s infinite;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.7rem;
  color: #6c7086;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.app-footer {
  background: transparent;
  padding: 16px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #6c7086;
  font-family: 'Space Grotesk', sans-serif;
}

.heart-icon {
  animation: heartbeat 1.5s ease-in-out infinite;
}

.divider {
  margin: 0 4px;
}

// Page transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@media (max-width: 480px) {
  .brand-subtitle {
    display: none;
  }
  
  .footer-content {
    flex-wrap: wrap;
    text-align: center;
  }
}
</style>
