<script setup></script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <RouterLink to="/" class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl"
        >
          P
        </div>
        <span class="text-2xl font-bold text-gray-800">PomCRUD</span>
      </RouterLink>

      <nav class="space-x-8">
        <RouterLink
          to="/posts"
          class="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
          active-class="text-blue-600 border-b-2 border-blue-600 pb-1"
        >
          Посты
        </RouterLink>
        <RouterLink
          to="/categories"
          class="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
          active-class="text-blue-600 border-b-2 border-blue-600 pb-1"
        >
          Категории
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
