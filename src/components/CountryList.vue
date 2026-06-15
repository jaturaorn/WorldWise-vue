<script setup>
import { useCitiesStore } from "@/stores/citiesStore";
import CountryItem from "./CountryItem.vue";
import Spinner from "./Spinner.vue";
import Message from "./Message.vue";

const citiesStore = useCitiesStore();
</script>
<template>
  <Spinner v-if="citiesStore.isLoading" />
  <Message
    v-else-if="!citiesStore.cities.length"
    message="Add your first cities by clicking in a city on the map"
  />
  <ul v-else class="countryList">
    <CountryItem
      v-for="country in citiesStore.cities"
      :key="country"
      :city="country"
    />
  </ul>
</template>
<style scoped>
.countryList {
  width: 100%;
  height: 65vh;
  list-style: none;
  /* overflow-y: scroll; */
  overflow-x: hidden;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: start;
  gap: 1.6rem;
}
</style>
