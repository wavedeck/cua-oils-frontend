<template>
  <PageHero
      :backgroundImage="topic?.acf.postHeaderUrl"
      :title="topic?.title.rendered"
      subtitle="BMS OILS ACADEMY"
  />
  <section class="topic-actions">
    <div class="container mx-auto">
      <h2 class="topic__title">{{ topic?.title.rendered }}</h2>
      <a class="topic__backbutton" href="/">&laquo; Zurück zu den Rezeptkategorien</a>
    </div>
  </section>
  <section v-if="topic" class="topic-content">
    <div class="container mx-auto">
      <img
          :src="topic.acf.postImageUrl"
          alt=""
          class="topic-content__image"
      />
      <div
          class="topic-content__content"
          v-html="topic.acf['post-content']"
      ></div>
    </div>
  </section>
  <section v-if="topic?.acf.postGalleryUrls" class="topic-gallery">
    <div class="container mx-auto">
      <div class="topic-gallery__wrapper">
      <img
          v-for="imageUrl in topic.acf.postGalleryUrls"
          :key="imageUrl.id"
          :src="imageUrl.src"
          @click="openImageInNewTab(imageUrl.src)"
          alt=""
      />
      </div>
    </div>
  </section>
  {{ error }}
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {useAsyncData} from "nuxt/app";
import TopicsService from "~/core/topics/topics.service";
import MediaService from "~/core/media/media.service";
import type {MediaResponse} from "~/core/media/media.repository";

const route = useRoute();
const {slug} = route.params;

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
        : media.media_details.sizes['full']
            ? media.media_details.sizes['full'].source_url
            : null;
  };

  topicPojo.acf.postHeaderUrl = getUrl(mediaData.find(media => media.id === topic.getPostHeaderId()));
  topicPojo.acf.postImageUrl = getUrl(mediaData.find(media => media.id === topic.getPostImageId()));
  topicPojo.acf.postGalleryUrls = mediaData.filter(media => topic.getPostGalleryIds()?.includes(media.id))
      .map(media => ({id: media.id, src: getUrl(media)}));

  return topicPojo;
};


const {data: topic, error, pending} = useAsyncData(
    () => getTopicBySlug(slug as string),
);

const openImageInNewTab = (url: string) => {
  window.open(url, '_blank');
}

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
  color: #304B79;
  text-decoration: none;
}

.topic-content__image {
  width: 100%;
  height: auto;
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

  .topic-content__image {
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
