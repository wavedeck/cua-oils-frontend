<template>
  <PageHero
      :title="topic!.title.rendered"
      subtitle="BMS OILS ACADEMY"
      :backgroundImage="topic!.acf.postImageMedia?.media_details.sizes.full.source_url"
  />
  <section class="topic-content">
    <div class="container mx-auto">
      <img
          :src="topic!.acf.postImageMedia?.media_details.sizes.full.source_url"
          alt=""
      />
      <div
          v-html="topic!.acf['post-content']"
          class="topic-content__content"
      ></div>
    </div>
  </section>
  <section class="topic-gallery" v-if="topic!.acf.postGalleryMedia">
    <div class="container mx-auto">
      <img
        v-for="image in topic!.acf.postGalleryMedia"
        :key="image.id"
        :src="image.media_details.sizes.full.source_url"
        alt=""
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {useAsyncData} from "nuxt/app";
import {TopicsService} from "~/services/topics.service";
import {MediaService} from "~/services/media.service";

const route = useRoute();

const {data: topic} = useAsyncData(
    `topic_${route.params.slug}`,
    async () => {
      const slug = route.params.slug as string;

      const topicsService = new TopicsService();
      const mediaService = new MediaService();

      const topicData = await topicsService.getTopicBySlug(slug);
      const mediaIds = topicsService.unionMediaIds(topicData);
      const mediaData = await mediaService.getMedia(mediaIds);
      return mapMediaToTopics(topicData, mediaData)[0];
    }
);
</script>

<style scoped>
.topic-content,
.topic-gallery {
  padding: 2rem 0;
}

.topic-content__content {
  margin-top: 2rem;
}
</style>
