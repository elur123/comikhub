<template>
  <div>
    <Header />
    <div class="max-w-7xl mx-auto mb-16">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header.vue'
</script>
