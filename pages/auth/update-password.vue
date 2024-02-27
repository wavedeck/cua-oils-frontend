<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "authentication",
});

const supabaseClient = useSupabaseClient();
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const router = useRouter();

async function handlePasswordUpdate() {
  loading.value = true;

  const { error } = await supabaseClient.auth.updateUser({
    password: password.value,
  });

  if (error) {
    alert(`Error: ${error.message}`);
  } else {
    router.push("/");
  }

  loading.value = false;
}
</script>

<template>
  <div class="auth-update-password">
    <img src="/img/theme/flower_main.svg" alt="" width="48" height="48" />
    <h1 class="auth-update-password__title">Passwort aktualisieren</h1>
    <p class="auth-update-password__helptext">
      Teile uns Dein neues Passwort mit um mit der BMS Oils Academy
      fortzufahren.
    </p>
    <form
      class="auth-update-password__form"
      @submit.prevent="handlePasswordUpdate"
    >
      <div class="input-password-wrapper">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Dein neues Passwort"
        />
        <button
          class="show-password-toggle"
          @click.prevent="showPassword = !showPassword"
        >
          <svg v-if="!showPassword" viewBox="0 0 512 512" height="20">
            <path
              d="M508.177,245.995C503.607,240.897,393.682,121,256,121S8.394,240.897,3.823,245.995c-5.098,5.698-5.098,14.312,0,20.01
			C8.394,271.103,118.32,391,256,391s247.606-119.897,252.177-124.995C513.274,260.307,513.274,251.693,508.177,245.995z M256,361
			c-57.891,0-105-47.109-105-105s47.109-105,105-105s105,47.109,105,105S313.891,361,256,361z"
            />
            <path
              d="M271,226c0-15.09,7.491-28.365,18.887-36.53C279.661,184.235,268.255,181,256,181c-41.353,0-75,33.647-75,75
			c0,41.353,33.647,75,75,75c37.024,0,67.668-27.034,73.722-62.358C299.516,278.367,271,255.522,271,226z"
            />
          </svg>

          <svg v-else viewBox="0 0 128 128" height="20">
            <path
              d="m79.891 65.078 7.27-7.27c.529 1.979.839 4.048.839 6.192 0 13.234-10.766 24-24 24-2.144 0-4.213-.31-6.192-.839l7.27-7.27c7.949-.542 14.271-6.864 14.813-14.813zm47.605-3.021c-.492-.885-7.47-13.112-21.11-23.474l-5.821 5.821c9.946 7.313 16.248 15.842 18.729 19.602-4.741 7.219-23.339 31.994-55.294 31.994-4.792 0-9.248-.613-13.441-1.591l-6.573 6.573c6.043 1.853 12.685 3.018 20.014 3.018 41.873 0 62.633-36.504 63.496-38.057.672-1.209.672-2.677 0-3.886zm-16.668-39.229-88 88c-.781.781-1.805 1.172-2.828 1.172s-2.047-.391-2.828-1.172c-1.563-1.563-1.563-4.094 0-5.656l11.196-11.196c-18.1-10.927-27.297-27.012-27.864-28.033-.672-1.209-.672-2.678 0-3.887.863-1.552 21.623-38.056 63.496-38.056 10.827 0 20.205 2.47 28.222 6.122l12.95-12.95c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656zm-76.495 65.183 10.127-10.127c-2.797-3.924-4.46-8.709-4.46-13.884 0-13.234 10.766-24 24-24 5.175 0 9.96 1.663 13.884 4.459l8.189-8.189c-6.47-2.591-13.822-4.27-22.073-4.27-31.955 0-50.553 24.775-55.293 31.994 3.01 4.562 11.662 16.11 25.626 24.017zm15.934-15.935 21.809-21.809c-2.379-1.405-5.118-2.267-8.076-2.267-8.822 0-16 7.178-16 16 0 2.958.862 5.697 2.267 8.076z"
            />
          </svg>
        </button>
      </div>

      <button
        :class="{ 'login-button--loading': loading }"
        :disabled="loading"
        class="login-button"
        type="submit"
      >
        Passwort aktualisieren
      </button>
    </form>
  </div>
</template>

<style scoped>
.auth-update-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 1.5rem;
}

.auth-update-password__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 20rem;
}

.auth-update-password__title {
  font-size: 1.5rem;
  margin: 0;
  margin-top: 1rem;
}

.auth-update-password__helptext {
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-password-wrapper {
  position: relative;
}

.show-password-toggle {
  display: grid;
  place-items: center;
  position: absolute;
  right: 0.5rem;
  top: 0;
  bottom: 0;
  cursor: pointer;
  background: none;
  border: none;
}
</style>
