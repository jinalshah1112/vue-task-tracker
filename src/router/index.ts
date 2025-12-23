/**
 * Vue Router Configuration
 * Defines routes for the TaskFlow application
 * Each route corresponds to a different task filter view
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { TaskFilter } from '@/types/task'

/**
 * Extended route meta interface for TypeScript support
 */
declare module 'vue-router' {
  interface RouteMeta {
    /** Current filter type for the route */
    filter?: TaskFilter
    /** Page title to display */
    title?: string
  }
}

/**
 * Application routes configuration
 * Uses lazy loading for the TasksPage component
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/all',
    meta: { filter: 'all', title: 'All Tasks' }
  },
  {
    path: '/all',
    name: 'all',
    component: () => import('@/pages/TasksPage.vue'),
    meta: { filter: 'all', title: 'All Tasks' }
  },
  {
    path: '/completed',
    name: 'completed',
    component: () => import('@/pages/TasksPage.vue'),
    meta: { filter: 'completed', title: 'Completed Tasks' }
  },
  {
    path: '/pending',
    name: 'pending',
    component: () => import('@/pages/TasksPage.vue'),
    meta: { filter: 'pending', title: 'Pending Tasks' }
  },
  {
    // Catch-all route - redirect unknown paths to /all
    path: '/:pathMatch(.*)*',
    redirect: '/all'
  }
]

/**
 * Create and export the router instance
 * Uses HTML5 history mode for clean URLs
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll to top on route change
  scrollBehavior: () => ({ top: 0 })
})

export default router
