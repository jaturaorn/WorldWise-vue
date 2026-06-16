<script setup>
import Map from "@/components/Map.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>
<template>
  <div class="app">
    <Sidebar />
    <Map />
    <!-- <User /> -->
  </div>
</template>
<style scoped>
.app {
  height: 100vh;
  padding: 2.4rem;
  overscroll-behavior-y: none;
  display: flex;
  position: relative;
}
</style>
