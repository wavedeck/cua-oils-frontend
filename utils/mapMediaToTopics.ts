import { type TopicResponse } from "~/services/topics.service";
import { type MediaResponse } from "~/services/media.service";

export const mapMediaToTopics = (
  topics: TopicResponse[],
  mediaData: MediaResponse[]
) => {
  const mediaMap = new Map(mediaData.map((media) => [media.id, media]));

  return topics.map((topic) => {
    if (topic.acf["preview-image"]) {
      const previewImageId = topic.acf["preview-image"];
      topic.acf.previewImageMedia = mediaMap.get(previewImageId);
    }
    if (topic.acf["post-header"]) {
      const postHeaderImageId = topic.acf["post-header"];
      topic.acf.postHeaderMedia = mediaMap.get(postHeaderImageId);
    }
    if (topic.acf["post-image"]) {
      const postImageId = topic.acf["post-image"];
      topic.acf.postImageMedia = mediaMap.get(postImageId);
    }
    if (topic.acf["post-gallery"] && Array.isArray(topic.acf["post-gallery"])) {
      topic.acf.postGalleryMedia = [];

      topic.acf["post-gallery"].forEach((imageId: number) => {
        const imageObject = mediaMap.get(imageId);
        if (imageObject) {
          topic.acf.postGalleryMedia.push(imageObject);
        }
      });
      topic.acf.postGalleryMedia = topic.acf["post-gallery"].map(
        (imageId: number) => {
          const imageObject = mediaMap.get(imageId);
          if (imageObject) {
            return imageObject;
          }
        }
      );
    }
    return topic;
  });
};
