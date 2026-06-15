<script setup>
import { useCitiesStore } from "@/stores/citiesStore";
import Spinner from "./Spinner.vue";
import Message from "./Message.vue";
import CityItem from "./CityItem.vue";

const citiesStore = useCitiesStore();
</script>
<template>
  <Spinner v-if="citiesStore.isLoading" />
  <Message
    v-else-if="!citiesStore.cities.length"
    message="Add your first cities by clicking in a city on the map"
  />
  <ul v-else class="cityList">
    <CityItem v-for="city in citiesStore.cities" :key="city.id" :city="city" />
  </ul>
</template>
<style scoped>
.cityList {
  width: 100%;
  height: 65vh;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.cityList::-webkit-scrollbar {
  width: 0;
}
</style>
