<template>
  <Head>
    <title>{{ topic?.title.rendered }} - BMS Oils Academy</title>
  </Head>
  <template v-if="!pending">
    <PageHero
      :background-image="topic?.acf.postHeaderUrl"
      :title="topic?.title.rendered"
      subtitle="BMS OILS ACADEMY"
    />
    <section class="topic-actions">
      <div class="container mx-auto">
        <NuxtLink class="topic__backbutton" to="/">
          &laquo; Zurück zu den Rezeptkategorien
        </NuxtLink>
      </div>
    </section>
    <section v-if="topic" class="topic-content">
      <div class="container mx-auto">
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="topic-content__content"
          v-html="nl2br(topic.acf['post-content']!)"
        ></div>
        <!-- eslint-enable vue/no-vhtml -->
      </div>
    </section>
    <section v-if="topic?.acf.postGalleryUrls" class="topic-gallery">
      <div class="container mx-auto">
        <div id="topic-gallery" class="topic-gallery__wrapper">
          <a
            v-for="image in topic.acf.postGalleryUrls"
            :key="image.id"
            :href="image.src"
            data-pswp-width="1080"
            data-pswp-height="1080"
            target="_blank"
            rel="noreferrer"
          >
            <img :src="image.src" alt="" />
          </a>
        </div>
      </div>
    </section>
  </template>
  {{ error }}
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useAsyncData } from "nuxt/app";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeModule from "photoswipe";
import TopicsService from "~/core/topics/topics.service";
import MediaService from "~/core/media/media.service";
import type { MediaResponse } from "~/core/media/media.repository";

import "photoswipe/style.css";

const lightbox = ref<PhotoSwipeLightbox | null>(null);
const route = useRoute();
const { slug } = route.params;

const initPhotoSwipe = () => {
  if (lightbox.value) {
    lightbox.value.destroy();
  }

  nextTick(() => {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: "#topic-gallery",
      children: "a",
      pswpModule: PhotoSwipeModule,
    });

    lightbox.value.init();
  });
};

const getTopicBySlug = async (slug: string) => {
  const topicsService = new TopicsService();
  const mediaService = new MediaService();

  const topic = await topicsService.getTopicBySlug(slug);
  const mediaIds: number[] = [];

  if (topic.getPostHeaderId()) {
    mediaIds.push(topic.getPostHeaderId()!);
  }

  if (topic.getPostImageId()) {
    mediaIds.push(topic.getPostImageId()!);
  }

  if (topic.getPostGalleryIds()) {
    mediaIds.push(...topic.getPostGalleryIds()!);
  }

  const mediaData = await mediaService.getManyMedia(mediaIds);
  const topicPojo = topic.getData();

  const getUrl = (media?: MediaResponse) => {
    if (!media) return null;

    return Object.keys(media.media_details.sizes).length === 0
      ? media.source_url
      : media.media_details.sizes["full"]
        ? media.media_details.sizes["full"].source_url
        : null;
  };

  topicPojo.acf.postHeaderUrl = getUrl(
    mediaData.find((media) => media.id === topic.getPostHeaderId()),
  );
  topicPojo.acf.postImageUrl = getUrl(
    mediaData.find((media) => media.id === topic.getPostImageId()),
  );
  topicPojo.acf.postGalleryUrls = mediaData
    .filter((media) => topic.getPostGalleryIds()?.includes(media.id))
    .map((media) => ({ id: media.id, src: getUrl(media) }));

  return topicPojo;
};

const {
  data: topic,
  error,
  pending,
} = useAsyncData(() => getTopicBySlug(slug as string));

const nl2br = (str: string): string => {
  return str.replace(/\r\n|\n|\r/g, "<br>" + "\n");
};

onMounted(() => {
  initPhotoSwipe();
});

onBeforeUnmount(() => {
  if (lightbox.value) {
    lightbox.value.destroy();
    lightbox.value = null;
  }
});

watch(pending, () => {
  if (!pending.value) {
    initPhotoSwipe();
  }
});
</script>

<style scoped>
.topic-actions,
.topic-content,
.topic-gallery {
  padding: 2rem 0;
}

.topic-actions .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topic-actions .topic__backbutton {
  color: #304b79;
  text-decoration: none;
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

  .topic-content__content {
    width: 60%;
    margin: 0 auto;
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
