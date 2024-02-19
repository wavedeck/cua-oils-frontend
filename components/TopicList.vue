<template>
  <section class="overview-topic-list">
    <div class="container mx-auto">
      <div class="overview-topic-list__wrapper">
        <div
          v-for="topic in data?.topics"
          :key="topic.id"
          class="overview-topic-list__topic"
        >
          <NuxtLink :to="`/topic/${topic.slug}`" class="topic__linkwrapper"
            ><img
              :alt="topic.__title"
              :src="topic.__previewImage"
              class="topic__image"
          /></NuxtLink>
        </div>
        {{ error }}
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAsyncData } from "nuxt/app";
import { TopicsService } from "~/core/topics/topics.service";
import { MediaService } from "~/core/media/media.service";

const getTopics = async () => {
  const topicsService = new TopicsService();
  const mediaService = new MediaService();

  const topics = await topicsService.getManyTopics();

  const mediaIds: number[] = topics
    .map((topic) => topic.getPreviewImageId())
    .filter((id): id is number => id !== null);

  const mediaData = await mediaService.getManyMedia(mediaIds);
  const mediaMap = new Map(mediaData.map((media) => [media.id, media]));

  // We need to convert the topics to plain objects, because the
  // Topic class is not serializable by nuxt. We can abuse this
  // to enrich them with additional data.
  const topicsPojo = topics.map((topic) => {
    const previewImageId = topic.getPreviewImageId();
    const media = previewImageId ? mediaMap.get(previewImageId) : null;
    const mediaUrl = media ? media.media_details.sizes["full"].source_url : "";
    return {
      ...topic.getData(),
      __title: topic.getTitle(),
      __previewImage: mediaUrl,
    };
  });

  return {
    topics: topicsPojo,
    media: mediaData,
  };
};

const { data, error } = await useAsyncData("topics-list", getTopics);
</script>

<style scoped>
.overview-topic-list__wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.overview-topic-list__topic .topic__linkwrapper {
  display: block;
  width: 100%;
  height: 100%;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .overview-topic-list__wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

/* Laptop: 3 columns */
@media (min-width: 1024px) {
  .overview-topic-list__wrapper {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Desktop: 4 columns */
@media (min-width: 1200px) {
  .overview-topic-list__wrapper {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
