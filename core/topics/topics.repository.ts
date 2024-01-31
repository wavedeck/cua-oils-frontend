import {apiConfig} from "~/config/api";

/**
 * Repository for fetching topics.
 * Implements `ITopicsRepository` interface.
 */
export class TopicsRepository implements ITopicsRepository {
    private _paginationParams = {per_page: "100"};
    private _orderParams = {orderby: "title", order: "asc"};

    /**
     * Fetches a list of topics with default pagination and ordering.
     * @returns A promise resolving to an array of TopicData.
     */
    public async getManyTopics(): Promise<TopicData[]> {
        return this._fetchManyTopics();
    }

    /**
     * Fetches a single topic by its ID.
     * @param id - The ID of the topic (number or string).
     * @returns A promise resolving to a single TopicData object.
     */
    public async getTopicById(id: number | string): Promise<TopicData> {
        return this._fetchTopic({id});
    }

    /**
     * Fetches a single topic by its slug.
     * @param slug - The slug of the topic.
     * @returns A promise resolving to a single TopicData object.
     */
    public async getTopicBySlug(slug: string): Promise<TopicData> {
        return this._fetchTopic({slug});
    }

    /**
     * Private method to fetch multiple topics.
     * @returns A promise resolving to an array of TopicData.
     */
    private async _fetchManyTopics(): Promise<TopicData[]> {
        let requestUrl = `${apiConfig.baseUrl}/wp/v2/academy-topic?${this._getParamsString()}`;
        return $fetch(requestUrl);
    }

    /**
     * Private method to fetch a single topic based on provided parameters.
     * @param params - The query parameters to filter the topic.
     * @returns A promise resolving to a single TopicData object.
     * @throws Error if the topic is not found.
     */
    private async _fetchTopic(params: TopicQueryParams): Promise<TopicData> {
        let requestUrl = `${apiConfig.baseUrl}/wp/v2/academy-topic?${this._getParamsString(params)}`;
        const topics = await $fetch<TopicData[]>(requestUrl);

        if (topics.length === 0) {
            throw new Error(`Topic not found`);
        }

        return topics[0];
    }

    /**
     * Constructs a query string with sensible defaults for the API request.
     * @param params - Optional additional query parameters.
     * @returns A string representation of query parameters. (does not include the ? mark)
     */
    private _getParamsString(params?: object) {
        return new URLSearchParams({...this._paginationParams, ...this._orderParams, ...params}).toString();
    }
}

export default TopicsRepository;

// Interfaces and Types

/**
 * Interface for topics repository.
 */
interface ITopicsRepository {
    getManyTopics(): Promise<TopicData[]>;

    getTopicById(id: number | string): Promise<TopicData>;

    getTopicBySlug(slug: string): Promise<TopicData>;
}

/**
 * Query parameters for fetching single topics.
 */
export interface TopicQueryParams {
    id?: number | string;
    slug?: string;
}

/**
 * Data structure for topics returned by API.
 */
export interface TopicData {
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