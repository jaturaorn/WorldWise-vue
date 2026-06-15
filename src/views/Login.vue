<script setup>
import { ref } from "vue";

import { useAuthStore } from "@/stores/useAuthStore";

import { useRouter } from "vue-router";
import PageNav from "@/components/PageNav.vue";

const email = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();

function handleLogin() {
  // 1. สั่งสั่งล็อกอินผ่าน Store (อย่าลืมใส่ .value ถ้าเรียกใช้ในสคริปต์)
  authStore.login(email.value, password.value);

  // 2. เช็คเงื่อนไขถ้าล็อกอินสำเร็จ ให้สั่ง router เปลี่ยนหน้าทันที
  if (authStore.isAuthenticated) {
    router.push("/applayout"); // หรือ path ที่คุณตั้งไว้
  }
}
</script>

<template>
  <main class="login">
    <PageNav />
    <form class="form" @submit.prevent="handleLogin">
      <div class="row">
        <label for="email">Email address</label>
        <input type="email" id="email" v-model="email" />
      </div>

      <div class="row">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>

      <div>
        <Button type="primary">Login</Button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.login {
  margin: 2.5rem;
  padding: 2.5rem 5rem;
  background-color: var(--color-dark--1);
  min-height: calc(100vh - 5rem);
}

.form {
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 2rem 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* Different from other form */
  width: 48rem;
  margin: 8rem auto;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
