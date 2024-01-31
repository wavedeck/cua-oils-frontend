export const extractMediaIds = (topics: any[]): number[] => {
  const mediaIds = new Set<number>();

  topics.forEach((topic) => {
    ["post-header", "post-image"].forEach((key) => {
      if (!topic.acf[key]) return;

      if (Array.isArray(topic.acf[key])) {
        topic.acf[key].forEach(mediaIds.add, mediaIds);
        return;
      }

      mediaIds.add(topic.acf[key]);
      return;
    });
  });

  return Array.from(mediaIds);
};
