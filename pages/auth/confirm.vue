<script lang="ts" setup>
definePageMeta({
  layout: "authentication",
});

const user = useSupabaseUser();
console.log("Waiting for login...");

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="auth-spinner-fullscreen">
    <div class="auth-spinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.auth-spinner-fullscreen {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
}
.auth-spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.auth-spinner div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #304b79;
  animation: auth-spinner 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.auth-spinner div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.auth-spinner div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.auth-spinner div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes auth-spinner {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
