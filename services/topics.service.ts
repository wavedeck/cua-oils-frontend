import {apiConfig} from "~/config/api";

export class TopicsService {
    private _paginationParams = {per_page: "100"};
    private _orderParams = {orderby: "title", order: "asc"};

    public getTopics(): Promise<TopicResponse[]> {
        return this._fetchManyTopics();
    }

    public getTopic(topicId: number): Promise<TopicResponse> {
        return this._fetchTopic({id: topicId}) as Promise<TopicResponse>;
    }

    public getTopicBySlug(topicSlug: string): Promise<TopicResponse[]> {
        return this._fetchTopic({slug: topicSlug}) as Promise<TopicResponse[]>;
    }

    public unionPreviewMediaIds(topics: TopicResponse[]) {
        const mediaIds = new Set<number>();
        const mediaFields = ["preview-image"];

        topics.forEach((topic) => {
            mediaFields.forEach((mediaField) => {
                const mediaId: number = topic.acf[mediaField];
                if (mediaId) {
                    mediaIds.add(mediaId);
                }
            });
        });

        return Array.from(mediaIds);
    }

    public unionMediaIds(topics: TopicResponse[]) {
        const mediaIds = new Set<number>();
        const mediaFields = ["post-header", "post-image"];
        const mediaArrayFields = ["post-gallery"];

        topics.forEach((topic) => {
            mediaFields.forEach((mediaField) => {
                if(!(mediaField in topic.acf)) {
                    return;
                }
                const mediaId: number = topic.acf[mediaField];
                if (mediaId) {
                    mediaIds.add(mediaId);
                }
            });
            mediaArrayFields.forEach((mediaArrayField) => {
                if(!(mediaArrayField in topic.acf)) {
                    return;
                }
                const mediaArray: number[] = topic.acf[mediaArrayField];
                if (mediaArray) {
                    mediaArray.forEach(mediaIds.add, mediaIds);
                }
            });
        });

        return Array.from(mediaIds);
    }

    private async _fetchTopic(topicConfig: { id?: number | string, slug?: string }): Promise<TopicResponse | TopicResponse[]> {
        let apiUrl = apiConfig.baseUrl + "/wp/v2/academy-topic";

        if (topicConfig.id) {
            apiUrl += "/" + topicConfig.id;
        }

        if (topicConfig.slug) {
            apiUrl += "?slug=" + topicConfig.slug;
        }

        if (!topicConfig.id && !topicConfig.slug) {
            throw new Error("Topic ID or slug must be provided");
        }

        const response = await fetch(apiUrl);
        return await response.json();
    }

    private async _fetchManyTopics(): Promise<TopicResponse[]> {
        const queryString = this._createQueryString({});
        const apiUrl = apiConfig.baseUrl + "/wp/v2/academy-topic?" + queryString;

        const response = await fetch(apiUrl);
        return await response.json();
    }

    private _createQueryString(properties: object): string {
        return new URLSearchParams({
            ...properties,
            ...this._paginationParams,
            ...this._orderParams,
        }).toString();
    }
}

export interface TopicResponse {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    parent: number;
    template: string;
    acf: {
        "post-image": number | undefined;
        "post-content": string | undefined;
        "post-gallery": number[] | undefined;
        "preview-image": number | undefined;
        "post-header": number | undefined;
        [key: string]: any | undefined;
    };
}
