<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <Button type="back" @click.prevent="router.back()"> &larr; Back </Button>
</template>
<style scoped></style>
