<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCitiesStore } from "@/stores/citiesStore";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

const citiesStore = useCitiesStore();
const route = useRoute();
const router = useRouter();

// ⚡️ กำหนดสเตตศูนย์กลางของแผนที่แบบ Reactive
const mapPosition = ref([40, 0]);

// ⚡️ ดักจับพิกัดจาก URL Query เมื่อผู้ใช้เลือกเมืองในลิสต์ เพื่อเลื่อนแผนที่ตามอัตโนมัติ
watch(
  () => [route.query.lat, route.query.lng],
  ([newLat, newLng]) => {
    if (newLat && newLng) {
      mapPosition.value = [Number(newLat), Number(newLng)];
    }
  },
  { immediate: true },
);

// ⚡️ จัดการเมื่อผู้ใช้คลิกพื้นที่ว่างบนแผนที่เพื่อเพิ่มเมืองใหม่
function handleMapClick(e) {
  if (!e.latlng) return;
  router.push({
    path: "/applayout/form",
    query: { lat: e.latlng.lat, lng: e.latlng.lng },
  });
}

// ⚡️ จัดการปุ่มดึงพิกัดปัจจุบันของเครื่องผู้ใช้งาน
function handleGetYourLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition((position) => {
    router.push({
      path: "/applayout/form",
      query: { lat: position.coords.latitude, lng: position.coords.longitude },
    });
  });
}
</script>

<template>
  <div class="mapContainer">
    <button class="btnPosition" @click="handleGetYourLocation">
      Use your position
    </button>

    <LMap class="map" :zoom="6" :center="mapPosition" @click="handleMapClick">
      <LTileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

      <LMarker
        v-for="city in citiesStore.cities"
        :key="city.id"
        :lat-lng="[city.position.lat, city.position.lng]"
      >
        <LPopup>
          <span>{{ city.cityName }}</span>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped>
.mapContainer {
  flex: 1;
  height: 100%;
  background-color: var(--color-dark--2);
  position: relative;
}

.map {
  height: 100%;
}

/* ปุ่มใช้ตำแหน่งปัจจุบันของคุณ */
.btnPosition {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* ดันให้อยู่เหนือกะดานแผนที่ */
  background-color: var(--color-brand--2);
  color: var(--color-dark--0);
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 700;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.2);
}

/* โครงสร้างสไตล์ของ Leaflet Popup แบบ Global ที่คุณเขียนไว้ ถูกต้องใช้งานได้ดีมากครับ */
:global(.leaflet-popup .leaflet-popup-content-wrapper) {
  background-color: var(--color-dark--1);
  color: var(--color-light--2);
  border-radius: 5px;
  padding-right: 0.6rem;
}

:global(.leaflet-popup .leaflet-popup-content) {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

:global(.leaflet-popup .leaflet-popup-content span:first-child) {
  font-size: 2.5rem;
  line-height: 1;
}

:global(.leaflet-popup .leaflet-popup-tip) {
  background-color: var(--color-dark--1);
}

:global(.leaflet-popup-content-wrapper) {
  border-left: 5px solid var(--color-brand--2);
}
</style>
