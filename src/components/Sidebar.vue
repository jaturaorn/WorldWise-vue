<script setup>
import AppNav from "./AppNav.vue";
import Logo from "./Logo.vue";
import { onMounted } from "vue";
import { useCitiesStore } from "@/stores/citiesStore";

const citiesStore = useCitiesStore();

onMounted(() => {
  citiesStore.fetchCities();
});
</script>

<template>
  <div class="sidebar">
    <Logo />
    <AppNav />
    <!-- *Nested Route display by this outlet component  -->
    <RouterView />

    <footer class="footer">
      <p class="copyright">
        &copy; Copyright {{ new Date().getFullYear() }} by WorldWise Inc.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.sidebar {
  flex-basis: 56rem;
  background-color: var(--color-dark--1);
  padding: 3rem 5rem 3.5rem 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 4.8rem);
}

.footer {
  margin-top: auto;
}

.copyright {
  font-size: 1.2rem;
  color: var(--color-light--1);
}
</style>
