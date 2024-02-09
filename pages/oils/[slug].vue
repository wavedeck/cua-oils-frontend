<script lang="ts" setup>
import MediaService from "~/core/media/media.service";
import {OilsService} from "~/core/oils/oils.service";
import {OilsRepository} from "~/core/oils/oils.repository";

const route = useRoute();
const {slug} = route.params;

const fetchOilContent = async () => {
  const oilsRepository = new OilsRepository();
  const oilsService = new OilsService(oilsRepository);

  const oil = await oilsService.getOilBySlug(slug as string);

  const mediaService = new MediaService();
  const mediaIds: number[] = [];

  if (oil.acf["ol-bild"]) {
    mediaIds.push(oil.acf["ol-bild"]);
  }

  if (oil.acf.rezepte) {
    mediaIds.push(...oil.acf.rezepte);
  }

  const media = await mediaService.getManyMedia(mediaIds);
  oil.acf.postImage = media.find(media => media.id === oil.acf["ol-bild"]);
  oil.acf.galleryImages = oil.acf.rezepte?.map((id: number) => media.find(media => media.id === id));

  return oil;
}

const {data: oil, error} = useAsyncData(() => fetchOilContent());

const openImageInNewTab = (url: string) => {
  window.open(url, '_blank');
};

const nl2br = (str: string): string => {
  return str.replace(/\r\n|\n|\r/g, '<br>' + '\n');
}

</script>

<template>
  <PageHero
      backgroundImage="/img/lexikon-detail-header.webp"
      subtitle="Lexikon"
      title="BMS OILS ACADEMY"
  />
  <section v-if="oil" class="topic-actions">
    <div class="container mx-auto">
      <h2 class="topic__title">{{ oil.title.rendered }}</h2>
      <NuxtLink class="topic__backbutton" to="/lexikon">
        &laquo; Zurück zum Lexikon
      </NuxtLink>
    </div>
  </section>
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
          v-html="nl2br(oil.acf.beschreibung)"
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
.topic-actions,
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

.topic-actions .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
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
    padding-right: 10rem;
  }

  .topic-gallery__wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (min-width: 992px) {
  .topic-gallery__wrapper {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .topic-actions .topic__title {
    width: 40%;
    font-size: 2.5rem;
    margin: 0;
  }

  .topic-actions .topic__backbutton {
    width: 60%;
    text-align: right;
    color: #2b4675;
    text-decoration: none;
  }
}

@media screen and (min-width: 1200px) {
  .topic-gallery__wrapper {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.topic-actions .container {
  border-bottom: 4px solid #DBB03D;
}

</style>