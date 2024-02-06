import {apiConfig} from "~/config/api";
import type {FetchManyOptions, IOilsRepository, OilResponse, OilResponseQuery} from "./oils.types";

/**
 * Repository for fetching oils.
 * Implements `IOilsRepository` interface.
 */
export class OilsRepository implements IOilsRepository{
    private readonly _baseUrl: string;
    private readonly _paginationParams = { per_page: "100" };
    private readonly _defaultOrdering = { order: "asc", orderby: "title" };

    constructor() {
        this._baseUrl = apiConfig.baseUrl + "/wp/v2/bms_oils";
    }

    /**
     * Fetches a list of oils with default pagination and ordering.
     * @returns A promise resolving to an array of MediaResponse.
     */
    public async getManyOils(options: FetchManyOptions): Promise<OilResponse[]> {
        return this._fetchManyOils(options);
    }

    /**
     * Fetches a single oil by its ID.
     * @param id - The ID of the oil (number or string).
     * @returns A promise resolving to a single OilResponse object.
     */
    public async getOilById(id: number | string): Promise<OilResponse> {
        return this._fetchOilBy({id: +id});
    }

    /**
     * Fetches a single oil by its slug.
     * @param slug - The slug of the oil.
     * @returns A promise resolving to a single OilResponse object.
     */
    public async getOilBySlug(slug: string): Promise<OilResponse> {
        return this._fetchOilBy({slug});
    }

    /**
     * Private method to fetch multiple oils.
     * @returns A promise resolving to an array of MediaResponse.
     */
    private async _fetchManyOils(options: FetchManyOptions): Promise<OilResponse[]> {
        const queryParams = this._constructQueryParams();
        const response = await $fetch.raw<OilResponse[]>(this._baseUrl + "?" + queryParams);

        if(!response.ok || !response._data) {
            throw new Error(`Failed to fetch oils with statuscode ${response.status}: ${response._data}`);
        }

        const oilsData: OilResponse[] = [...response._data];
        if (options.allPages && response.headers.get("X-WP-TotalPages")) {
            const totalPages = parseInt(response.headers.get("X-WP-TotalPages") as string);

            if (totalPages > 1) {
                const requests: Promise<OilResponse[]>[] = [];
                for (let page = 2; page <= totalPages; page++) {
                    requests.push($fetch<OilResponse[]>(`${this._baseUrl}?${this._constructQueryParams({page})}`));
                }
                const responses = await Promise.all(requests);
                for (const response of responses) {
                    oilsData.push(...response);
                }
            }
        }
        return oilsData;
    }

    private async _fetchOilBy(query: OilResponseQuery): Promise<OilResponse> {
        const queryParams = this._constructQueryParams(query);
        const oils = await $fetch<OilResponse[]>(this._baseUrl + "?" + queryParams);
        return oils[0];
    }

    private _constructQueryParams(params?: object): string {
        return new URLSearchParams({
            ...this._paginationParams,
            ...this._defaultOrdering,
            ...params,
        }).toString();
    }
}

export default OilsRepository;