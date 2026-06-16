<script setup>
import { useCitiesStore } from "@/stores/citiesStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Spinner from "./Spinner.vue";
import BackButton from "./BackButton.vue";

const citiesStore = useCitiesStore();
const route = useRoute();

onMounted(() => {
  citiesStore.getCity(route.params.id);
});

const formatDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const flagemojiToPNG = (flag) => {
  if (!flag) return "";
  return [...flag]
    .map((char) =>
      String.fromCharCode(char.codePointAt() - 127397).toLowerCase(),
    )
    .join("");
};
</script>

<template>
  <Spinner v-if="citiesStore.isLoading" />

  <div v-else class="city">
    <div class="row">
      <h6>City name</h6>

      <h3>
        <span v-if="citiesStore.currentCity.emoji">
          <img
            :src="`https://flagcdn.com/24x18/${flagemojiToPNG(citiesStore.currentCity.emoji)}.png`"
            alt="flag"
          />
        </span>
        {{ citiesStore.currentCity.cityName }}
      </h3>
    </div>

    <div class="row">
      <h6>You went to {{ citiesStore.currentCity.cityName }} on</h6>
      <p>{{ formatDate(citiesStore.currentCity.date || null) }}</p>
    </div>

    <div class="row" v-if="citiesStore.currentCity.notes">
      <h6>Your notes</h6>
      <p>{{ citiesStore.currentCity.notes }}</p>
    </div>

    <div class="row">
      <h6>Learn more</h6>
      <a
        :href="`https://en.wikipedia.org/wiki/${citiesStore.currentCity.cityName}`"
        target="_blank"
        rel="noreferrer"
      >
        Check out {{ citiesStore.currentCity.cityName }} on Wikipedia &rarr;
      </a>
    </div>

    <div>
      <BackButton />
    </div>
  </div>
</template>

<style scoped>
.city {
  padding: 2rem 3rem;
  max-height: 70%;
  background-color: var(--color-dark--2);
  border-radius: 7px;
  overflow-y: scroll;

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.city h6 {
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--color-light--1);
}

.city h3 {
  font-size: 1.9rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.city h3 span {
  font-size: 3.2rem;
  line-height: 1;
}

.city p {
  font-size: 1.6rem;
}

.city a:link,
.city a:visited {
  font-size: 1.6rem;
  color: var(--color-brand--1);
}
</style>
