import { apiConfig } from "~/config/api";

/**
 * Repository for fetching media.
 * Implements `IMediaRepository` interface.
 */
export class MediaRepository implements IMediaRepository {
  private _paginationParams = { per_page: "100" };

  /**
   * Fetches a list of media with default pagination and ordering.
   * @returns A promise resolving to an array of MediaResponse.
   */
  public async getManyMedia(ids: number[]): Promise<MediaResponse[]> {
    return this._fetchManyMedia(ids);
  }

  /**
   * Fetches a single media by its ID.
   * @param id - The ID of the media (number or string).
   * @returns A promise resolving to a single MediaResponse object.
   */
  public async getMediaById(id: number | string): Promise<MediaResponse> {
    return this._fetchMedia({ id });
  }

  /**
   * Private method to fetch multiple media.
   * @returns A promise resolving to an array of MediaResponse.
   */
  private async _fetchManyMedia(ids: number[]): Promise<MediaResponse[]> {
    const queryString = this._getParamsString({ include: ids.join(",") });
    const requestUrl = `${apiConfig.baseUrl}/wp/v2/media?${queryString}`;
    return $fetch(requestUrl);
  }

  /**
   * Private method to fetch a single media based on provided parameters.
   * @param params - The query parameters to filter the media.
   * @returns A promise resolving to a single MediaResponse object.
   * @throws Error if the media is not found.
   */
  private async _fetchMedia(params: MediaQueryParams): Promise<MediaResponse> {
    const requestUrl = `${apiConfig.baseUrl}/wp/v2/media/${params.id}`;
    const medias = await $fetch<MediaResponse[]>(requestUrl);

    if (medias.length === 0) {
      throw new Error(`Media not found`);
    }

    return medias[0];
  }

  /**
   * Constructs a query string with sensible defaults for the API request.
   * @param params - Optional additional query parameters.
   * @returns A string representation of query parameters. (does not include the ? mark)
   */
  private _getParamsString(params?: object) {
    return new URLSearchParams({
      ...this._paginationParams,
      ...params,
    }).toString();
  }
}

export default MediaRepository;

// Interfaces and Types

/**
 * Interface for media repository.
 */
interface IMediaRepository {
  getManyMedia(ids: number[]): Promise<MediaResponse[]>;

  getMediaById(id: number | string): Promise<MediaResponse>;
}

/**
 * Query parameters for fetching single media.
 */
export interface MediaQueryParams {
  id?: number | string;
}

/**
 * Data structure for media returned by API.
 */
export interface MediaResponse {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: { [key: string]: any };
  description: { rendered: string };
  caption: { rendered: string };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: MediaDetails;
  post: number;
  source_url: string;
  _links: { [key: string]: any };
}

interface MediaDetails {
  width: number;
  height: number;
  file: string;
  filesize?: number;
  sizes: { [key: string]: ImageSize };
  image_meta: { [key: string]: any };
}

interface ImageSize {
  file: string;
  width: number;
  height: number;
  filesize?: number;
  mime_type: string;
  source_url: string;
}
