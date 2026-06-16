<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCitiesStore } from "@/stores/citiesStore";
import BackButton from "./BackButton.vue";

const route = useRoute();
const router = useRouter();
const citiesStore = useCitiesStore();

// ⚡️ ประกาศ Reactive States และคุมสถานะ Loading ภายในหน้าฟอร์ม
const cityName = ref("");
const country = ref("");
const date = ref(new Date().toISOString().split("T")[0]); // เซ็ตค่าเริ่มต้นเป็นวันปัจจุบัน (YYYY-MM-DD)
const notes = ref("");
const emoji = ref("");
const isLoadingGeocoding = ref(false);
const geocodingError = ref("");

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

// ⚡️ แก้พารามิเตอร์ Fetch ให้จิ้มไปที่พิกัดใหม่ที่กดมาจากแผนที่
watch(
  () => [route.query.lat, route.query.lng],
  async ([newLat, newLng]) => {
    if (!newLat || !newLng) return;
    try {
      isLoadingGeocoding.value = true;
      geocodingError.value = "";

      const res = await fetch(
        `${BASE_URL}?latitude=${newLat}&longitude=${newLng}`,
      );
      const data = await res.json();

      if (!data.countryCode) {
        throw new Error(
          "That doesn't seem to be a city. Click somewhere else 🤔",
        );
      }

      cityName.value = data.city || data.locality || "";
      country.value = data.countryName || "";
      emoji.value = data.countryCode; // บันทึกรหัสประเทศเอาไว้แปลงเป็นธงชาติ
    } catch (err) {
      geocodingError.value = err.message;
    } finally {
      isLoadingGeocoding.value = false;
    }
  },
  { immediate: true },
);

// ⚡️ ฟังก์ชันจัดการส่งข้อมูลฟอร์มเพื่อบันทึกเมืองใหม่ลงระบบ
async function handleSubmit() {
  if (!cityName.value || !date.value) return;

  const newCity = {
    cityName: cityName.value,
    country: country.value,
    emoji: emoji.value,
    date: date.value,
    notes: notes.value,
    position: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  // 1. ส่งออบเจกต์เมืองใหม่ไปบันทึกผ่านสโตร์
  await citiesStore.createCity(newCity);

  // 2. เมื่อหลังบ้านบันทึกเสร็จ ให้ดีดผู้ใช้เด้งกลับไปที่หน้ารายชื่อเมืองทันที
  router.push("/applayout/cities");
}

// ฟังก์ชันถอดรหัสรหัสประเทศเป็นรูปธงชาติ
const flagemojiToPNG = (flag) => {
  if (!flag) return "";
  return flag.toLowerCase();
};
</script>

<template>
  <Spinner v-if="isLoadingGeocoding" />

  <p v-else-if="geocodingError" class="error">{{ geocodingError }}</p>

  <form
    v-else
    class="form"
    :class="{ loading: citiesStore.isLoading }"
    @submit.prevent="handleSubmit"
  >
    <div class="row">
      <label for="cityName">City name</label>
      <input id="cityName" v-model="cityName" type="text" />
      <span class="flag" v-if="emoji">
        <img
          :src="`https://flagcdn.com/24x18/${flagemojiToPNG(emoji)}.png`"
          alt="flag"
        />
      </span>
    </div>

    <div class="row">
      <label for="date">When did you go to {{ cityName }}?</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="row">
      <label for="notes">Notes about your trip to {{ cityName }}</label>
      <textarea id="notes" v-model="notes" />
    </div>

    <div class="buttons">
      <button class="btnPrimary" type="submit">Add</button>
      <BackButton />
    </div>
  </form>
</template>

<style scoped>
/* สไตล์ตกแต่งเพิ่มเติมสำหรับปุ่มและฟอร์ม */
.btnPrimary {
  background-color: var(--color-brand--2);
  color: var(--color-dark--0);
  padding: 0.8rem 1.6rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  margin: 4rem auto;
  padding: 2rem;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid red;
  border-radius: 7px;
  font-size: 1.6rem;
  text-align: center;
}

/* ... โครงสร้าง CSS เดิมของคุณใช้งานได้ครบถ้วนทั้งหมดเลยครับ ... */
.form {
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 2rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}
.row input,
.row textarea {
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: var(--color-light--3);
  font-family: inherit;
  font-size: 1.6rem;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.flag {
  position: absolute;
  right: 1rem;
  top: 3.2rem;
}
.form.loading {
  opacity: 0.3;
}
</style>
