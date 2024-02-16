<script lang="ts" setup>
definePageMeta({
  layout: "authentication",
});

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

const authLoading = ref(false);

const signInWithPassword = async () => {
  authLoading.value = true;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) alert(error.message);
  if (data.user) navigateTo("/confirm");

  authLoading.value = false;
};
</script>

<template>
  <main class="login-page">
    <div class="login-image-wrapper">
      <img
        alt=""
        src="https://www.bms-oils.com/wp-content/uploads/2024/01/Einstiegskurs_header.webp"
      />
    </div>

    <div class="login-wrapper">
      <div id="main-header__logo">
        <img
          id="image-3-15"
          alt=""
          height="32"
          src="/img/theme/flower_main.svg"
          width="32"
        />
        <div id="text_block-7-15">BMS Oils Academy</div>
      </div>

      <div class="login-form-wrapper">
        <p>
          Gib deine E-Mail und Passwort ein, um auf die Academy zuzugreifen.
        </p>

        <form class="login-form" @submit.prevent="signInWithPassword">

          <div class="login-form__inputs">
            <div class="login-form__inputwrapper">
              <label for="login_email">E-Mail</label>
              <input
                id="login_email"
                v-model="email"
                placeholder="Gib deine E-Mailadresse ein"
                type="email"
              />
            </div>

            <div class="login-form__inputwrapper">
              <label for="login_password">Passwort</label>
              <input
                id="login_password"
                v-model="password"
                placeholder="Gib dein Passwort ein"
                type="password"
              />
            </div>
          </div>
          <div class="login-form__actions">
            <a class="login-form__action action--forgot" href="/forgot-password"
              >Passwort vergessen?</a
            >
          </div>
          <button
            :class="{ 'login-button--loading': authLoading }"
            :disabled="authLoading"
            class="login-button"
            @click="signInWithPassword"
          >
            Einloggen
          </button>
        </form>
      </div>

      <div class="login-footer">
        <p class="login__signup-text">
          Noch kein Konto?
          <a href="https://www.bms-oils.com/registrierung/"
            >Anfragen</a
          >
        </p>
      </div>
    </div>
  </main>
</template>
