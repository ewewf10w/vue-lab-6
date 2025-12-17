<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div>
    <Header />
    <main class="min-h-screen bg-gray-50 pt-4">
      <router-view />
    </main>
  </div>
</template>
