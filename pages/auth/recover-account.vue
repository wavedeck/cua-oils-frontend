<script setup lang="ts">
definePageMeta({
  layout: "authentication",
});

const supabaseClient = useSupabaseClient();

const email = ref("");
const loading = ref(false);

async function handlePasswordReset(e: Event) {
  e.preventDefault();
  loading.value = true;

  const { error } = await supabaseClient.auth.resetPasswordForEmail(
    email.value,
    {
      redirectTo: `${window.location.origin}/auth/update-password`,
    },
  );

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert(
      "Wenn dein Account existiert, erhältst du in Kürze eine E-Mail " +
        "mit einem Link zum Zurücksetzen deines Passworts.",
    );
  }

  loading.value = false;
}
</script>

<template>
  <div class="auth-recover-account">
    <img src="/img/theme/flower_main.svg" alt="" width="48" height="48" />
    <h1 class="auth-recover-account__title">Passwort vergessen</h1>
    <p class="auth-recover-account__helptext">
      Gib deine E-Mail-Adresse ein, um einen Link zum Zurücksetzen deines
      Passworts zu erhalten.
    </p>
    <form
      class="auth-recover-account__form"
      @submit.prevent="handlePasswordReset"
    >
      <input v-model="email" type="email" placeholder="Deine E-Mail" />
      <button
        :class="{ 'login-button--loading': loading }"
        :disabled="loading"
        class="login-button"
        type="submit"
      >
        Absenden
      </button>
    </form>
  </div>
</template>

<style scoped>
.auth-recover-account {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 1.5rem;
}

.auth-recover-account__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 20rem;
}

.auth-recover-account__title {
  font-size: 1.5rem;
  margin: 0;
  margin-top: 1rem;
}

.auth-recover-account__helptext {
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
