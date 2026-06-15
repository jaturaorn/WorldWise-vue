<script setup>
import { useCitiesStore } from "@/stores/citiesStore";

defineProps({
  city: Object,
});

const citiesStore = useCitiesStore();

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  // Convert flag emoji to corresponding country code
  const countryCode = [...flag]
    .map((char) =>
      String.fromCharCode(char.codePointAt() - 127397).toLowerCase(),
    )
    .join("");

  return countryCode;
};
</script>

<template>
  <li>
    <RouterLink
      class="cityItem"
      :class="{ 'cityItem--active': city.id === citiesStore.currentCity.id }"
      :to="{
        path: `/applayout/cities/${city.id}`,
        query: { lat: city.position.lat, lng: city.position.lng },
      }"
      @click="citiesStore.setCurrentCity(city)"
    >
      <span class="emoji">
        <img
          :src="`https://flagcdn.com/24x18/${flagemojiToPNG(city.emoji)}.png`"
          alt="flag"
        />
      </span>
      <h3 class="name">{{ city.name }}</h3>
      <time class="date">({{ formatDate(city.date) }})</time>
      <button
        class="deleteBtn"
        @click.stop.prevent="citiesStore.removeCity(city)"
      >
        &times;
      </button>
    </RouterLink>
  </li>
</template>

<style scoped>
.cityItem,
.cityItem:link,
.cityItem:visited {
  display: flex;
  gap: 1.6rem;
  align-items: center;

  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1rem 2rem;
  border-left: 5px solid var(--color-brand--2);
  cursor: pointer;

  color: inherit;
  text-decoration: none;
}

.cityItem--active {
  border: 2px solid var(--color-brand--2);
  border-left: 5px solid var(--color-brand--2);
}

.emoji {
  font-size: 2.6rem;
  line-height: 1;
}

.name {
  font-size: 1.7rem;
  font-weight: 600;
  margin-right: auto;
}

.date {
  font-size: 1.5rem;
}

.deleteBtn {
  height: 2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background-color: var(--color-dark--1);
  color: var(--color-light--2);
  font-size: 1.6rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
}

.deleteBtn:hover {
  background-color: var(--color-brand--1);
  color: var(--color-dark--1);
}
</style>
