<script lang="ts" setup>
import type {Oil} from "~/pages/lexikon.vue";
import MediaService from "~/core/media/media.service";

const route = useRoute();
const {slug} = route.params;

const fetchOilContent = async () => {
  const response = await $fetch<Oil[]>(
      `https://bms-oils-web.invadox.dev/wp-json/wp/v2/bms_oils?slug=${slug}`
  );
  const oil = response[0];

  const mediaService = new MediaService();
  const media = await mediaService.getManyMedia([oil.acf["ol-bild"], ...oil.acf.rezepte]);
  oil.acf.postImage = media.find(media => media.id === oil.acf["ol-bild"]);
  oil.acf.galleryImages = oil.acf.rezepte.map((id: number) => media.find(media => media.id === id));

  return oil;
}

const {data: oil, error} = useAsyncData(() => fetchOilContent());

const openImageInNewTab = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <PageHero
      backgroundImage="/img/lexikon-detail-header.webp"
      subtitle="Lexikon"
      title="BMS OILS ACADEMY"
  />
  <section v-if="oil" class="topic-content">
    <div class="container mx-auto">
      <div class="topic-content__image__wrapper">
        <img
            :src="oil.acf.postImage?.source_url"
            alt=""
            class="topic-content__image"
        />
      </div>
      <div
          class="topic-content__content"
          v-html="oil.acf.beschreibung"
      ></div>
    </div>
  </section>
  <section v-if="oil?.acf.galleryImages" class="topic-gallery">
    <div class="container mx-auto">
      <div class="topic-gallery__wrapper">
        <img
            v-for="image in oil.acf.galleryImages"
            :key="image.id"
            :src="image.source_url"
            alt=""
            @click="openImageInNewTab(image.source_url)"
        />
      </div>
    </div>
  </section>
    {{ error }}
</template>

<style scoped>
.topic-content,
.topic-gallery {
  padding: 2rem 0;
}

.topic-content__image__wrapper {
  width: 100%;
  height: auto;
  display: grid;
  place-items: center;
}

.topic-content__image {
  max-width: 8rem;
  rotate: 15deg;
}

.topic-content .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.topic-gallery__wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media screen and (min-width: 768px) {
  .topic-content {
    padding: 6rem 0;
  }
  .topic-content .container {
    flex-direction: row;
  }

  .topic-content__image__wrapper {
    width: 40%;
  }

  .topic-content__content {
    width: 60%;
  }

  .topic-gallery__wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 992px) {
  .topic-gallery__wrapper {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 1200px) {
  .topic-gallery__wrapper {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

</style>