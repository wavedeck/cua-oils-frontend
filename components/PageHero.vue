<template>
  <section
      class="page-hero"
      :style="{ '--background-image': `url(${backgroundImage})` }"
  >
    <div class="container mx-auto page-hero__container">
      <img :alt="title" src="/img/theme/flower_main.svg" class="page-hero__icon"/>
      <h1 class="page-hero__title" v-html="title"></h1>
      <h2 class="page-hero__subtitle">{{ subtitle }}</h2>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
    default: "",
  },
  backgroundImage: {
    type: String,
    required: false,
    default:
        "https://bms-oils-web.invadox.dev/wp-content/uploads/2023/12/IMG_6275-70.webp",
  },
});
</script>

<style scoped>
.page-hero {
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(1deg, #304b79 21%, rgba(0, 0, 0, 0) 100%),
  var(--background-image);
  text-align: left;
  background-position: 0 50%;
}

.page-hero__container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 4rem 1.5rem;
}

.page-hero__icon {
  background-color: #fff;
  border: 2px solid #304b79;
  border-radius: 50%;
  padding: 1rem;
  width: 5.5rem;
  height: 5.5rem;
}

.page-hero__title,
.page-hero__subtitle {
  margin: 0;
  font-weight: 400;
  font-family: "Map Roman", serif;
  text-align: center;
}

.page-hero__title {
  margin-top: 2rem;
  font-size: 1.85rem;
  color: #dbb03d;
}

.page-hero__subtitle {
  margin-top: 0.5rem;
  font-size: 1.35rem;
  color: #ffffff;
}
</style>
