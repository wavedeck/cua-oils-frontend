<template>
  <section class="overview-topic-list">
    <div class="container mx-auto">
      <div
          v-for="topic in topics"
          :key="topic.id"
          class="overview-topic-list__topic"
      >
        <a class="topic__linkwrapper" :href="`/topic/${topic.slug}`"
        ><img
            :alt="topic.title.rendered"
            :src="
              topic.acf.previewImageMedia?.media_details.sizes.full.source_url
            "
            class="topic__image"
        /></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useAsyncData} from "nuxt/app";
import {TopicsService} from "~/services/topics.service";
import {MediaService} from "~/services/media.service";

const {data: topics} = useAsyncData("topics-list", async () => {
  const topicsService = new TopicsService();
  const mediaService = new MediaService();

  const topicsData = await topicsService.getTopics();
  const mediaIds = topicsService.unionPreviewMediaIds(topicsData);

  try {
    const mediaData = await mediaService.getMedia(mediaIds);
    return mapMediaToTopics(topicsData, mediaData);
  } catch (e) {
    console.error(e);
    return topicsData
  }
});
</script>

<style scoped>
.overview-topic-list__topic .topic__linkwrapper {
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
}
</style>
