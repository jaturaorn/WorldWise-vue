<script setup>
defineProps({
  country: Object,
});

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
  <li class="countryItem">
    <span class="emoji">
      <img
        :src="`https://flagcdn.com/24x18/${flagemojiToPNG(country.emoji)}.png`"
        alt="flag"
      />
    </span>
    <h3>{{ country.country }}</h3>
  </li>
</template>

<style scoped>
.countryItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  font-size: 1.7rem;
  font-weight: 600;

  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1rem 2rem;
  border-left: 5px solid var(--color-brand--1);
}

.countryItem span:first-child {
  font-size: 3rem;
  line-height: 1;
}
</style>
