<script setup lang="ts">
import RootLayout from 'src/layouts/RootLayout.vue';
</script>

<template>
  <RootLayout>
    <template #page>
      <router-view />
    </template>
  </RootLayout>
</template>

<style scoped lang="scss"></style>
