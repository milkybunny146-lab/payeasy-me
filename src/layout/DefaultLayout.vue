<template>
  <div>
    <div class="sticky top-0 z-50 bg-white">
      <AppHeader />
    </div>
    <SearchInput />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import SearchInput from './SearchInput.vue'
</script>

<style scoped>
</style>
