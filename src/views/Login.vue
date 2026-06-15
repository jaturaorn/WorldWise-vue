<script setup></script>

<template>
  <main class="login">
    <PageNav />
    <form class="form" @submit.prevent="handleLogin">
      <div class="row">
        <label htmlFor="email">Email address</label>
        <input type="email" id="email" />
      </div>

      <div class="row">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
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
